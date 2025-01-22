import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../utils/translations'

interface TaxInfoProps {
  taxAmount: number
  effectiveRate: number
}

export default function TaxInfo({ taxAmount, effectiveRate }: TaxInfoProps) {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">{t.calculationResults}</h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm text-gray-600 mb-1">{t.taxAmount}:</p>
          <p className="text-2xl font-bold text-gray-900">{taxAmount.toLocaleString()} MAD</p>
        </div>
        <div>
          <p className="text-sm text-gray-600 mb-1">{t.effectiveRate}:</p>
          <p className="text-2xl font-bold text-gray-900">{effectiveRate}%</p>
        </div>
      </div>
    </div>
  )
}

