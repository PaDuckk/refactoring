import { createStatementData } from './createStatementData'
import { Invoice, Play, StatementData } from './type'

const statement = (invoice: Invoice, plays: Record<string, Play>) => {
  return renderPlainText(createStatementData(invoice, plays))
}
const renderPlainText = (data: StatementData) => {
  let result = `청구내역 (고객명: for ${data.customer})`

  for (let perf of data.performances) {
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience}석)\n`
  }

  result += `총액: ${usd(data.totalAmount)}\n`
  result += `적립 포인트: ${usd(data.totalVolumeCredits)}점\n`

  return result
}

const usd = (aNumber: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(
    aNumber / 100,
  )
}

export const plays: Record<string, Play> = {
  hamlet: { name: 'Hamlet', type: 'tragedy' },
  ['as-like']: { name: 'As YouLike It', type: 'comedy' },
  othello: { name: 'Othello', type: 'tragedy' },
}

const invoices: Invoice[] = [
  {
    customer: 'BogCo',
    performances: [
      { playID: 'hamlet', audience: 55 },
      { playID: 'as-like', audience: 35 },
      { playID: 'othello', audience: 40 },
    ],
  },
]

const main = () => {
  invoices.forEach((i) => {
    const plainStatement = statement(i, plays)

    console.log(plainStatement)
  })
}

main()
