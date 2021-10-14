const sampleProvinceData = () => {
  return {
    name: 'Asia',
    producers: [
      { name: 'Byzantium', cost: 10, production: 9 },
      { name: 'Attalia', cost: 12, production: 10 },
      { name: 'Sinope', cost: 10, production: 6 },
    ],
    demand: 30,
    price: 20,
  }
}

class Province {
  _name
  _producres: Producer[]
  _totalProduction
  _demand
  _price

  constructor(doc: any) {
    this._name = doc.name
    this._producres = []
    this._totalProduction = 0
    this._demand = doc.demand
    this._price = doc._price
    doc.producers.forEach((d) => this.addProducer(new Producer(this, d)))
  }

  addProducer(arg: Producer) {
    this._producres.push(arg)
    this._totalProduction += arg.production
  }

  get name() {
    return this._name
  }

  get producres() {
    return this._producres.slice()
  }

  get totalProduction() {
    return this._totalProduction
  }

  set totalProduction(arg) {
    this._totalProduction = arg
  }

  get demand() {
    return this._demand
  }

  set demand(arg) {
    this._demand = arg
  }

  get price() {
    return this._price
  }

  set price(arg) {
    this._price = arg
  }
}

class Producer {
  production: any
  constructor(province: Province, p: Producer) {}
}
