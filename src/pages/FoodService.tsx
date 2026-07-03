import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Package, Star, Utensils } from 'lucide-react'

const WA = 'https://wa.me/5521996643765'

const benefits = [
  { icon: Package,   title: 'Cortes padronizados',       description: 'Consistência no corte e no peso para facilitar o controle de custo e o padrão do prato.' },
  { icon: Utensils,  title: 'Variedade de proteínas',    description: 'Bovinos, suínos, aves, embutidos e pescados para montar qualquer cardápio.' },
  { icon: Clock,     title: 'Atendimento recorrente',    description: 'Abastecimento programado para que o seu estoque nunca falte.' },
  { icon: Star,      title: 'Produtos para preparo rápido', description: 'Filés, cortes e produtos processados prontos para a linha de produção.' },
]

const clients = [
  'Restaurantes', 'Bares e lanchonetes', 'Hotéis',
  'Escolas e creches', 'Cozinhas industriais', 'Catering e eventos',
  'Clínicas e hospitais', 'Delivery',
]

const products = [
  { category: 'Bovinos',   items: ['Filé mignon', 'Carne moída', 'Patinho', 'Alcatra', 'Músculo'] },
  { category: 'Aves',      items: ['Filé de frango', 'Peito', 'Coxa sem dorso', 'Sobrecoxa', 'Sassami'] },
  { category: 'Suínos',    items: ['Filé suíno', 'Bisteca', 'Pernil', 'Lombo', 'Paleta'] },
  { category: 'Embutidos', items: ['Linguiça calabresa', 'Mortadela', 'Presunto', 'Salsicha'] },
]

export default function FoodService() {
  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section className="relative flex items-center overflow-hidden" style={{ minHeight: '580px' }}>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 hero-overlay" />
        </div>
        <div className="absolute top-0 left-0 right-0 h-[3px] bg-verde-600" />

        <div className="relative max-w-7xl mx-auto px-6 md:px-12 py-36 w-full">
          <div className="max-w-xl">
            <span className="badge-red mb-6 inline-flex">Food Service</span>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-5 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Proteínas para quem serve<br />
              centenas de refeições por dia
            </h1>
            <div className="w-12 h-[3px] bg-verde-600 rounded-full mb-6" />
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A Royal Alimentos atende operações que precisam de regularidade, padrão e
              confiança no fornecimento de proteínas.
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

      {/* ── SOLUÇÕES ──────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="max-w-xl mb-16">
            <span className="section-label">O que oferecemos</span>
            <h2 className="section-title mt-3">Soluções para Food Service</h2>
            <div className="divider-red mt-4" />
            <p className="section-subtitle">
              Trabalhamos com variedade de cortes e produtos para facilitar a rotina
              de quem serve centenas ou milhares de refeições todos os dias.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div key={b.title}
                className="p-7 rounded-2xl border border-gray-100 hover:border-vinho-200
                           hover:shadow-lg transition-all duration-300 group">
                <div className="w-12 h-12 bg-vinho-700 group-hover:bg-verde-600 rounded-xl
                               flex items-center justify-center mb-5 transition-colors duration-300">
                  <b.icon size={20} className="text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2" style={{ fontFamily: 'Inter, sans-serif' }}>
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── QUEM ATENDEMOS ────────────────────────────────────────── */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <span className="section-label">Clientes</span>
              <h2 className="section-title mt-3 mb-4">
                Quem atendemos no Food Service
              </h2>
              <div className="divider-red mb-8" />
              <p className="text-gray-600 leading-relaxed mb-8">
                Do pequeno restaurante à cozinha industrial de grande porte —
                se você produz refeições em escala, a Royal Alimentos tem a solução certa.
              </p>
              <div className="grid grid-cols-2 gap-3 mb-10">
                {clients.map((c) => (
                  <div key={c} className="flex items-center gap-2.5">
                    <div className="w-5 h-5 bg-verde-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle size={12} className="text-white" />
                    </div>
                    <span className="text-sm text-gray-700 font-medium">{c}</span>
                  </div>
                ))}
              </div>
              <Link to="/seja-cliente" className="btn-primary">
                Quero ser cliente <ArrowRight size={16} />
              </Link>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=750&q=80"
                alt="Cozinha profissional"
                className="rounded-3xl shadow-2xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUTOS POR CATEGORIA ────────────────────────────────── */}
      <section className="py-24 bg-vinho-700">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="text-center mb-14">
            <span className="text-white/50 font-bold text-xs tracking-[0.18em] uppercase">Portfólio</span>
            <h2
              className="text-3xl md:text-4xl font-bold text-white mt-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Produtos para Food Service
            </h2>
            <div className="w-12 h-[3px] bg-verde-600 rounded-full mx-auto mt-4 mb-4" />
            <p className="text-white/60 max-w-md mx-auto">
              Proteínas padronizadas e prontas para a linha de produção.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((cat) => (
              <div key={cat.category}
                className="bg-white/10 hover:bg-white/15 border border-white/15 rounded-2xl p-6
                           transition-all duration-200 backdrop-blur-sm">
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-1.5 h-7 bg-verde-600 rounded-full" />
                  <h3 className="font-bold text-white" style={{ fontFamily: 'Inter, sans-serif' }}>
                    {cat.category}
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-white/65">
                      <span className="w-1 h-1 bg-verde-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/produtos" className="btn-outline-white">
              Ver catálogo completo <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────── */}
      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80"
            alt=""
            aria-hidden
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/90" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <span className="text-verde-400 font-bold text-xs tracking-[0.2em] uppercase">Próximo passo</span>
          <h2
            className="text-3xl md:text-4xl font-bold text-white mt-4 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Qualidade que chega até o seu negócio.
          </h2>
          <p className="text-white/65 text-lg mb-8 max-w-lg mx-auto">
            Cadastre sua operação e um representante especializado em
            food service entrará em contato.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/seja-cliente" className="btn-red">
              Solicitar atendimento <ArrowRight size={18} />
            </Link>
            <a href={WA} target="_blank" rel="noopener noreferrer" className="btn-outline-white">
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
