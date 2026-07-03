import { motion } from 'framer-motion'
import { Truck, Award, Layers, Handshake, type LucideIcon } from 'lucide-react'

const EASE = [0.22, 1, 0.36, 1] as const

interface AuthorityItem {
  icon: LucideIcon
  title: string
  description: string
}

const items: AuthorityItem[] = [
  {
    icon: Truck,
    title: 'Entrega Expressa',
    description: 'Segunda a sábado em todo RJ',
  },
  {
    icon: Award,
    title: 'Qualidade Premium',
    description: 'Produtos selecionados e certificados',
  },
  {
    icon: Layers,
    title: 'Grande Variedade',
    description: 'Bovinos, aves, suínos, pescados e congelados',
  },
  {
    icon: Handshake,
    title: 'Confiança e Tradição',
    description: 'Parceria de verdade com o seu negócio',
  },
]

/**
 * Área de autoridade do Hero: barra única com os 4 pilares de confiança
 * da Royal Alimentos, separados por divisórias finas.
 */
export default function HeroAuthorityCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
      className="grid grid-cols-2 lg:grid-cols-4 border border-white/15 rounded-2xl bg-white/[0.03] backdrop-blur-sm overflow-hidden"
    >
      {items.map((item, i) => (
        <div
          key={item.title}
          className={`flex items-center gap-3 p-4 md:p-5 transition-colors duration-300 hover:bg-white/[0.05]
                      ${i % 2 === 1 ? 'border-l border-white/10' : ''}
                      ${i >= 2 ? 'border-t border-white/10 lg:border-t-0' : ''}
                      ${i > 0 ? 'lg:border-l lg:border-t-0' : ''}`}
        >
          <div className="w-10 h-10 rounded-full border-2 border-verde-600 flex items-center justify-center shrink-0 bg-transparent">
            <item.icon size={17} className="text-verde-600" />
          </div>
          <div>
            <div className="font-bold text-white text-sm md:text-base leading-snug">
              {item.title}
            </div>
            <div className="text-white/60 text-xs mt-0.5 leading-relaxed">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
