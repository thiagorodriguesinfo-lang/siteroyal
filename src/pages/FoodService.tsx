import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, Clock, Package, Star, Utensils } from 'lucide-react'

const benefits = [
  {
    icon: Package,
    title: 'Cortes padronizados',
    description:
      'Consistência no corte e no peso para facilitar o controle de custo e o padrão do prato.',
  },
  {
    icon: Utensils,
    title: 'Variedade de proteínas',
    description:
      'Bovinos, suínos, aves, embutidos e pescados para montar qualquer cardápio.',
  },
  {
    icon: Clock,
    title: 'Atendimento recorrente',
    description:
      'Abastecimento programado para que o seu estoque nunca falte.',
  },
  {
    icon: Star,
    title: 'Produtos para preparo rápido',
    description:
      'Filés, cortes e produtos processados prontos para a linha de produção.',
  },
]

const clients = [
  'Restaurantes', 'Bares e lanchonetes', 'Hotéis', 'Escolas e creches',
  'Cozinhas industriais', 'Catering e eventos', 'Clínicas e hospitais', 'Delivery',
]

const products = [
  { category: 'Bovinos', items: ['Filé mignon', 'Carne moída', 'Patinho', 'Alcatra', 'Músculo'] },
  { category: 'Aves', items: ['Filé de frango', 'Peito', 'Coxa sem dorso', 'Sobrecoxa', 'Sassami'] },
  { category: 'Suínos', items: ['Filé suíno', 'Bisteca', 'Pernil', 'Lombo', 'Paleta'] },
  { category: 'Embutidos', items: ['Linguiça calabresa', 'Mortadela', 'Presunto', 'Salsicha'] },
]

export default function FoodService() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-900/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-vinho-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              Food Service
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Proteínas para quem serve<br />
              centenas de refeições por dia
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A Royal Alimentos atende operações que precisam de regularidade, padrão e
              confiança no fornecimento de proteínas.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link to="/seja-cliente" className="btn-primary">
                Quero ser cliente
                <ArrowRight size={16} />
              </Link>
              <Link to="/produtos" className="btn-outline-white">
                Ver catálogo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* O que oferecemos */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">
              Soluções para Food Service
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Trabalhamos com variedade de cortes e produtos para facilitar a rotina
              de quem serve centenas ou milhares de refeições todos os dias.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="p-6 rounded-2xl border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-vinho-50 rounded-xl flex items-center justify-center mb-4">
                  <b.icon size={22} className="text-vinho-700" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2"
                  style={{ fontFamily: 'Inter, sans-serif' }}>
                  {b.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">{b.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clientes que atendemos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title gold-underline mb-6">
                Quem atendemos no Food Service
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Do pequeno restaurante à cozinha industrial de grande porte.
                Se você produz refeições em escala, a Royal Alimentos tem a solução certa.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {clients.map((c) => (
                  <div key={c} className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-verde-700 flex-shrink-0" />
                    <span className="text-sm text-gray-700">{c}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/seja-cliente" className="btn-primary">
                  Quero ser cliente
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>

            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=700&q=80"
                alt="Cozinha profissional"
                className="rounded-2xl shadow-xl w-full object-cover aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Produtos por categoria */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">
              Produtos para Food Service
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Proteínas padronizadas e prontas para a linha de produção.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {products.map((cat) => (
              <div
                key={cat.category}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-vinho-700 rounded-full" />
                  <h3 className="font-bold text-gray-900"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {cat.category}
                  </h3>
                </div>
                <ul className="space-y-2">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-center gap-2 text-sm text-gray-600">
                      <span className="w-1 h-1 bg-gray-400 rounded-full flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/produtos" className="btn-secondary">
              Ver catálogo completo
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-vinho-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-3xl md:text-4xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Qualidade que chega até o seu negócio.
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Cadastre sua operação e um representante especializado em
            food service entrará em contato.
          </p>
          <Link
            to="/seja-cliente"
            className="bg-white text-vinho-700 hover:bg-gray-50 font-semibold px-8 py-3.5 rounded-lg transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl text-base"
          >
            Solicitar atendimento
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
