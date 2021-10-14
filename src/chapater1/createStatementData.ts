import { Invoice, Performance, PerformanceData, Play, StatementData } from './type'

export function createStatementData(invoice: Invoice, plays: Record<string, Play>) {
  const result: StatementData = {
    customer: invoice.customer,
    performances: invoice.performances.map(enrichPerformance),
    totalAmount: 0,
    totalVolumeCredits: 0,
  }

  result.totalAmount = totalAmount(result)
  result.totalVolumeCredits = totalVolumeCredits(result)

  return result

  function enrichPerformance(aPerformance: Performance) {
    const calculator = createPerformanceCalculator(aPerformance, playFor(aPerformance))

    const result: PerformanceData = {
      ...aPerformance,
      play: calculator.play,
      amount: calculator.amount,
      volumeCredits: calculator.volumeCredits,
    }

    return result
  }

  function playFor(aPerformance: Performance) {
    return plays[aPerformance.playID]
  }

  function totalAmount(data: StatementData) {
    return data.performances.reduce((total, p) => total + p.amount, 0)
  }

  function totalVolumeCredits(data: StatementData) {
    return data.performances.reduce((total, p) => total + p.volumeCredits, 0)
  }
}

const createPerformanceCalculator = (aPerformance: Performance, aPlay: Play) => {
  switch (aPlay.type) {
    case 'tragedy':
      return new TragedyCalculator(aPerformance, aPlay)
    case 'comedy':
      return new ComedyCalculator(aPerformance, aPlay)
    default:
      throw new Error(`Unknown type: ${aPlay.type}`)
  }
}

class PerformanceCalculator {
  performance: Performance
  play

  constructor(aPerformance: Performance, aPlay: Play) {
    this.performance = aPerformance
    this.play = aPlay
  }

  get volumeCredits(): number {
    return Math.max(this.performance.audience - 30, 0)
  }
}

class TragedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 40000
    if (this.performance.audience > 30) {
      result += 10000 + (this.performance.audience - 30)
    }

    return result
  }
}

class ComedyCalculator extends PerformanceCalculator {
  get amount(): number {
    let result = 30000

    if (this.performance.audience > 20) {
      result += 10000 + 500 * (this.performance.audience - 20)
    }

    result += 300 * this.performance.audience

    return result
  }

  get volumeCredits() {
    return super.volumeCredits + Math.floor(this.performance.audience / 5)
  }
}
