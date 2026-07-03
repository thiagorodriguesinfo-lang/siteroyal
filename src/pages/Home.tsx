import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowRight, CheckCircle, Truck, Star, Users, ShoppingBag,
  ChefHat, Award, Phone, Calculator, MapPin,
} from 'lucide-react'
import { getProductsWithOverrides, CHANGE_EVENT } from '../utils/imageOverrides'
import MapaEntrega from '../components/home/MapaEntrega'
import HeroBanner from '../components/home/HeroBanner'
import GoogleReviewCTA from '../components/shared/GoogleReviewCTA'

const WA = 'https://wa.me/5521996643765'

const highlights = [
  {
    icon: Truck,
    title: 'Distribuição Regional',
    description: 'Logística eficiente para distribuidores, atacadistas e grandes compradores em todo o Estado do RJ.',
  },
  {
    icon: ChefHat,
    title: 'Food Service',
    description: 'Atendimento especializado para restaurantes, hotéis, cozinhas industriais e escolas.',
  },
  {
    icon: ShoppingBag,
    title: 'Varejo e Açougues',
    description: 'Mix completo para mercados, açougues, hortifrutis e empórios com alto giro.',
  },
  {
    icon: Award,
    title: 'Qualidade e Procedência',
    description: 'Produtos rastreados, com procedência garantida e padrão de qualidade em cada entrega.',
  },
  {
    icon: Star,
    title: 'Portfólio Completo',
    description: 'Bovinos, aves, suínos, embutidos, congelados e pescados em um único fornecedor.',
  },
  {
    icon: Users,
    title: 'Atendimento Consultivo',
    description: 'Representantes especializados que entendem o seu negócio e montam o mix ideal.',
  },
]

const deliveryRegions = [
  { label: 'Rio de Janeiro', sub: 'Região Metropolitana', color: 'border-vinho-200 bg-vinho-50 text-vinho-700' },
  { label: 'Região Serrana', sub: 'Petrópolis, Teresópolis, Nova Friburgo', color: 'border-verde-200 bg-verde-50 text-verde-700' },
  { label: 'Sul Fluminense', sub: 'Volta Redonda, Barra Mansa, Resende', color: 'border-gray-200 bg-gray-50 text-gray-700' },
  { label: 'Costa Verde', sub: 'Angra dos Reis, Paraty, Mangaratiba', color: 'border-cyan-200 bg-cyan-50 text-cyan-700' },
  { label: 'Região dos Lagos', sub: 'Cabo Frio, Búzios, Arraial do Cabo', color: 'border-blue-200 bg-blue-50 text-blue-700' },
]

const categories = [
  { label: 'Bovinos',    slug: 'bovinos',    emoji: '🥩' },
  { label: 'Aves',       slug: 'aves',       emoji: '🍗' },
  { label: 'Suínos',     slug: 'suinos',     emoji: '🐷' },
  { label: 'Embutidos',  slug: 'embutidos',  emoji: '🌭' },
  { label: 'Congelados', slug: 'congelados', emoji: '❄️' },
  { label: 'Pescados',   slug: 'pescados',   emoji: '🐟' },
]

const differentials = [
  'Produtos com rastreabilidade e procedência garantida',
  'Mix completo em um único fornecedor',
  'Atendimento comercial especializado por segmento',
  'Logística eficiente, segunda a sábado',
  'Suporte técnico para montagem de cardápio',
  'Variedade de cortes para todos os perfis de cliente',
]

