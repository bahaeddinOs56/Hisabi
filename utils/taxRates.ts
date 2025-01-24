export const categoryTaxRates = {
  individual: [
    { threshold: 40000, rate: 0 },
    { threshold: 60000, rate: 0.1 },
    { threshold: 80000, rate: 0.2 },
    { threshold: 100000, rate: 0.3 },
    { threshold: 180000, rate: 0.34 },
    { threshold: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
  company: [
    { threshold: 300000, rate: 0.1 },
    { threshold: 1000000, rate: 0.2 },
    { threshold: 5000000, rate: 0.31 },
    { threshold: Number.POSITIVE_INFINITY, rate: 0.37 },
  ],
}

export const FAMILY_ALLOWANCE_DEDUCTION = 500 // Annual deduction per dependent
export const MAX_FAMILY_ALLOWANCE_DEDUCTION = 3000 // Maximum annual deduction

