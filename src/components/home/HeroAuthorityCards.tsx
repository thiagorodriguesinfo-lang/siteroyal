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
    description: 'Produtos selecionados',
  },
  {
    icon: Layers,
    title: 'Grande Variedade',
    description: 'Bovinos, aves, suínos, pescados e congelados',
  },
  {
    icon: Handshake,
    title: 'Confiança',
    description: 'Parceiro do seu negócio',
  },
]

/**
 * Área de autoridade do Hero: 4 cards glassmorphism destacando os
 * principais pilares de confiança da Royal Alimentos.
 */
export default function HeroAuthorityCards() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.5, ease: EASE }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4"
    >
      {items.map((item) => (
        <div
          key={item.title}
          className="bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl
                     p-4 md:p-5 flex flex-col gap-3 hover:bg-white/[0.14] transition-colors duration-300"
        >
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-verde-600/15 flex items-center justify-center">
            <item.icon size={18} className="text-verde-600" />
          </div>
          <div>
            <div className="font-bold text-white text-sm md:text-base leading-snug">
              {item.title}
            </div>
            <div className="text-white/60 text-xs mt-1 leading-relaxed">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}
