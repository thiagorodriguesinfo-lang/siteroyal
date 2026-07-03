import { Link } from 'react-router-dom'
import { ArrowRight, Award, Heart, Target, Zap, DollarSign, Truck, Shield, Clock, Radio } from 'lucide-react'
import { calcYearsInBusiness } from '../utils/yearsCalc'

const values = [
  { icon: Award,       title: 'Qualidade',          description: 'Produtos rastreados e com procedência garantida, do campo até a sua empresa.' },
  { icon: Heart,       title: 'Confiança',           description: 'Relações de longo prazo, construídas com transparência, consistência e comprometimento.' },
  { icon: Target,      title: 'Variedade',           description: 'Mix completo de proteínas para atender qualquer necessidade do seu negócio.' },
  { icon: Zap,         title: 'Agilidade',           description: 'Logística eficiente para garantir que seu estoque nunca pare.' },
  { icon: DollarSign,  title: 'Preço Competitivo',   description: 'Condições comerciais que fazem diferença no resultado do seu negócio.' },
]

const logistica = [
  { icon: Clock,   title: 'Segunda a Sábado',    description: 'Nossa logística opera de segunda a sábado, garantindo entregas pontuais.', highlight: true },
  { icon: Radio,   title: 'Rastreamento 24h',    description: 'Todos os caminhões rastreados pela central de monitoramento 24 horas por dia.', highlight: true },
  { icon: Shield,  title: 'Gerenciadora de Risco', description: 'Gerenciadora de Risco ativa em todas as operações de entrega.', highlight: false },
  { icon: Truck,   title: 'Antijammer e Escolta', description: 'Todos os veículos possuem Antijammer e contam com escolta dedicada.', highlight: false },
]

const segments = [
  { label: 'Restaurantes',      desc: 'Cortes padronizados e regularidade de entrega' },
  { label: 'Mercados',          desc: 'Mix completo com produtos de giro e balcão' },
  { label: 'Açougues',          desc: 'Cortes especiais e variedade para o consumidor final' },
  { label: 'Distribuidores',    desc: 'Volume, variedade e suporte comercial dedicado' },
  { label: 'Cozinhas Industriais', desc: 'Proteínas para produção em larga escala' },
  { label: 'Hotéis e Escolas',  desc: 'Atendimento recorrente e padronização de produtos' },
]

