import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogOut, Search, RefreshCw, Save, RotateCcw,
  CheckCircle, ImageOff, ExternalLink, Download, X, Eye,
} from 'lucide-react'
import { isAdminAuthenticated, adminLogout } from '../../utils/adminAuth'
import {
  getImageOverrides, setImageOverride, clearImageOverride,
  clearAllOverrides, CHANGE_EVENT,
} from '../../utils/imageOverrides'
import { products as defaultProducts } from '../../data/products'
import { categoryLabels } from '../../data/products'
import type { Product } from '../../types'

const CATEGORIES = ['todos', 'bovinos', 'aves', 'suinos', 'embutidos', 'congelados', 'pescados']

// ── Product row editor ─────────────────────────────────────────────────────
function ProductRow({
  product,
  override,
  onSave,
  onReset,
}: {
  product: Product
  override?: string
  onSave: (id: string, url: string) => void
  onReset: (id: string) => void
}) {
  const effectiveUrl  = override || product.image
  const [url, setUrl] = useState(effectiveUrl)
  const [imgOk, setImgOk] = useState(true)
  const [saved, setSaved]  = useState(false)
  const hasChange  = url.trim() !== effectiveUrl
  const isCustom   = !!override

  useEffect(() => { setUrl(override || product.image) }, [override, product.image])

  function handleSave() {
    if (!url.trim()) return
    onSave(product.id, url.trim())
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  function handleReset() {
    setUrl(product.image)
    onReset(product.id)
  }

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all ${
      isCustom ? 'border-dourado-400 shadow-sm' : 'border-gray-200'
    }`}>
      <div className="flex gap-3 p-3">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0">
          {imgOk ? (
            <img
              key={url}
              src={url}
              alt={product.name}
              onError={() => setImgOk(false)}
              onLoad={() => setImgOk(true)}
              className="w-20 h-16 object-cover rounded-lg"
            />
          ) : (
            <div className="w-20 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
              <ImageOff size={20} className="text-gray-300" />
            </div>
          )}
          {isCustom && (
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-dourado-500 rounded-full flex items-center justify-center">
              <CheckCircle size={10} className="text-white" />
            </div>
          )}
        </div>

        {/* Info + URL */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1.5">
            <span className="font-semibold text-gray-900 text-sm truncate">{product.name}</span>
            <span className={`flex-shrink-0 text-[10px] font-semibold px-2 py-0.5 rounded-full ${
              isCustom
                ? 'bg-dourado-100 text-dourado-700'
                : 'bg-gray-100 text-gray-500'
            }`}>
              {isCustom ? '✦ Customizado' : categoryLabels[product.category] || product.category}
            </span>
          </div>

          <div className="flex gap-1.5">
            <input
              type="url"
              value={url}
              onChange={e => { setUrl(e.target.value); setImgOk(true) }}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              placeholder="https://..."
              className="flex-1 text-xs bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-vinho-400 focus:ring-1 focus:ring-vinho-400 font-mono min-w-0"
            />
            <a href={url} target="_blank" rel="noopener noreferrer"
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0">
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 px-3 pb-3">
        <button
          onClick={handleSave}
          disabled={!hasChange && !saved}
          className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg transition-all ${
            saved
              ? 'bg-verde-100 text-verde-700'
              : hasChange
              ? 'bg-vinho-700 text-white hover:bg-vinho-800'
              : 'bg-gray-100 text-gray-400 cursor-default'
          }`}
        >
          {saved ? <CheckCircle size={12} /> : <Save size={12} />}
          {saved ? 'Salvo!' : 'Salvar'}
        </button>

        {isCustom && (
          <button onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg bg-gray-100 text-gray-600 hover:bg-gray-200 transition-all">
            <RotateCcw size={12} />
            Restaurar
          </button>
        )}
      </div>
    </div>
  )
}