const brands: { name: string; domain: string | null }[] = [
  { name: 'Friboi',      domain: 'friboi.com.br' },
  { name: 'Seara',       domain: 'seara.com.br' },
  { name: 'Perdigão',    domain: 'perdigao.com.br' },
  { name: 'Marfrig',     domain: 'marfrig.com.br' },
  { name: 'Aurora',      domain: 'auroraalimentos.com.br' },
  { name: 'Copacol',     domain: 'copacol.com.br' },
  { name: 'Frimesa',     domain: 'frimesa.com.br' },
  { name: 'Coopavel',    domain: 'coopavel.com.br' },
  { name: 'C.Vale',      domain: 'cvale.com.br' },
  { name: 'Bem Brasil',  domain: 'bembrasil.com.br' },
  { name: 'Diplomata',   domain: 'diplomata.com.br' },
  { name: 'Pif Paf',     domain: 'pifpaf.com.br' },
  { name: 'McCain',      domain: 'mccain.com.br' },
  { name: 'Qualy',       domain: 'qualy.com.br' },
  { name: 'Frialto',     domain: 'frialto.com.br' },
  { name: 'Rivelli',     domain: 'rivelli.com.br' },
  { name: 'Frigon',      domain: null },
  { name: 'Agro Yoshi',  domain: null },
  { name: 'Mais Frango', domain: null },
  { name: 'PUL',         domain: null },
  { name: 'Sarriette',   domain: null },
  { name: 'Mafrial',     domain: null },
  { name: 'Só Minas',    domain: null },
  { name: 'Jaguá',       domain: null },
  { name: 'Frigourias',  domain: null },
  { name: 'BJP',         domain: null },
  { name: 'Ciacarne',    domain: null },
  { name: 'Lar',         domain: 'larcooperativa.com.br' },
  { name: 'Gold Beef',   domain: null },
  { name: 'Beef Club',   domain: null },
  { name: 'Gran Nato',   domain: null },
  { name: 'Grã Filé',    domain: null },
  { name: 'Mafrinorte',  domain: null },
]

