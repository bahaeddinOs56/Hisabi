export const categoryTaxRates = {
    individual: [
      { threshold: 40000, rate: 0 },
      { threshold: 60000, rate: 0.1 },
      { threshold: 80000, rate: 0.2 },
      { threshold: 100000, rate: 0.3 },
      { threshold: 180000, rate: 0.34 },
      { threshold: Number.POSITIVE_INFINITY, rate: 0.37 },
    ],
    freelancer: [
      { threshold: 30000, rate: 0 },
      { threshold: 50000, rate: 0.1 },
      { threshold: 100000, rate: 0.2 },
      { threshold: 180000, rate: 0.3 },
      { threshold: Number.POSITIVE_INFINITY, rate: 0.34 },
    ],
    company: [
      { threshold: 300000, rate: 0.1 },
      { threshold: 1000000, rate: 0.2 },
      { threshold: Number.POSITIVE_INFINITY, rate: 0.31 },
    ],
    other: [
      { threshold: 30000, rate: 0 },
      { threshold: 50000, rate: 0.15 },
      { threshold: 100000, rate: 0.25 },
      { threshold: Number.POSITIVE_INFINITY, rate: 0.35 },
    ],
  }
  
  