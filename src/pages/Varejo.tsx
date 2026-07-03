import { Link } from 'react-router-dom'
import { ArrowRight, BarChart3, CheckCircle, MapPin, Package, ShoppingCart, Star, Truck } from 'lucide-react'

const WA = 'https://wa.me/5521996643765'

const highlights = [
  { icon: Package,      title: 'Mix completo',            description: 'Bovinos, suínos, aves, embutidos, congelados e pescados em um único fornecedor.' },
  { icon: ShoppingCart, title: 'Produtos de giro rápido', description: 'Itens de alta rotatividade para aumentar suas vendas e reduzir desperdício.' },
  { icon: Truck,        title: 'Entrega programada',      description: 'Entregas de segunda a sábado com janelas definidas para facilitar seu recebimento.' },
  { icon: BarChart3,    title: 'Suporte comercial',       description: 'Representante dedicado para ajudar na formação de mix ideal para o seu público.' },
]

const checklistItems = [
  'Cortes bovinos para balcão e gôndola',
  'Frango inteiro, partes e cortes',
  'Linha de suínos e embutidos',
  'Pescados e frutos do mar',
  'Congelados e semi-prontos',
  'Produtos de marca própria',
  'Produtos a granel e embalados',
  'Linha premium e cortes especiais',
]

const products = [
  {
    category: 'Açougues',
    icon: '🥩',
    items: ['Traseiro bovino', 'Dianteiro bovino', 'Carne moída', 'Fraldinha', 'Picanha', 'Costela'],
  },
  {
    category: 'Mercados',
    icon: '🏪',
    items: ['Bandeja para gôndola', 'Embutidos fatiados', 'Salsicha e linguiça', 'Frango partes', 'Congelados'],
  },
  {
    category: 'Distribuidores',
    icon: '🚛',
    items: ['Caixas padronizadas', 'Volume por palete', 'Produtos exclusivos', 'Mix personalizado'],
  },
]

export default function Varejo() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '600px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1600&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-verde-600" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-36 w-full">
          <div className="max-w-xl">
            <span className="badge-navy mb-6 inline-flex">Varejo &amp; Distribuição</span>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              O mix certo para<br />
              o seu negócio crescer
            </h1>
            <div className="w-12 h-[3px] bg-verde-600 rounded-full mb-6" />
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              Proteínas de qualidade para açougues, mercados e distribuidores —
              com variedade, pontualidade e preço competitivo.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/seja-cliente" className="btn-red">
                Quero ser cliente <ArrowRight size={16} />
              </Link>
              <Link to="/produtos" className="btn-outline-white">
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ──────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <span className="section-label">Nossos diferenciais</span>
            <h2 className="section-title mt-3">Por que escolher a Royal para o seu varejo?</h2>
            <div className="divider-red mt-4" />
            <p className="section-subtitle">
              Mais do que produto — entregamos suporte, parceria e consistência
              para o seu negócio prosperar.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {highlights.map((h) => (
              <div
                key={h.title}
                className="p-7 rounded-2xl border border-gray-100 hover:border-vinho-200
                           hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-vinho-700 group-hover:bg-verde-600 rounded-xl
                               flex items-center justify-center mb-5 transition-colors duration-300">
                  <h.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {h.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{h.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── O QUE TRABALHAMOS ─────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1588168333986-5078d3ae3976?w=750&q=80"
                alt="Açougue moderno"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-5 -left-5 bg-vinho-700 rounded-2xl px-7 py-6 shadow-2xl hidden md:block">
                <div className="text-white text-center">
                  <div
                    className="text-3xl font-bold"
                    style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                  >
                    92+
                  </div>
                  <div className="text-white/70 text-xs uppercase tracking-wider mt-1">Municípios<br />atendidos</div>
                </div>
              </div>
            </div>

            <div>
              <span className="section-label">Portfólio</span>
              <h2 className="section-title mt-3 mb-4">
                Um mix que atende do balcão ao depósito
              </h2>
              <div className="divider-red mb-8" />
              <p className="text-gray-600 leading-relaxed mb-8">
                Trabalhamos com toda a cadeia de proteínas para que você possa centralizar
                suas compras, reduzir fornecedores e ganhar eficiência.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {checklistItems.map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <div className="w-5 h-5 bg-verde-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium leading-snug">{item}</span>
                  </div>
                ))}
              </div>
              <Link to="/produtos" className="btn-primary">
                Ver todos os produtos <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEGMENTOS / PRODUTOS ──────────────────────────────────── */}
      <section className="py-24 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-white/50 font-bold text-xs tracking-[0.18em] uppercase">Segmentos</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Produtos por segmento
            </h2>
            <div className="w-12 h-[3px] bg-verde-600 rounded-full mx-auto mt-4 mb-4" />
            <p className="text-white/60 max-w-md mx-auto">
              Cada cliente tem um perfil diferente. Por isso, organizamos
              nosso mix para facilitar a sua escolha.
            </p>
          </div>

          <div className="grid sm:grid-cols-3 gap-5">
            {products.map((seg) => (
              <div
                key={seg.category}
                className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-7
                           transition-all duration-200 backdrop-blur-sm"
              >
                <div className="text-3xl mb-4">{seg.icon}</div>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-7 bg-verde-600 rounded-full" />
                  <h3 className="font-bold text-white text-lg" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {seg.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {seg.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="w-1 h-1 bg-verde-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ÁREA DE ATUAÇÃO ───────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label">Cobertura</span>
              <h2 className="section-title mt-3 mb-4">
                Entregamos em todo o estado do Rio de Janeiro
              </h2>
              <div className="divider-red mb-8" />
              <p className="text-gray-600 leading-relaxed mb-6">
                Nossa frota refrigerada cobre mais de 92 municípios do Rio de Janeiro,
                de segunda a sábado, com rastreamento em tempo real e segurança em cada entrega.
              </p>
              <div className="space-y-3 mb-10">
                {[
                  'Capital e Grande Rio',
                  'Baixada Fluminense',
                  'Interior do estado',
                  'Região Serrana',
                ].map((r) => (
                  <div key={r} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-vinho-700 rounded-lg flex items-center justify-center flex-shrink-0">
                      <MapPin size={14} className="text-white" />
                    </div>
                    <span className="text-gray-700 font-medium">{r}</span>
                  </div>
                ))}
              </div>
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Consultar disponibilidade <ArrowRight size={16} />
              </a>
            </div>

            <div className="bg-slate-50 rounded-3xl p-10 flex flex-col gap-7">
              {[
                { icon: Star,        label: 'Frota 100% refrigerada', desc: 'Garantia de cadeia do frio do início ao fim da entrega.' },
                { icon: Truck,       label: 'Gerenciadora de Risco',  desc: 'Rastreamento 24h e escolta nas operações de entrega.' },
                { icon: CheckCircle, label: 'Entrega pontual',        desc: 'Compromisso com a janela de horário combinada.' },
              ].map((item) => (
                <div key={item.label} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-vinho-700 rounded-xl flex items-center justify-center flex-shrink-0">
                    <item.icon size={18} className="text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                      {item.label}
                    </div>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA DARK ──────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1400&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/88" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-verde-400 font-bold text-xs tracking-[0.2em] uppercase">Próximo passo</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Vamos trabalhar juntos?
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-lg mx-auto">
            Cadastre sua empresa e um representante vai montar o mix ideal
            para o perfil do seu negócio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seja-cliente" className="btn-red">
              Quero ser cliente <ArrowRight size={18} />
            </Link>
            <a
              href={WA}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-white"
            >
              Falar no WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