function BrandLogo({ name, domain }: { name: string; domain: string | null }) {
  const [err, setErr] = useState(false)
  const showImg = domain && !err
  return (
    <div className="inline-flex items-center justify-center h-16 px-5 min-w-[130px]
                    bg-white rounded-xl border border-gray-100 shadow-sm mx-3 flex-shrink-0
                    hover:border-vinho-200 hover:shadow-md transition-all duration-200">
      {showImg ? (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="max-h-9 max-w-[130px] object-contain"
          onError={() => setErr(true)}
        />
      ) : (
        <span className="text-gray-600 font-bold text-sm text-center leading-tight select-none">
          {name}
        </span>
      )}
    </div>
  )
}

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState(
    () => getProductsWithOverrides().filter(p => p.featured).slice(0, 8)
  )
  useEffect(() => {
    const refresh = () =>
      setFeaturedProducts(getProductsWithOverrides().filter(p => p.featured).slice(0, 8))
    window.addEventListener(CHANGE_EVENT, refresh)
    return () => window.removeEventListener(CHANGE_EVENT, refresh)
  }, [])

  return (
    <>
      {/* ══ HERO ═══════════════════════════════════════════════════════ */}
      <HeroBanner />

      {/* ══ POR QUE ROYAL ALIMENTOS ════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <span className="section-label">Nossos diferenciais</span>
            <h2 className="section-title mt-3">
              Por que escolher a Royal Alimentos?
            </h2>
            <div className="divider-red mt-4" />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-10">
            {highlights.map((item) => (
              <div key={item.title} className="flex gap-5 group">
                <div className="w-12 h-12 bg-vinho-700 group-hover:bg-verde-600 rounded-xl
                               flex items-center justify-center flex-shrink-0 mt-0.5
                               transition-colors duration-300">
                  <item.icon size={20} className="text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ MIX DE PROTEÍNAS — navy bg ═════════════════════════════════ */}
      <section className="py-24 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <span className="text-white/50 font-bold text-xs tracking-[0.18em] uppercase">Catálogo</span>
              <h2 className="section-title-white mt-3">Nosso Mix de Proteínas</h2>
              <div className="w-12 h-[3px] bg-verde-600 rounded-full mt-4" />
            </div>
            <Link to="/produtos"
              className="btn-outline-white self-start md:self-auto whitespace-nowrap">
              Ver catálogo completo
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/produtos?cat=${cat.slug}`}
                className="group bg-white/10 hover:bg-white rounded-2xl p-6 text-center
                           transition-all duration-300 hover:shadow-xl border border-white/10
                           hover:border-transparent"
              >
                <span className="text-4xl block mb-3">{cat.emoji}</span>
                <span className="font-semibold text-sm text-white group-hover:text-vinho-700 transition-colors">
                  {cat.label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRODUTOS EM DESTAQUE ════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <span className="section-label">Portfólio</span>
              <h2 className="section-title mt-3">Produtos em Destaque</h2>
              <div className="divider-red mt-4" />
            </div>
            <Link to="/produtos" className="btn-secondary whitespace-nowrap self-start sm:self-auto">
              Ver todos <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="tag bg-vinho-700 text-white">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-1 text-base" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-xs leading-relaxed mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  <a
                    href={`${WA}?text=Olá! Tenho interesse no produto: ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 border-2 border-vinho-700/20
                               hover:border-vinho-700 hover:bg-vinho-700 text-vinho-700 hover:text-white
                               text-sm font-semibold py-2.5 rounded-xl transition-all duration-200"
                  >
                    Solicitar cotação
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SEGMENTOS — full bleed dramático ═══════════════════════════ */}
      <section>
        <div className="grid md:grid-cols-2">
          <Link
            to="/food-service"
            className="relative overflow-hidden group flex flex-col justify-end"
            style={{ minHeight: '520px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=900&q=80"
              alt="Food Service"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-900/50 to-transparent" />
            <div className="relative p-10 md:p-12">
              <span className="badge-red mb-4 inline-flex">
                <ChefHat size={12} /> Food Service
              </span>
              <h3
                className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Restaurantes e Cozinhas Profissionais
              </h3>
              <p className="text-white/65 text-sm mb-6 max-w-sm">
                Cortes padronizados e variedade para operações que servem centenas de refeições por dia.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-semibold text-sm
                               group-hover:gap-4 transition-all duration-300">
                Saiba mais <ArrowRight size={15} />
              </span>
            </div>
          </Link>

          <Link
            to="/varejo"
            className="relative overflow-hidden group flex flex-col justify-end"
            style={{ minHeight: '520px' }}
          >
            <img
              src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=900&q=80"
              alt="Varejo"
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-vinho-950/95 via-vinho-900/55 to-transparent" />
            <div className="relative p-10 md:p-12">
              <span className="badge-navy mb-4 inline-flex">
                <ShoppingBag size={12} /> Varejo e Distribuição
              </span>
              <h3
                className="text-white text-2xl md:text-3xl font-bold mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Mercados, Açougues e Distribuidores
              </h3>
              <p className="text-white/65 text-sm mb-6 max-w-sm">
                Mix completo para o seu ponto de venda, com produtos de alto giro e cortes especiais para o balcão.
              </p>
              <span className="inline-flex items-center gap-2 text-white font-semibold text-sm
                               group-hover:gap-4 transition-all duration-300">
                Saiba mais <ArrowRight size={15} />
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ══ DIFERENCIAIS — split layout ════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label">Nossa Promessa</span>
              <h2 className="section-title mt-3 mb-4">
                A Realeza dos Alimentos
              </h2>
              <div className="divider-red mb-8" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                A Royal Alimentos foi construída para entregar excelência em cada pedido.
                Sabemos que o seu negócio depende de um fornecedor confiável — e é
                exatamente isso que somos.
              </p>
              <ul className="space-y-4 mb-10">
                {differentials.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <div className="w-5 h-5 bg-verde-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <span className="text-gray-700 text-sm leading-relaxed">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link to="/quem-somos" className="btn-secondary">
                  Nossa história
                </Link>
                <Link to="/seja-cliente" className="btn-primary">
                  Seja cliente <ArrowRight size={15} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=750&q=80"
                alt="Qualidade Royal Alimentos"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-5 -left-5 bg-vinho-700 rounded-2xl px-7 py-5 shadow-2xl hidden md:block">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    100%
                  </div>
                  <div className="text-white/70 text-xs uppercase tracking-wider mt-1">Refrigerado</div>
                </div>
              </div>
              <div className="absolute -top-5 -right-5 bg-verde-600 rounded-2xl px-7 py-5 shadow-2xl hidden md:block">
                <div className="text-white text-center">
                  <div className="text-3xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                    <Award size={28} className="mx-auto mb-1" />
                  </div>
                  <div className="text-white/80 text-xs uppercase tracking-wider">Qualidade</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ ÁREA DE ENTREGA ════════════════════════════════════════════ */}
      <section className="py-24 bg-slate-50 bg-grid-navy overflow-hidden relative">
        <div className="relative max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label">Cobertura</span>
              <h2 className="section-title mt-3">
                Entregamos em todo o Estado do Rio de Janeiro
              </h2>
              <div className="divider-red mt-4 mb-8" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Nossa frota cobre as principais regiões fluminenses, garantindo
                abastecimento pontual de segunda a sábado.
              </p>
              <div className="space-y-3">
                {deliveryRegions.map((r) => (
                  <div key={r.label}
                    className={`flex items-center gap-4 p-4 rounded-xl border ${r.color}`}>
                    <MapPin size={16} className="flex-shrink-0" />
                    <div>
                      <div className="font-semibold text-sm">{r.label}</div>
                      <div className="text-xs opacity-60 mt-0.5">{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <MapaEntrega />
          </div>
        </div>
      </section>

      {/* ══ CALCULADORA CTA ════════════════════════════════════════════ */}
      <section className="py-20 bg-vinho-700">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Calculator size={30} className="text-white" />
          </div>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Calcule seu churrasco
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-md mx-auto">
            Quantas pessoas? Quanto tempo? Nossa calculadora faz a conta por você.
          </p>
          <Link to="/calculadora"
            className="bg-verde-600 hover:bg-verde-700 text-white font-bold px-8 py-4 rounded-xl
                       transition-all duration-200 inline-flex items-center gap-2 shadow-lg hover:scale-105">
            <Calculator size={18} />
            Calcular agora
          </Link>
        </div>
      </section>

      {/* ══ FORNECEDORES ═══════════════════════════════════════════════ */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 mb-10 text-center">
          <span className="section-label">Parceiros</span>
          <h2 className="section-title mt-3">Nossos Fornecedores</h2>
          <div className="divider-red-center mt-4" />
          <p className="section-subtitle max-w-xl mx-auto">
            Trabalhamos com as melhores marcas do mercado de proteínas do Brasil.
          </p>
        </div>
        <div className="relative overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee gap-0 py-3">
            {[...brands, ...brands].map((brand, i) => (
              <BrandLogo key={i} name={brand.name} domain={brand.domain} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ O QUE VOCÊ PROCURA ════════════════════════════════════════ */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-12">
            <span className="section-label">Navegue</span>
            <h2 className="section-title mt-3">O que você procura?</h2>
            <div className="divider-red-center mt-4" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {[
              { to: '/produtos',     emoji: '🥩', title: 'Catálogo',           sub: 'Bovinos, aves, suínos, embutidos, congelados e pescados',   hov: 'hover:border-vinho-300' },
              { to: '/calculadora', emoji: '🔥', title: 'Calculadora',         sub: 'Saiba exatamente quanto comprar para o seu evento',          hov: 'hover:border-verde-300' },
              { to: '/representante-comercial', emoji: '🤝', title: 'Representante', sub: 'Faça parte da nossa rede comercial no Rio de Janeiro', hov: 'hover:border-vinho-300' },
              { to: '/trabalhe-conosco', emoji: '💼', title: 'Trabalhe Conosco', sub: 'Envie seu currículo e faça parte do time Royal Alimentos', hov: 'hover:border-gray-300' },
              { to: '/central-atendimento', emoji: '🎧', title: 'Atendimento',  sub: 'Registre dúvidas, sugestões ou ocorrências',              hov: 'hover:border-verde-300' },
            ].map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={`group flex flex-col items-center gap-4 p-7 bg-white rounded-2xl
                            border-2 border-gray-100 ${item.hov} hover:shadow-lg transition-all text-center`}
              >
                <span className="text-3xl">{item.emoji}</span>
                <div>
                  <div className="font-bold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-gray-400 text-xs leading-relaxed">{item.sub}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ AVALIAÇÃO GOOGLE ══════════════════════════════════════════ */}
      <GoogleReviewCTA />

      {/* ══ CTA FINAL ═════════════════════════════════════════════════ */}
      <section className="relative py-28 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=1600&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-vinho-900/92" />
        </div>
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <span className="text-verde-400 font-bold text-xs tracking-[0.2em] uppercase">
            Comece agora
          </span>
          <h2
            className="text-4xl md:text-5xl font-bold text-white mt-4 mb-6 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Pronto para ter a Royal Alimentos como sua fornecedora?
          </h2>
          <p className="text-white/65 text-xl mb-10 max-w-xl mx-auto">
            Cadastre sua empresa e um representante entrará em contato para montar
            a melhor proposta para o seu negócio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seja-cliente" className="btn-red text-base">
              Quero ser cliente <ArrowRight size={18} />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-outline-white text-base">
              <Phone size={16} />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
