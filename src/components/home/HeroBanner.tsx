import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { calcYearsInBusiness } from '../../utils/yearsCalc'

const WA = 'https://wa.me/5521996643765'

const stats = [
  { value: `${calcYearsInBusiness()}+`, label: 'Anos de mercado' },
  { value: '92+',       label: 'Municípios' },
  { value: '2,5M+',     label: 'kg / mês' },
  { value: 'Seg–Sáb',   label: 'Dias de entrega' },
  { value: '100%',      label: 'Refrigerado' },
]

export default function HeroBanner() {
  return (
    <section className="relative flex flex-col" style={{ minHeight: '100svh' }}>

      {/* ── Background fotográfico ─────────────────────────────────── */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1558030006-450675393462?w=1920&q=85"
          alt=""
          aria-hidden
          className="w-full h-full object-cover object-center"
        />
        {/* Gradiente navy: sólido à esquerda, transparente à direita */}
        <div className="absolute inset-0 hero-overlay" />
      </div>

      {/* Linha vermelha no topo */}
      <div className="absolute top-0 left-0 right-0 h-[3px] bg-verde-600 z-20" />

      {/* ── Conteúdo principal ────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16 py-36 w-full">
          <div className="max-w-[680px]">

            {/* Badge */}
            <div
              className="badge-red anim-fade-in mb-8"
              style={{ animationDelay: '0.1s' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              Distribuidora Premium · Rio de Janeiro
            </div>

            {/* Título principal */}
            <h1
              className="anim-slide-left text-white font-bold mb-5"
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 'clamp(3rem, 6.5vw, 5.5rem)',
                lineHeight: 1.06,
                animationDelay: '0.15s',
              }}
            >
              A Realeza
              <br />
              <span style={{ color: '#E31E24' }}>dos Alimentos</span>
            </h1>

            {/* Linha vermelha animada */}
            <div
              className="hero-line h-[3px] bg-verde-600 rounded-full mb-8"
            />

            {/* Subtítulo */}
            <p
              className="anim-fade-up text-white/75 leading-relaxed mb-10 max-w-[520px]"
              style={{ fontSize: 'clamp(1rem, 1.6vw, 1.2rem)', animationDelay: '0.4s' }}
            >
              Proteínas de alta qualidade para varejo, food service e distribuição.
              Bovinos, aves, suínos, embutidos, congelados e pescados —
              entregues de segunda a sábado em todo o Rio de Janeiro.
            </p>

            {/* CTAs */}
            <div
              className="anim-fade-up flex flex-wrap gap-4"
              style={{ animationDelay: '0.6s' }}
            >
              <Link
                to="/seja-cliente"
                className="group btn-red text-base"
              >
                Seja Cliente
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                to="/produtos"
                className="btn-outline-white text-base"
              >
                Ver Produtos
              </Link>

              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-white/70 hover:text-white text-sm font-medium
                           border border-white/20 hover:border-white/50 px-5 py-4 rounded-xl
                           transition-all duration-200"
              >
                <Phone size={15} />
                (21) 99664-3765
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Barra de stats ────────────────────────────────────────── */}
      <div className="relative z-10 bg-black/50 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 md:px-12 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-y-5">
            {stats.map((s, i) => (
              <div
                key={s.label}
                className={`text-center ${i > 0 ? 'sm:border-l sm:border-white/10' : ''}`}
              >
                <div
                  className="font-bold text-white leading-none"
                  style={{
                    fontFamily: "'Playfair Display', Georgia, serif",
                    fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-white/45 text-[10px] uppercase tracking-[0.18em] mt-2">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-32 right-10 hidden xl:flex flex-col items-center gap-2 z-10">
        <ChevronDown size={18} className="hero-scroll text-white/40" />
      </div>
    </section>
  )
}
