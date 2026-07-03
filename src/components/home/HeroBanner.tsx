import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown, Phone } from 'lucide-react'
import { calcYearsInBusiness } from '../../utils/yearsCalc'

const WA = 'https://wa.me/5521996643765'

const stats = [
  { value: `${calcYearsInBusiness()}+`, label: 'Anos de mercado' },
  { value: '92+',  label: 'Municípios' },
  { value: '2,5M', label: 'kg / mês' },
  { value: 'Seg–Sáb', label: 'Dias de entrega' },
  { value: '100%', label: 'Refrigerado' },
]

export default function HeroBanner() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-white">

      {/* Imagem de fundo suave */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1800&q=80')",
          opacity: 0.06,
        }}
      />

      {/* Gradiente claro */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 40%, rgba(235,240,255,0.9) 0%, rgba(255,255,255,0.6) 55%, rgba(255,255,255,1) 100%)',
        }}
      />

      {/* Linha decorativa azul no topo */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-vinho-700 to-transparent opacity-60" />

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center text-center px-4 pt-32 pb-16 w-full max-w-5xl mx-auto">

        {/* Pill de categoria */}
        <div
          className="hero-text-in inline-flex items-center gap-2 border border-vinho-200 bg-vinho-50 text-vinho-700 text-xs font-semibold tracking-[0.2em] uppercase px-5 py-2 rounded-full mb-8"
          style={{ animationDelay: '0.1s' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-vinho-600 animate-pulse" />
          Distribuidora de Proteínas · Rio de Janeiro
        </div>

        {/* Logo pulsante */}
        <div className="relative flex items-center justify-center mb-8">

          {/* Glow azul pulsante */}
          <div
            className="logo-glow-ring absolute rounded-full pointer-events-none"
            style={{
              width: 400,
              height: 400,
              background:
                'radial-gradient(circle, rgba(27,42,107,0.15) 0%, rgba(227,30,36,0.05) 55%, transparent 72%)',
              filter: 'blur(20px)',
            }}
          />

          {/* Anel externo — breathing */}
          <div
            className="ring-breathe absolute rounded-full border-2 border-vinho-500/25 pointer-events-none"
            style={{ width: 340, height: 340 }}
          />
          {/* Anel interno — breathing desfasado */}
          <div
            className="ring-breathe-2 absolute rounded-full border border-verde-600/20 pointer-events-none"
            style={{ width: 305, height: 305 }}
          />

          {/* Logo */}
          <div className="logo-pulse relative z-10 hero-logo-in">
            <img
              src="/logo.png"
              alt="Royal Alimentos — A Realeza dos Alimentos!"
              className="object-contain"
              style={{
                width: 'clamp(210px, 22vw, 285px)',
                height: 'clamp(210px, 22vw, 285px)',
                filter:
                  'drop-shadow(0 6px 20px rgba(27,42,107,0.22))' +
                  ' drop-shadow(0 0 12px rgba(227,30,36,0.18))',
              }}
            />
          </div>
        </div>

        {/* Linha animada */}
        <div
          className="hero-line h-[2px] bg-gradient-to-r from-transparent via-vinho-700 to-transparent mb-8 mx-auto"
        />

        {/* Slogan principal */}
        <h1
          className="hero-text-in leading-tight mb-5"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: 'clamp(2.2rem, 5.5vw, 4rem)',
            color: '#1a1a1a',
            animationDelay: '0.5s',
          }}
        >
          A Realeza{' '}
          <span style={{ color: '#1B2A6B' }}>
            dos Alimentos!
          </span>
        </h1>

        {/* Subtítulo */}
        <p
          className="hero-text-in text-gray-500 max-w-2xl leading-relaxed mb-10"
          style={{ fontSize: 'clamp(1rem, 1.8vw, 1.15rem)', animationDelay: '0.7s' }}
        >
          Proteínas de qualidade para empresas que exigem confiança.
          Bovinos, aves, suínos, embutidos, congelados e pescados —
          distribuição de segunda a sábado para todo o Rio de Janeiro.
        </p>

        {/* CTAs */}
        <div
          className="hero-text-in flex flex-wrap gap-3 justify-center mb-14"
          style={{ animationDelay: '0.9s' }}
        >
          <Link
            to="/seja-cliente"
            className="group bg-vinho-700 hover:bg-vinho-800 text-white font-bold px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-base shadow-md hover:shadow-lg hover:scale-105"
          >
            Seja Cliente
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            to="/produtos"
            className="border-2 border-vinho-700/30 hover:border-vinho-700 text-vinho-700 font-semibold px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-base hover:bg-vinho-50 hover:scale-105"
          >
            Conheça nossos produtos
          </Link>

          <a
            href={WA}
            target="_blank"
            rel="noopener noreferrer"
            className="border-2 border-verde-700/30 hover:border-verde-700 text-verde-700 font-semibold px-8 py-4 rounded-xl transition-all duration-300 inline-flex items-center gap-2 text-base hover:bg-verde-50 hover:scale-105"
          >
            <Phone size={16} />
            (21) 99664-3765
          </a>
        </div>

        {/* Estatísticas */}
        <div
          className="hero-text-in w-full"
          style={{ animationDelay: '1.1s' }}
        >
          <div className="border border-gray-200 rounded-2xl bg-white/80 backdrop-blur-sm shadow-sm grid grid-cols-5 divide-x divide-gray-100">
            {stats.map((s) => (
              <div key={s.label} className="py-5 px-4 text-center">
                <div
                  className="font-bold leading-none mb-1"
                  style={{
                    color: '#1B2A6B',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                  }}
                >
                  {s.value}
                </div>
                <div className="text-gray-400 text-[10px] uppercase tracking-wider mt-1.5">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-gray-300 text-[10px] uppercase tracking-widest">rolar</span>
        <ChevronDown size={18} className="hero-scroll text-gray-300" />
      </div>

      {/* Linha decorativa azul na base */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-vinho-700 to-transparent opacity-30" />
    </section>
  )
}