export default function QuemSomos() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '560px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=1600&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-verde-600" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-32 w-full">
          <div className="max-w-xl">
            <span className="badge-red mb-6 inline-flex">Nossa história</span>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Quem Somos
            </h1>
            <div className="w-12 h-[3px] bg-verde-600 rounded-full mb-6" />
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Há {calcYearsInBusiness()} anos levando qualidade e confiança para quem mais precisa: você e seus clientes.
            </p>
            <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm
                            border border-white/20 rounded-2xl px-6 py-4">
              <span
                className="text-4xl font-bold text-white"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                {calcYearsInBusiness()}
              </span>
              <span className="text-white/70 text-sm leading-tight">anos de<br />experiência</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── MISSÃO ────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Quem somos</span>
              <h2 className="section-title mt-3 mb-4">
                Proteínas selecionadas para empresas que exigem confiança
              </h2>
              <div className="divider-red mb-8" />
              <div className="space-y-5 text-gray-600 leading-relaxed">
                <p>
                  Há <strong>{calcYearsInBusiness()} anos no mercado</strong>, a Royal Alimentos nasceu com o compromisso de
                  levar produtos de qualidade para empresas que precisam de confiança no
                  abastecimento. Atuamos na distribuição de proteínas para clientes do varejo,
                  food service e distribuição, oferecendo cortes bovinos, suínos, aves,
                  embutidos, congelados e pescados.
                </p>
                <p>
                  Mais do que vender produtos, buscamos construir relações de longo prazo
                  com nossos clientes, entregando variedade, qualidade, agilidade e
                  atendimento próximo.
                </p>
                <p>
                  Para cada perfil de cliente — seja o restaurante que exige consistência,
                  o mercado que busca variedade ou o distribuidor que precisa de volume —
                  temos a solução certa.
                </p>
              </div>

              <blockquote className="mt-8 pl-5 border-l-4 border-verde-600">
                <p
                  className="text-xl font-medium text-vinho-700 italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  "A Realeza dos Alimentos!"
                </p>
                <footer className="mt-2 text-sm text-gray-400">Royal Alimentos</footer>
              </blockquote>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=750&q=80"
                alt="Qualidade Royal Alimentos"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -top-5 -right-5 bg-vinho-700 rounded-2xl px-7 py-6 shadow-2xl hidden md:block">
                <div className="text-white text-center">
                  <div
                    className="text-4xl font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    {calcYearsInBusiness()}
                  </div>
                  <div className="text-white/70 text-xs uppercase tracking-wider mt-1">Anos no<br />mercado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALORES ───────────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <span className="section-label">O que nos guia</span>
            <h2 className="section-title mt-3">Nossos Valores</h2>
            <div className="divider-red-center mt-4" />
            <p className="section-subtitle max-w-xl mx-auto">
              Princípios que guiam cada entrega, cada ligação e cada negociação.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {values.map((v) => (
              <div key={v.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100
                           hover:shadow-lg hover:-translate-y-1 transition-all duration-300 text-center">
                <div className="w-12 h-12 bg-vinho-700 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-base mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {v.title}
                </h3>
                <p className="text-gray-500 text-xs leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOGÍSTICA ─────────────────────────────────────────────── */}
      <section className="py-24 bg-gray-950">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="text-verde-400 font-bold text-xs tracking-[0.18em] uppercase">Estrutura</span>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Logística que gera confiança em cada entrega
              </h2>
              <div className="w-12 h-[3px] bg-verde-600 rounded-full mb-8" />
              <p className="text-gray-400 leading-relaxed mb-8">
                Nossa estrutura logística foi pensada para garantir que você receba
                seus produtos com segurança, pontualidade e rastreabilidade total.
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {logistica.map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-2xl p-5 border transition-all ${
                      item.highlight
                        ? 'bg-verde-600/15 border-verde-600/30'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        item.highlight ? 'bg-verde-600' : 'bg-white/10'
                      }`}>
                        <item.icon size={16} className="text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-sm" style={{ fontFamily: 'Inter, sans-serif' }}>
                        {item.title}
                      </h3>
                    </div>
                    <p className="text-gray-400 text-xs leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1586816001966-79b736744398?w=750&q=80"
                alt="Logística Royal Alimentos"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-5 -right-5 bg-verde-600 rounded-2xl px-7 py-5 shadow-2xl text-center">
                <div className="text-white text-2xl font-bold">Seg–Sáb</div>
                <div className="text-white/75 text-xs uppercase tracking-wider mt-1">entrega</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEGMENTOS ─────────────────────────────────────────────── */}
      <section className="py-24 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-white/50 font-bold text-xs tracking-[0.18em] uppercase">Clientes</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Quem atendemos
            </h2>
            <div className="w-12 h-[3px] bg-verde-600 rounded-full mx-auto" />
            <p className="text-white/60 max-w-xl mx-auto mt-6">
              Do açougue ao hotel, da cozinha industrial ao distribuidor —
              atendemos quem precisa de proteína de verdade.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {segments.map((s) => (
              <div
                key={s.label}
                className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-6
                           transition-all duration-200 backdrop-blur-sm"
              >
                <div className="w-2 h-6 bg-verde-600 rounded-full mb-4" />
                <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {s.label}
                </h3>
                <p className="text-white/55 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <span className="section-label">Próximo passo</span>
          <h2 className="section-title mt-3 mb-4">Vamos construir uma parceria?</h2>
          <div className="divider-red-center mt-4 mb-6" />
          <p className="section-subtitle mb-10">
            Cadastre sua empresa e um representante entrará em contato para
            entender o que você precisa e montar a melhor proposta.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seja-cliente" className="btn-red text-base">
              Quero ser cliente <ArrowRight size={18} />
            </Link>
            <Link to="/contato" className="btn-secondary text-base">
              Falar com um representante
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
