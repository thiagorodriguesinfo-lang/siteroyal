import { Link } from 'react-router-dom'
import { ArrowRight, Award, Heart, Target, Zap, DollarSign, Truck, Shield, Clock, Radio } from 'lucide-react'
import { calcYearsInBusiness } from '../utils/yearsCalc'

const values = [
  {
    icon: Award,
    title: 'Qualidade',
    description: 'Produtos rastreados e com procedência garantida, do campo até a sua empresa.',
  },
  {
    icon: Heart,
    title: 'Confiança',
    description: 'Relações de longo prazo, construídas com transparência, consistência e comprometimento.',
  },
  {
    icon: Target,
    title: 'Variedade',
    description: 'Mix completo de proteínas para atender qualquer necessidade do seu negócio.',
  },
  {
    icon: Zap,
    title: 'Agilidade',
    description: 'Logística eficiente para garantir que seu estoque nunca pare.',
  },
  {
    icon: DollarSign,
    title: 'Preço Competitivo',
    description: 'Preços justos e condições comerciais que fazem diferença no resultado do seu negócio.',
  },
]

const logistica = [
  {
    icon: Clock,
    title: 'Segunda a Sábado',
    description: 'Nossa logística opera de segunda a sábado, garantindo entregas pontuais.',
    highlight: true,
  },
  {
    icon: Radio,
    title: 'Rastreamento 24h',
    description: 'Todos os caminhões rastreados pela central de monitoramento 24 horas por dia.',
    highlight: true,
  },
  {
    icon: Shield,
    title: 'Gerenciadora de Risco',
    description: 'Gerenciadora de Risco ativa em todas as operações de entrega.',
    highlight: false,
  },
  {
    icon: Truck,
    title: 'Antijammer e Escolta',
    description: 'Todos os veículos possuem Antijammer e contam com escolta dedicada.',
    highlight: false,
  },
]

const segments = [
  { label: 'Restaurantes', desc: 'Cortes padronizados e regularidade de entrega' },
  { label: 'Mercados', desc: 'Mix completo com produtos de giro e balcão' },
  { label: 'Açougues', desc: 'Cortes especiais e variedade para o consumidor final' },
  { label: 'Distribuidores', desc: 'Volume, variedade e suporte comercial dedicado' },
  { label: 'Cozinhas Industriais', desc: 'Proteínas para produção em larga escala' },
  { label: 'Hotéis e Escolas', desc: 'Atendimento recorrente e padronização de produtos' },
]

export default function QuemSomos() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-24 bg-gray-900 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-sm px-4 py-1.5 rounded-full border border-white/20 mb-6">
            Nossa história
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Quem Somos
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto mb-6">
            Há {calcYearsInBusiness()} anos levando qualidade e confiança para quem mais precisa: você e seus clientes.
          </p>
          {/* Contador de anos em destaque */}
          <div className="inline-flex items-center gap-3 bg-vinho-700/40 backdrop-blur-sm border border-vinho-500/30 rounded-2xl px-6 py-3">
            <span className="text-4xl font-bold text-dourado-400"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>17</span>
            <span className="text-white/80 text-sm leading-tight">anos de<br />experiência</span>
          </div>
        </div>
      </section>

      {/* Missão */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="section-title gold-underline mb-6">
                Proteínas selecionadas para empresas que exigem confiança
              </h2>
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
                  Sabemos que cada cliente tem uma demanda específica — seja o restaurante
                  que precisa de consistência no corte, o mercado que busca variedade para
                  o balcão ou o distribuidor que exige volume e pontualidade. Para cada
                  perfil, temos a solução certa.
                </p>
              </div>

              <blockquote className="mt-8 pl-6 border-l-4 border-vinho-700">
                <p className="text-xl font-medium text-vinho-700 italic"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  "A Realeza dos Alimentos!"
                </p>
                <footer className="mt-2 text-sm text-gray-400">Royal Alimentos</footer>
              </blockquote>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=700&q=80"
                alt="Qualidade Royal Alimentos"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -top-4 -right-4 bg-vinho-700 rounded-2xl p-6 shadow-xl hidden md:block">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>{calcYearsInBusiness()}</div>
                  <div className="text-white/80 text-sm mt-1">Anos no<br />mercado</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Valores */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">Nossos Valores</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Princípios que guiam cada entrega, cada ligação e cada negociação.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {values.map((v) => (
              <div key={v.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 text-center">
                <div className="w-12 h-12 bg-vinho-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <v.icon size={22} className="text-vinho-700" />
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

      {/* Estrutura Logística */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 bg-vinho-700/30 text-vinho-300 text-sm px-4 py-1.5 rounded-full border border-vinho-700/40 mb-6">
                <Truck size={14} />
                Estrutura Logística
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Logística que gera confiança em cada entrega
              </h2>
              <div className="w-16 h-1 bg-dourado-500 mb-6" />
              <p className="text-gray-400 leading-relaxed mb-8">
                Nossa estrutura logística foi pensada para garantir que você receba
                seus produtos com segurança, pontualidade e rastreabilidade total.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                {logistica.map((item) => (
                  <div
                    key={item.title}
                    className={`rounded-xl p-5 border ${
                      item.highlight
                        ? 'bg-vinho-700/20 border-vinho-700/40'
                        : 'bg-white/5 border-white/10'
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        item.highlight ? 'bg-vinho-700' : 'bg-white/10'
                      }`}>
                        <item.icon size={16} className="text-white" />
                      </div>
                      <h3 className="text-white font-semibold text-sm"
                        style={{ fontFamily: 'Inter, sans-serif' }}>
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
                src="https://images.unsplash.com/photo-1586816001966-79b736744398?w=700&q=80"
                alt="Estrutura logística Royal Alimentos"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -right-4 bg-dourado-500 text-gray-900 rounded-2xl px-5 py-4 shadow-xl text-center">
                <div className="text-2xl font-bold">Seg–Sáb</div>
                <div className="text-xs font-semibold opacity-80">entrega</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Segmentos que atendemos */}
      <section className="py-20 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2
              className="text-3xl md:text-4xl font-bold text-white mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Quem atendemos
            </h2>
            <div className="w-16 h-1 bg-dourado-500 mx-auto mb-4" />
            <p className="text-white/70 max-w-xl mx-auto">
              Do açougue ao hotel, da cozinha industrial ao distribuidor —
              atendemos quem precisa de proteína de verdade.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {segments.map((s) => (
              <div key={s.label} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6">
                <h3 className="text-white font-semibold text-lg mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {s.label}
                </h3>
                <p className="text-white/60 text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="section-title mb-4">Vamos construir uma parceria?</h2>
          <p className="section-subtitle mb-8">
            Cadastre sua empresa e um representante entrará em contato para
            entender o que você precisa e montar a melhor proposta.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seja-cliente" className="btn-primary text-base px-8 py-3.5">
              Quero ser cliente
              <ArrowRight size={18} />
            </Link>
            <Link to="/contato" className="btn-secondary text-base px-8 py-3.5">
              Falar com um representante
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
