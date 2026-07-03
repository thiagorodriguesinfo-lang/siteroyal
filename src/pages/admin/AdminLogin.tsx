import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Lock, Eye, EyeOff, AlertCircle } from 'lucide-react'
import { adminLogin, isAdminAuthenticated } from '../../utils/adminAuth'

export default function AdminLogin() {
  const navigate  = useNavigate()
  const [user, setUser]   = useState('')
  const [pass, setPass]   = useState('')
  const [show, setShow]   = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isAdminAuthenticated()) navigate('/admin/imagens', { replace: true })
  }, [navigate])

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)
    setTimeout(() => {
      if (adminLogin(user, pass)) {
        navigate('/admin/imagens', { replace: true })
      } else {
        setError('Usuário ou senha incorretos.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(212,175,55,1) 1px, transparent 1px),' +
            'linear-gradient(90deg, rgba(212,175,55,1) 1px, transparent 1px)',
          backgroundSize: '44px 44px',
        }} />

      <div className="relative w-full max-w-sm">
        {/* Card */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl p-8">
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <img src="/logo.png" alt="Royal Alimentos" className="w-20 h-20 object-contain mb-3" />
            <h1 className="text-white font-bold text-xl"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Royal Alimentos
            </h1>
            <p className="text-gray-500 text-xs mt-1 tracking-widest uppercase">
              Painel Administrativo
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Usuário */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Usuário
              </label>
              <input
                type="text"
                autoComplete="username"
                required
                value={user}
                onChange={e => { setUser(e.target.value); setError('') }}
                className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-dourado-500 focus:ring-1 focus:ring-dourado-500 placeholder-gray-600 transition-colors"
                placeholder="Usuário"
              />
            </div>

            {/* Senha */}
            <div>
              <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-1.5">
                Senha
              </label>
              <div className="relative">
                <input
                  type={show ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={pass}
                  onChange={e => { setPass(e.target.value); setError('') }}
                  className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg px-4 py-3 pr-11 text-sm focus:outline-none focus:border-dourado-500 focus:ring-1 focus:ring-dourado-500 placeholder-gray-600 transition-colors"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShow(s => !s)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors">
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {/* Erro */}
            {error && (
              <div className="flex items-center gap-2 bg-red-900/30 border border-red-800/50 text-red-400 text-sm px-3 py-2.5 rounded-lg">
                <AlertCircle size={14} className="flex-shrink-0" />
                {error}
              </div>
            )}

            {/* Botão */}
            <button
              type="submit"
              disabled={loading}
              className="w-full flex items-center justify-center gap-2 bg-vinho-700 hover:bg-vinho-800 disabled:opacity-60 text-white font-bold py-3 rounded-lg transition-all mt-2"
            >
              {loading ? (
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                </svg>
              ) : <Lock size={15} />}
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-gray-700 text-[10px] mt-6">
            Área restrita — Royal Alimentos © {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  )
}
