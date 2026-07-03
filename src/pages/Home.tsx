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
    title: 'Distribuição',
    description: 'Entrega para distribuidores, atacadistas e grandes compradores com logística eficiente.',
  },
  {
    icon: ChefHat,
    title: 'Food Service',
    description: 'Atendimento especializado para restaurantes, hotéis, cozinhas industriais e escolas.',
  },
  {
    icon: ShoppingBag,
    title: 'Varejo',
    description: 'Mix completo para mercados, açougues, hortifrutis e empórios.',
  },
  {
    icon: Award,
    title: 'Qualidade e Procedência',
    description: 'Produtos rastreados, com procedência garantida e padrão de qualidade em cada entrega.',
  },
  {
    icon: Star,
    title: 'Variedade de Proteínas',
    description: 'Bovinos, aves, suínos, embutidos, congelados e pescados em um único fornecedor.',
  },
  {
    icon: Users,
    title: 'Atendimento Consultivo',
    description: 'Representantes especializados que entendem o seu negócio e ajudam a montar o mix ideal.',
  },
]

const deliveryRegions = [
  { label: 'Rio de Janeiro', sub: 'Região Metropolitana', color: 'border-vinho-200 bg-vinho-50 text-vinho-700' },
  { label: 'Região Serrana', sub: 'Petrópolis, Teresópolis, Nova Friburgo...', color: 'border-verde-200 bg-verde-50 text-verde-700' },
  { label: 'Sul Fluminense', sub: 'Volta Redonda, Barra Mansa, Resende...', color: 'border-gray-200 bg-gray-50 text-gray-700' },
  { label: 'Costa Verde', sub: 'Angra dos Reis, Paraty, Mangaratiba...', color: 'border-cyan-200 bg-cyan-50 text-cyan-700' },
  { label: 'Região dos Lagos', sub: 'Cabo Frio, Búzios, Arraial do Cabo...', color: 'border-blue-200 bg-blue-50 text-blue-700' },
]

const categories = [
  { label: 'Bovinos',   slug: 'bovinos',   emoji: '🥩', color: 'bg-red-50 border-red-100 text-red-700' },
  { label: 'Aves',      slug: 'aves',      emoji: '🍗', color: 'bg-amber-50 border-amber-100 text-amber-700' },
  { label: 'Suínos',    slug: 'suinos',    emoji: '🐷', color: 'bg-pink-50 border-pink-100 text-pink-700' },
  { label: 'Embutidos', slug: 'embutidos', emoji: '🌭', color: 'bg-orange-50 border-orange-100 text-orange-700' },
  { label: 'Congelados',slug: 'congelados',emoji: '❄️', color: 'bg-blue-50 border-blue-100 text-blue-700' },
  { label: 'Pescados',  slug: 'pescados',  emoji: '🐟', color: 'bg-cyan-50 border-cyan-100 text-cyan-700' },
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
  { name: 'Friboi',         domain: 'friboi.com.br' },
  { name: 'Seara',          domain: 'seara.com.br' },
  { name: 'Perdigão',       domain: 'perdigao.com.br' },
  { name: 'Marfrig',        domain: 'marfrig.com.br' },
  { name: 'Aurora',         domain: 'auroraalimentos.com.br' },
  { name: 'Copacol',        domain: 'copacol.com.br' },
  { name: 'Frimesa',        domain: 'frimesa.com.br' },
  { name: 'Coopavel',       domain: 'coopavel.com.br' },
  { name: 'C.Vale',         domain: 'cvale.com.br' },
  { name: 'Bem Brasil',     domain: 'bembrasil.com.br' },
  { name: 'Diplomata',      domain: 'diplomata.com.br' },
  { name: 'Pif Paf',        domain: 'pifpaf.com.br' },
  { name: 'McCain',         domain: 'mccain.com.br' },
  { name: 'Qualy',          domain: 'qualy.com.br' },
  { name: 'Frialto',        domain: 'frialto.com.br' },
  { name: 'Rivelli',        domain: 'rivelli.com.br' },
  { name: 'Saudali',        domain: 'saudali.com.br' },
  { name: 'Frigon',         domain: null },
  { name: 'Agro Yoshi',     domain: null },
  { name: 'Mais Frango',    domain: null },
  { name: 'PUL',            domain: null },
  { name: 'Sarriette',      domain: null },
  { name: 'Mafrial',        domain: null },
  { name: 'Só Minas',       domain: null },
  { name: 'Jaguá',          domain: null },
  { name: 'Frigourias',     domain: null },
  { name: 'BJP',            domain: null },
  { name: 'Ciacarne',       domain: null },
  { name: 'Limatore',       domain: null },
  { name: 'Lar',            domain: 'larcooperativa.com.br' },
  { name: 'Faz Carne',      domain: null },
  { name: 'Boa Lac',        domain: null },
  { name: 'Fribal',         domain: null },
  { name: 'Beef Club',      domain: null },
  { name: 'Gold Beef',      domain: null },
  { name: 'Komdelli',       domain: null },
  { name: 'Bello',          domain: null },
  { name: 'Frigomarca',     domain: null },
  { name: 'Gui Bon',        domain: null },
  { name: 'Boa Carne',      domain: null },
  { name: 'Landim',         domain: null },
  { name: 'Dália',          domain: null },
  { name: 'Gran Nato',      domain: null },
  { name: 'Kreminas',       domain: null },
  { name: 'Lé Vida',        domain: null },
  { name: 'Irmãos do Valle',domain: null },
  { name: 'Claybom',        domain: null },
  { name: 'Plena',          domain: null },
  { name: 'Mendes',         domain: null },
  { name: 'Estrela',        domain: null },
  { name: 'Grã Filé',       domain: null },
  { name: 'Callegaro',      domain: null },
  { name: 'Paladar',        domain: null },
  { name: 'Natville',       domain: null },
  { name: 'Mafrinorte',     domain: null },
  { name: 'Di Prima',       domain: null },
  { name: 'Golden Imex',    domain: null },
]

