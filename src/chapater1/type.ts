export interface Invoice {
  customer: string
  performances: Performance[]
}

export interface Play {
  name: string
  type: 'tragedy' | 'comedy'
}

export interface Performance {
  playID: string
  audience: number
}

export interface PerformanceData extends Performance {
  play: Play
  playID: string
  amount: number
  volumeCredits: number
  audience: number
}

export interface StatementData {
  customer: string
  performances: PerformanceData[]
  totalAmount: number
  totalVolumeCredits: number
}
