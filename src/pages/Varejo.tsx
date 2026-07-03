import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle, ShoppingBag, Truck } from 'lucide-react'

const highlights = [
  'Mix completo de bovinos, aves, suínos, embutidos e pescados',
  'Produtos com maior giro para o balcão',
  'Cortes especiais para venda no balcão e gôndola',
  'Produtos para churrasco e datas sazonais',
  'Embutidos e congelados de alta saída',
  'Atendimento comercial especializado',
  'Logística pontual e regularidade de abastecimento',
  'Suporte para montagem do mix ideal',
]

const categories = [
  {
    label: 'Bovinos para balcão',
    items: ['Picanha', 'Alcatra', 'Filé mignon', 'Cupim', 'Fraldinha', 'Carne moída', 'Músculo'],
  },
  {
    label: 'Aves',
    items: ['Frango inteiro', 'Coxa e sobrecoxa', 'Filé de frango', 'Coração', 'Moela'],
  },
  {
    label: 'Suínos e embutidos',
    items: ['Bisteca', 'Costela suína', 'Linguiça calabresa', 'Linguiça toscana', 'Presunto'],
  },
  {
    label: 'Congelados e pescados',
    items: ['Hambúrguer', 'Nuggets', 'Tilápia', 'Merluza', 'Camarão'],
  },
]

export default function Varejo() {
  return (
    <>
      {/* Hero */}
      <section className="relative py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1542838132-92c53300491e?w=1400&q=80')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-verde-900/90 to-verde-900/50" />
        <div className="relative max-w-7xl mx-auto px-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-verde-700 text-white text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              Varejo e Distribuição
            </div>
            <h1
              className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Mix completo para quem<br />
              vende proteínas todos os dias
            </h1>
            <p className="text-white/70 text-lg leading-relaxed mb-8">
              A Royal Alimentos abastece mercados, açougues, hortifrutis, empórios
              e distribuidores com o portfólio certo para o seu ponto de venda.
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

      {/* Benefícios */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="section-title gold-underline mb-6">
                O que a Royal Alimentos oferece para o varejo
              </h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                Entendemos que o varejo precisa de produtos com giro, cortes que
                vendem no balcão e um fornecedor que entrega com pontualidade.
                É exatamente isso que entregamos.
              </p>
              <div className="space-y-3">
                {highlights.map((h) => (
                  <div key={h} className="flex items-start gap-3">
                    <CheckCircle size={17} className="text-verde-700 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{h}</span>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/seja-cliente" className="btn-primary">
                  Seja cliente
                  <ArrowRight size={16} />
                </Link>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                >
                  Fale com representante
                </a>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=400&q=80"
                alt="Carnes no balcão"
                className="rounded-2xl object-cover aspect-square w-full"
              />
              <img
                src="https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80"
                alt="Cortes especiais"
                className="rounded-2xl object-cover aspect-square w-full mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Produtos */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="section-title gold-underline-center">
              Produtos para Varejo
            </h2>
            <p className="section-subtitle max-w-xl mx-auto">
              Cortes e categorias que vendem no balcão e na gôndola.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat) => (
              <div
                key={cat.label}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
              >
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-6 bg-verde-700 rounded-full" />
                  <h3 className="font-bold text-gray-900 text-sm"
                    style={{ fontFamily: 'Inter, sans-serif' }}>
                    {cat.label}
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

      {/* Distribuição */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-900 rounded-3xl p-10 grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="w-12 h-12 bg-vinho-700 rounded-xl flex items-center justify-center mb-6">
                <Truck size={22} className="text-white" />
              </div>
              <h2
                className="text-3xl font-bold text-white mb-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Distribuidores
              </h2>
              <p className="text-gray-400 leading-relaxed mb-6">
                Para distribuidores que atendem múltiplos pontos de venda,
                a Royal Alimentos oferece volume, variedade, logística confiável
                e suporte comercial dedicado.
              </p>
              <Link to="/seja-cliente" className="btn-primary">
                Quero ser distribuidor
                <ArrowRight size={16} />
              </Link>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1586816001966-79b736744398?w=600&q=80"
                alt="Logística e distribuição"
                className="rounded-2xl object-cover w-full aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-verde-700">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <ShoppingBag size={28} className="text-white" />
          </div>
          <h2
            className="text-3xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Variedade, procedência e atendimento de verdade.
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            Cadastre seu negócio e receba uma proposta personalizada para o seu ponto de venda.
          </p>
          <Link
            to="/seja-cliente"
            className="bg-white text-verde-700 hover:bg-gray-50 font-semibold px-8 py-3.5 rounded-lg transition-all inline-flex items-center gap-2 shadow-lg hover:shadow-xl text-base"
          >
            Cadastrar minha empresa
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </>
  )
}
