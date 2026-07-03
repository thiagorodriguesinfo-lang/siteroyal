import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Search, X, Phone, MessageCircle } from 'lucide-react'
import { categoryLabels, subcategoryLabels, bovinoSubcategories } from '../data/products'
import { getProductsWithOverrides, CHANGE_EVENT } from '../utils/imageOverrides'
import type { ProductCategory } from '../types'

const allCategories: { value: string; label: string }[] = [
  { value: 'todos', label: 'Todos' },
  { value: 'bovinos', label: 'Bovinos' },
  { value: 'aves', label: 'Aves' },
  { value: 'suinos', label: 'Suínos' },
  { value: 'embutidos', label: 'Embutidos' },
  { value: 'congelados', label: 'Congelados' },
  { value: 'pescados', label: 'Pescados' },
]

type ProductItem = ReturnType<typeof getProductsWithOverrides>[0]

interface ProductModalProps {
  product: ProductItem
  onClose: () => void
}

function ProductModal({ product, onClose }: ProductModalProps) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handler)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
        <div className="relative">
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-[16/9] object-cover"
          />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full p-1.5 shadow hover:bg-white transition-colors"
            aria-label="Fechar"
          >
            <X size={18} className="text-gray-700" />
          </button>
          <div className="absolute top-3 left-3">
            <span className="tag bg-vinho-700 text-white">
              {categoryLabels[product.category]}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h3
            className="text-2xl font-bold text-gray-900 mb-2"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            {product.name}
          </h3>
          {product.subcategory && (
            <p className="text-sm text-gray-400 mb-3">
              {subcategoryLabels[product.subcategory] ?? product.subcategory}
            </p>
          )}
          <p className="text-gray-600 leading-relaxed mb-5">{product.description}</p>

          <div className="mb-5">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
              Sugestão de uso
            </p>
            <div className="flex flex-wrap gap-2">
              {product.uses.map((u: string) => (
                <span key={u} className="tag bg-vinho-50 text-vinho-700 font-medium">
                  {u}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-3">
            <a
              href={`https://wa.me/5500000000000?text=Olá! Tenho interesse no produto: ${product.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-primary justify-center"
            >
              <MessageCircle size={16} />
              Solicitar cotação
            </a>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 btn-secondary justify-center"
            >
              <Phone size={16} />
              Representante
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Produtos() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState('')
  const [selectedProduct, setSelectedProduct] = useState<ReturnType<typeof getProductsWithOverrides>[0] | null>(null)

  // Escuta overrides do admin em tempo real
  const [allProducts, setAllProducts] = useState(() => getProductsWithOverrides())
  useEffect(() => {
    const refresh = () => setAllProducts(getProductsWithOverrides())
    window.addEventListener(CHANGE_EVENT, refresh)
    return () => window.removeEventListener(CHANGE_EVENT, refresh)
  }, [])

  const cat = (searchParams.get('cat') ?? 'todos') as ProductCategory | 'todos'
  const sub = searchParams.get('sub') ?? 'todos'

  const setCategory = (value: string) => {
    const params = new URLSearchParams()
    if (value !== 'todos') params.set('cat', value)
    setSearchParams(params)
  }

  const setSubcategory = (value: string) => {
    const params = new URLSearchParams(searchParams)
    if (value === 'todos') params.delete('sub')
    else params.set('sub', value)
    setSearchParams(params)
  }

  const filtered = useMemo(() => {
    return allProducts.filter((p) => {
      const matchCat = cat === 'todos' || p.category === cat
      const matchSub = sub === 'todos' || p.subcategory === sub
      const matchSearch =
        search.trim() === '' ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.uses.some((u) => u.toLowerCase().includes(search.toLowerCase()))
      return matchCat && matchSub && matchSearch
    })
  }, [cat, sub, search, allProducts])

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1544025162-d76694265947?w=1400&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Catálogo de Produtos
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Bovinos, aves, suínos, embutidos, congelados e pescados.
            Explore nosso portfólio e solicite sua cotação.
          </p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="input-field pl-10 pr-10"
            />
            {search && (
              <button
                onClick={() => setSearch('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={16} />
              </button>
            )}
          </div>

          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-4">
            {allCategories.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  cat === c.value || (c.value === 'todos' && cat === 'todos')
                    ? 'bg-vinho-700 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Subcategory tabs — bovinos only */}
          {cat === 'bovinos' && (
            <div className="flex flex-wrap gap-2 mb-8 pb-4 border-b border-gray-100">
              {bovinoSubcategories.map((s) => (
                <button
                  key={s.value}
                  onClick={() => setSubcategory(s.value)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    sub === s.value
                      ? 'bg-vinho-50 text-vinho-700 border border-vinho-200'
                      : 'bg-gray-50 text-gray-500 hover:bg-gray-100 border border-transparent'
                  }`}
                >
                  {s.label}
                </button>
              ))}
            </div>
          )}

          {/* Count */}
          <p className="text-sm text-gray-400 mb-6">
            {filtered.length} produto{filtered.length !== 1 ? 's' : ''} encontrado{filtered.length !== 1 ? 's' : ''}
          </p>

          {/* Grid */}
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-400 text-lg">Nenhum produto encontrado.</p>
              <button
                onClick={() => { setSearch(''); setCategory('todos') }}
                className="mt-4 btn-secondary text-sm"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filtered.map((product) => (
                <div
                  key={product.id}
                  className="card group cursor-pointer"
                  onClick={() => setSelectedProduct(product)}
                >
                  <div className="relative overflow-hidden aspect-[4/3]">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                      <span className="tag bg-vinho-700 text-white">
                        {categoryLabels[product.category]}
                      </span>
                      {product.featured && (
                        <span className="tag bg-dourado-500 text-gray-900 font-semibold">
                          Destaque
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    {product.subcategory && (
                      <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-1">
                        {subcategoryLabels[product.subcategory] ?? product.subcategory}
                      </p>
                    )}
                    <h3
                      className="font-semibold text-gray-900 mb-1 group-hover:text-vinho-700 transition-colors"
                      style={{ fontFamily: 'Inter, sans-serif' }}
                    >
                      {product.name}
                    </h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-3 line-clamp-2">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {product.uses.slice(0, 3).map((use) => (
                        <span key={use} className="tag bg-gray-100 text-gray-500 text-[10px]">
                          {use}
                        </span>
                      ))}
                    </div>
                    <div className="flex gap-2">
                      <a
                        href={`https://wa.me/5500000000000?text=Olá! Tenho interesse no produto: ${product.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-vinho-700 hover:bg-vinho-800 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                      >
                        <MessageCircle size={12} />
                        Cotação
                      </a>
                      <button
                        onClick={(e) => { e.stopPropagation(); setSelectedProduct(product) }}
                        className="flex-1 flex items-center justify-center gap-1.5 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium py-2 rounded-lg transition-colors"
                      >
                        Ver detalhes
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA bottom */}
          <div className="mt-16 bg-vinho-50 rounded-2xl p-8 text-center border border-vinho-100">
            <h3
              className="text-2xl font-bold text-vinho-700 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Não encontrou o que precisava?
            </h3>
            <p className="text-gray-600 mb-6">
              Fale com um representante e monte o mix ideal para o seu negócio.
            </p>
            <a
              href="https://wa.me/5500000000000"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              <Phone size={16} />
              Falar com representante
            </a>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
