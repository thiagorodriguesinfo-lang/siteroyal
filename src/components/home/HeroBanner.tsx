import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Mouse, History, Truck, Layers } from 'lucide-react'
import { calcYearsInBusiness } from '../../utils/yearsCalc'
import HeroAuthorityCards from './HeroAuthorityCards'

/** Ponto de troca da imagem de fundo do Hero — trocar a URL abaixo para atualizar. */
const HERO_BG_IMAGE = '/hero-bg.jpg'

const WA = 'https://wa.me/5521996643765'

/** Easing suave usado em toda a sequência de entrada (mesmo cubic-bezier do CSS existente). */
const EASE = [0.22, 1, 0.36, 1] as const

const trustIndicators = [
  { icon: History, text: `+${calcYearsInBusiness()} anos de história` },
  { icon: Truck, text: 'Entrega em todo RJ' },
  { icon: Layers, text: 'Mix completo de proteínas' },
]

/** Glifo oficial do WhatsApp — lucide-react não inclui ícones de marca. */
function WhatsAppIcon({ size = 15 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12.001 2C6.478 2 2 6.477 2 12c0 1.867.507 3.66 1.472 5.207L2 22l4.929-1.44A9.947 9.947 0 0 0 12.001 22C17.523 22 22 17.523 22 12S17.523 2 12.001 2zm0 18.184a8.156 8.156 0 0 1-4.166-1.14l-.299-.177-3.06.893.9-2.98-.194-.306a8.156 8.156 0 0 1-1.258-4.354c0-4.508 3.669-8.177 8.177-8.177 4.508 0 8.176 3.669 8.176 8.177 0 4.507-3.668 8.176-8.176 8.176z"/>
    </svg>
  )
}

export default function HeroBanner() {
  return (
    <section
      className="relative flex flex-col"
      style={{ minHeight: '92svh' }}
    >

      {/* ── Background fotográfico com efeito Ken Burns ───────────────── */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          animate={{ scale: [1, 1.08] }}
          transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'linear' }}
        >
          <img
            src={HERO_BG_IMAGE}
            alt=""
            aria-hidden
            fetchPriority="high"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>
        {/* Gradiente navy: sólido à esquerda (~75%), transparente à direita */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Linha vermelha no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-verde-600 z-20" />

      {/* ── Conteúdo principal ────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        {/* Scroll indicator — mouse centralizado, acima dos cards de autoridade */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden xl:flex flex-col items-center gap-2 z-10">
          <Mouse size={22} strokeWidth={1.5} className="hero-scroll text-white/40" />
        </div>
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-24 md:py-32 lg:py-36 w-full">
          <div className="max-w-[680px] mx-auto lg:mx-0 text-center lg:text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: EASE }}
              className="badge-red mb-8 inline-flex"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Distribuidora Premium · Rio de Janeiro
            </motion.div>

            {/* Título principal */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="text-white font-bold mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                lineHeight: 1.06,
              }}
            >
              A Realeza
              <br />
              <span style={{ color: '#E31E24' }}>dos Alimentos</span>
            </motion.h1>

            {/* Linha vermelha animada */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7, ease: EASE }}
              style={{ transformOrigin: 'left' }}
              className="h-[3px] w-14 bg-verde-600 rounded-full mb-8 mx-auto lg:mx-0"
            />

            {/* Subtítulo */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
              className="text-white/75 leading-relaxed mb-8 max-w-[520px] mx-auto lg:mx-0"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)' }}
            >
              Proteínas de alta qualidade para varejo, food service e distribuição.
              Bovinos, aves, suínos, embutidos, congelados e pescados —
              entregues de segunda a sábado em todo o Rio de Janeiro.
            </motion.p>

            {/* Indicadores de confiança */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: EASE }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-x-5 gap-y-2 mb-10"
            >
              {trustIndicators.map((item, i) => (
                <span
                  key={item.text}
                  className={`flex items-center gap-2 text-white/70 text-sm ${
                    i > 0 ? 'lg:border-l lg:border-white/20 lg:pl-5' : ''
                  }`}
                >
                  <item.icon size={14} className="text-white/60 shrink-0" />
                  {item.text}
                </span>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center lg:justify-start gap-4"
            >
              <Link
                to="/seja-cliente"
                className="group btn-red text-base w-full sm:w-auto justify-center
                           shadow-lg shadow-red-900/30 hover:shadow-xl hover:shadow-red-900/40"
              >
                Seja Cliente
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/produtos"
                className="btn-outline-white text-base w-full sm:w-auto justify-center backdrop-blur-sm"
              >
                Ver Produtos
              </Link>

              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 text-white/80 hover:text-green-50 text-sm font-medium
                           bg-white/10 backdrop-blur-sm border border-white/20 w-full sm:w-auto
                           hover:bg-green-500/15 hover:border-green-400/40 px-5 py-4 rounded-xl
                           transition-all duration-200"
              >
                <WhatsAppIcon size={15} />
                (21) 99664-3765
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ── Área de autoridade ────────────────────────────────────── */}
      <div className="relative z-10 pb-10 md:pb-12">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <HeroAuthorityCards />
        </div>
      </div>
    </section>
  )
}