function BrandLogo({ name, domain }: { name: string; domain: string | null }) {
  const [err, setErr] = useState(false)
  const showImg = domain && !err
  return (
    <div className="inline-flex items-center justify-center h-16 px-5 min-w-[130px] max-w-[200px] bg-white rounded-xl border border-gray-100 shadow-sm mx-2.5 flex-shrink-0">
      {showImg ? (
        <img
          src={`https://logo.clearbit.com/${domain}`}
          alt={name}
          className="max-h-9 max-w-[140px] object-contain"
          onError={() => setErr(true)}
        />
      ) : (
        <span className="text-gray-700 font-bold text-sm text-center leading-tight select-none">
          {name}
        </span>
      )}
    </div>
  )
}

export default function Home() {
  // Produtos em destaque — reage a alterações do painel admin em tempo real
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
      {/* ── HERO BANNER ──────────────────────────────────────────────── */}
      <HeroBanner />

      {/* ── DESTAQUES ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">
              Por que escolher a Royal Alimentos?
            </h2>
            <p className="section-subtitle max-w-2xl mx-auto">
              Somos um parceiro completo para quem precisa de proteínas com qualidade,
              variedade e atendimento especializado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {highlights.map((item) => (
              <div
                key={item.title}
                className="p-6 rounded-2xl border border-gray-100 hover:border-vinho-200 hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-12 h-12 bg-vinho-50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-vinho-700 transition-colors">
                  <item.icon size={22} className="text-vinho-700 group-hover:text-white transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {item.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LOCAIS DE ENTREGA ─────────────────────────────────────────── */}
      <section className="py-20 bg-white overflow-hidden relative">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(139,26,26,1) 1px, transparent 1px),' +
              'linear-gradient(90deg, rgba(139,26,26,1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }} />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Texto + regiões */}
            <div>
              <div className="inline-flex items-center gap-2 bg-vinho-50 text-vinho-700 text-sm px-4 py-1.5 rounded-full border border-vinho-200 mb-6">
                <MapPin size={14} />
                Área de atuação
              </div>
              <h2
                className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Entregamos em todo o Estado do Rio de Janeiro
              </h2>
              <div className="w-16 h-1 bg-dourado-500 mb-6" />
              <p className="text-gray-600 text-lg leading-relaxed mb-8">
                Nossa frota cobre as principais regiões fluminenses,
                garantindo abastecimento pontual de segunda a sábado.
              </p>

              <div className="space-y-3">
                {deliveryRegions.map((r) => (
                  <div
                    key={r.label}
                    className={`flex items-start gap-4 p-4 rounded-xl border ${r.color}`}
                  >
                    <MapPin size={18} className="flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-sm">{r.label}</div>
                      <div className="text-xs opacity-70 mt-0.5">{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa premium de entrega */}
            <MapaEntrega />
          </div>
        </div>
      </section>

      {/* ── CATEGORIAS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">
              Nosso Mix de Proteínas
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Um portfólio completo para atender qualquer demanda do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                to={`/produtos?cat=${cat.slug}`}
                className={`flex flex-col items-center gap-3 p-5 rounded-2xl border-2 ${cat.color} hover:shadow-md transition-all duration-200 hover:-translate-y-1`}
              >
                <span className="text-4xl">{cat.emoji}</span>
                <span className="font-semibold text-sm">{cat.label}</span>
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link to="/produtos" className="btn-primary">
              Ver catálogo completo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── PRODUTOS DESTAQUE ──────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="section-title gold-underline">Produtos em Destaque</h2>
              <p className="section-subtitle">
                Cortes e produtos mais procurados pelos nossos clientes.
              </p>
            </div>
            <Link to="/produtos" className="btn-secondary whitespace-nowrap">
              Ver todos
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProducts.map((product) => (
              <div key={product.id} className="card group">
                <div className="relative overflow-hidden aspect-[4/3]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="tag bg-vinho-700 text-white">
                      {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </span>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {product.name}
                  </h3>
                  <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap gap-1 mb-3">
                    {product.uses.slice(0, 2).map((use) => (
                      <span key={use} className="tag bg-gray-100 text-gray-600 text-[10px]">{use}</span>
                    ))}
                  </div>
                  <a
                    href={`${WA}?text=Olá! Tenho interesse no produto: ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 bg-vinho-50 hover:bg-vinho-700 text-vinho-700 hover:text-white text-sm font-medium py-2.5 rounded-lg transition-all duration-200"
                  >
                    Solicitar cotação
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── DIFERENCIAIS ──────────────────────────────────────────────── */}
      <section className="py-20 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2
                className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                A Realeza dos Alimentos!
              </h2>
              <div className="w-16 h-1 bg-dourado-500 mb-6" />
              <p className="text-white/80 text-lg leading-relaxed mb-8">
                A Royal Alimentos foi construída sobre um princípio simples: levar
                proteínas de excelência para empresas que exigem qualidade e confiança
                em cada entrega.
              </p>
              <ul className="space-y-3">
                {differentials.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <CheckCircle size={18} className="text-dourado-400 flex-shrink-0 mt-0.5" />
                    <span className="text-white/90 text-sm">{d}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/quem-somos" className="btn-outline-white">
                  Conheça nossa história
                </Link>
                <Link to="/seja-cliente" className="bg-dourado-500 hover:bg-dourado-600 text-gray-900 font-semibold px-6 py-3 rounded-lg transition-all inline-flex items-center gap-2">
                  Seja cliente
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1558030006-450675393462?w=700&q=80"
                alt="Cortes de carne de qualidade"
                className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-verde-700 rounded-lg flex items-center justify-center">
                    <Award size={20} className="text-white" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Qualidade garantida</div>
                    <div className="text-xs text-gray-500">Procedência rastreada</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEGMENTOS ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">Atendemos seu segmento</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Do churrasco ao food service, a Royal Alimentos entrega confiança.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Link to="/food-service"
              className="relative overflow-hidden rounded-2xl group min-h-[280px] flex items-end p-8">
              <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80" alt="Food Service"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-vinho-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                  <ChefHat size={12} /> Food Service
                </div>
                <h3 className="text-white text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Restaurantes e Cozinhas
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Cortes padronizados e variedade para operações que servem centenas de refeições por dia.
                </p>
                <span className="inline-flex items-center gap-1 text-white text-sm font-medium group-hover:gap-3 transition-all">
                  Saiba mais <ArrowRight size={14} />
                </span>
              </div>
            </Link>

            <Link to="/varejo"
              className="relative overflow-hidden rounded-2xl group min-h-[280px] flex items-end p-8">
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&q=80" alt="Varejo"
                className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-verde-900/90 via-verde-900/40 to-transparent" />
              <div className="relative">
                <div className="inline-flex items-center gap-2 bg-verde-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-3">
                  <ShoppingBag size={12} /> Varejo e Distribuição
                </div>
                <h3 className="text-white text-2xl font-bold mb-2"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                  Mercados e Açougues
                </h3>
                <p className="text-white/70 text-sm mb-4">
                  Mix completo para o seu ponto de venda, com produtos de giro e cortes especiais para o balcão.
                </p>
                <span className="inline-flex items-center gap-1 text-white text-sm font-medium group-hover:gap-3 transition-all">
                  Saiba mais <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── CALCULADORA CTA ───────────────────────────────────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-white rounded-3xl p-10 shadow-sm border border-gray-100">
            <div className="w-16 h-16 bg-vinho-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Calculator size={32} className="text-vinho-700" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Calcule seu churrasco
            </h2>
            <p className="text-gray-500 mb-6 max-w-md mx-auto">
              Quantas pessoas? Quanto tempo? Use nossa calculadora e descubra
              exatamente o que precisa comprar.
            </p>
            <Link to="/calculadora" className="btn-primary text-base px-8 py-3.5">
              <Calculator size={18} />
              Calcule seu churrasco
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARCAS PARCEIRAS ──────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <h2 className="section-title gold-underline-center">
            Nossos Fornecedores
          </h2>
          <p className="section-subtitle max-w-xl mx-auto">
            Trabalhamos com as melhores marcas do mercado de proteínas do Brasil.
          </p>
        </div>

        {/* Marquee infinito */}
        <div className="relative overflow-hidden">
          {/* fade lateral */}
          <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          <div className="flex animate-marquee gap-0 py-3">
            {/* duplicado para loop contínuo */}
            {[...brands, ...brands].map((brand, i) => (
              <BrandLogo key={i} name={brand.name} domain={brand.domain} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTAS PRINCIPAIS ───────────────────────────────────────────── */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title gold-underline-center">O que você procura?</h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Acesse rapidamente os principais serviços da Royal Alimentos.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
            <Link to="/produtos"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-gray-100 hover:border-vinho-300 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-vinho-50 rounded-2xl flex items-center justify-center group-hover:bg-vinho-700 transition-colors">
                <span className="text-2xl">🥩</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Conheça nosso catálogo</div>
                <div className="text-gray-500 text-sm">Bovinos, aves, suínos, embutidos, congelados e pescados</div>
              </div>
            </Link>
            <Link to="/calculadora"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-gray-100 hover:border-dourado-400 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-dourado-50 rounded-2xl flex items-center justify-center group-hover:bg-dourado-500 transition-colors">
                <span className="text-2xl">🔥</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Calcule seu churrasco</div>
                <div className="text-gray-500 text-sm">Saiba exatamente quanto comprar para o seu evento</div>
              </div>
            </Link>
            <Link to="/representante-comercial"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-gray-100 hover:border-vinho-300 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-vinho-50 rounded-2xl flex items-center justify-center group-hover:bg-vinho-700 transition-colors">
                <span className="text-2xl">🤝</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Seja um representante</div>
                <div className="text-gray-500 text-sm">Faça parte da nossa rede comercial em todo o Rio de Janeiro</div>
              </div>
            </Link>
            <Link to="/trabalhe-conosco"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-gray-100 hover:border-verde-300 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-verde-50 rounded-2xl flex items-center justify-center group-hover:bg-verde-700 transition-colors">
                <span className="text-2xl">💼</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Trabalhe Conosco</div>
                <div className="text-gray-500 text-sm">Envie seu currículo e faça parte do time Royal Alimentos</div>
              </div>
            </Link>
            <Link to="/central-atendimento"
              className="group flex flex-col items-center gap-4 p-7 rounded-2xl border-2 border-gray-100 hover:border-verde-300 hover:shadow-lg transition-all text-center">
              <div className="w-14 h-14 bg-verde-50 rounded-2xl flex items-center justify-center group-hover:bg-verde-700 transition-colors">
                <span className="text-2xl">🎧</span>
              </div>
              <div>
                <div className="font-bold text-gray-900 mb-1">Central de Atendimento</div>
                <div className="text-gray-500 text-sm">Registre dúvidas, sugestões ou ocorrências com nossa equipe</div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── AVALIAÇÃO GOOGLE ────────────────────────────────────────────── */}
      <GoogleReviewCTA />

      {/* ── SEJA CLIENTE CTA ──────────────────────────────────────────── */}
      <section
        className="py-20 bg-cover bg-center relative"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1586816001966-79b736744398?w=1400&q=80')" }}
      >
        <div className="absolute inset-0 bg-verde-900/85" />
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Pronto para ter a Royal Alimentos como fornecedora?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-xl mx-auto">
            Cadastre sua empresa e um representante entrará em contato para
            montar a melhor proposta para o seu negócio.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seja-cliente" className="btn-primary text-base px-8 py-3.5">
              Quero ser cliente
              <ArrowRight size={18} />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer"
              className="btn-outline-white text-base px-8 py-3.5">
              <Phone size={16} />
              Falar pelo WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