// ── Modal de exportação ────────────────────────────────────────────────────
function ExportModal({ overrides, onClose }: { overrides: Record<string, string>; onClose: () => void }) {
  const [copied, setCopied] = useState(false)

  const entries = Object.entries(overrides)
  const code = entries.length === 0
    ? '// Nenhuma alteração customizada'
    : entries.map(([id, url]) => {
        const p = defaultProducts.find(x => x.id === id)
        return `// ${p?.name || id}\nimage: '${url}',`
      }).join('\n\n')

  function copy() {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div>
            <h2 className="font-bold text-gray-900 text-lg">Exportar Alterações</h2>
            <p className="text-gray-500 text-xs mt-0.5">
              {entries.length} produto{entries.length !== 1 ? 's' : ''} com imagem customizada
            </p>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        <div className="p-5 overflow-auto flex-1">
          <p className="text-sm text-gray-600 mb-3">
            Cole este código no arquivo <code className="bg-gray-100 px-1.5 py-0.5 rounded text-vinho-700 text-xs">src/data/products.ts</code> para cada produto correspondente:
          </p>
          <pre className="bg-gray-950 text-green-400 text-xs rounded-xl p-4 overflow-auto font-mono leading-relaxed">
            {code}
          </pre>
        </div>

        <div className="p-5 border-t border-gray-100 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            Fechar
          </button>
          <button onClick={copy}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
              copied ? 'bg-verde-700 text-white' : 'bg-vinho-700 text-white hover:bg-vinho-800'
            }`}>
            {copied ? <CheckCircle size={14} /> : <Download size={14} />}
            {copied ? 'Copiado!' : 'Copiar código'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Painel principal ───────────────────────────────────────────────────────
export default function AdminImagens() {
  const navigate  = useNavigate()
  const [overrides, setOverrides] = useState<Record<string, string>>(getImageOverrides)
  const [search, setSearch]       = useState('')
  const [category, setCategory]   = useState('todos')
  const [showExport, setShowExport] = useState(false)

  useEffect(() => {
    if (!isAdminAuthenticated()) { navigate('/admin', { replace: true }); return }
  }, [navigate])

  // Escuta mudanças em tempo real
  const reload = useCallback(() => setOverrides(getImageOverrides()), [])
  useEffect(() => {
    window.addEventListener(CHANGE_EVENT, reload)
    return () => window.removeEventListener(CHANGE_EVENT, reload)
  }, [reload])

  function handleLogout() {
    adminLogout()
    navigate('/admin', { replace: true })
  }

  function handleSave(id: string, url: string) {
    setImageOverride(id, url)
  }

  function handleReset(id: string) {
    clearImageOverride(id)
  }

  function handleClearAll() {
    if (!confirm('Restaurar todas as imagens para o padrão?')) return
    clearAllOverrides()
  }

  // Filtros
  const filtered = defaultProducts.filter(p => {
    const matchCat  = category === 'todos' || p.category === category
    const matchSearch = search.trim() === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  const customCount = Object.keys(overrides).length

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-gray-950 border-b border-gray-800 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Royal Alimentos" className="h-9 w-auto" />
          <div>
            <div className="text-white font-semibold text-sm">Royal Alimentos</div>
            <div className="text-gray-500 text-[10px] tracking-wider uppercase">Admin · Imagens</div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Preview do site */}
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-white px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">
            <Eye size={13} />
            Ver site
          </a>

          {/* Export */}
          <button onClick={() => setShowExport(true)}
            className="flex items-center gap-1.5 text-xs font-semibold text-dourado-400 hover:text-dourado-300 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">
            <Download size={13} />
            Exportar
            {customCount > 0 && (
              <span className="bg-dourado-500 text-gray-900 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {customCount}
              </span>
            )}
          </button>

          {/* Logout */}
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 text-xs text-gray-400 hover:text-red-400 px-3 py-1.5 rounded-lg hover:bg-gray-800 transition-colors">
            <LogOut size={13} />
            Sair
          </button>
        </div>
      </header>

      {/* Sub-header: filtros */}
      <div className="bg-white border-b border-gray-200 px-6 py-3 sticky top-14 z-30">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative flex-1 min-w-52 max-w-sm">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar produto..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:border-vinho-400"
            />
          </div>

          {/* Category tabs */}
          <div className="flex gap-1 flex-wrap">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-full transition-all ${
                  category === cat
                    ? 'bg-vinho-700 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}>
                {cat === 'todos' ? 'Todos' : categoryLabels[cat] || cat}
              </button>
            ))}
          </div>

          {/* Count + clear all */}
          <div className="ml-auto flex items-center gap-2 text-xs text-gray-400">
            <span>{filtered.length} produtos</span>
            {customCount > 0 && (
              <button onClick={handleClearAll}
                className="flex items-center gap-1 text-red-500 hover:text-red-700 px-2 py-1 rounded hover:bg-red-50 transition-colors">
                <RefreshCw size={11} />
                Restaurar tudo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banner informativo */}
      <div className="bg-blue-50 border-b border-blue-100 px-6 py-2">
        <div className="max-w-7xl mx-auto text-xs text-blue-700 flex items-center gap-2">
          <span className="font-semibold">ℹ</span>
          As alterações ficam salvas neste navegador. Use <strong>Exportar</strong> para gerar o código e aplicar de forma permanente para todos os usuários.
        </div>
      </div>

      {/* Grid de produtos */}
      <main className="flex-1 px-6 py-6">
        <div className="max-w-7xl mx-auto">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-gray-400">Nenhum produto encontrado.</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => (
                <ProductRow
                  key={p.id}
                  product={p}
                  override={overrides[p.id]}
                  onSave={handleSave}
                  onReset={handleReset}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-3 text-center text-xs text-gray-400">
        Royal Alimentos — Painel Administrativo · {defaultProducts.length} produtos cadastrados
      </footer>

      {/* Modal de export */}
      {showExport && <ExportModal overrides={overrides} onClose={() => setShowExport(false)} />}
    </div>
  )
}
