import { Link } from 'react-router-dom'
import {
  Lock, FileText, ShoppingBag, Star, MessageCircle, Download, ArrowRight
} from 'lucide-react'

const features = [
  { icon: FileText, label: 'Segunda via de boletos' },
  { icon: ShoppingBag, label: 'Histórico de pedidos' },
  { icon: Star, label: 'Catálogo exclusivo' },
  { icon: MessageCircle, label: 'Canal com representante' },
  { icon: Download, label: 'Download de catálogos' },
  { icon: FileText, label: 'Solicitação de cotação' },
]

export default function AreaCliente() {
  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="w-16 h-16 bg-vinho-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Lock size={28} className="text-vinho-400" />
          </div>
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Área do Cliente
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto">
            Acesso exclusivo para clientes Royal Alimentos.
          </p>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          {/* Aviso em breve */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center mb-8">
            <div className="w-20 h-20 bg-vinho-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Lock size={36} className="text-vinho-700" />
            </div>
            <h2
              className="text-2xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Em breve para você
            </h2>
            <p className="text-gray-500 leading-relaxed mb-8">
              Área exclusiva para clientes Royal Alimentos. Em breve, você poderá
              consultar pedidos, boletos, catálogos e solicitações diretamente por aqui.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-8">
              {features.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl text-left"
                >
                  <div className="w-8 h-8 bg-vinho-50 rounded-lg flex items-center justify-center flex-shrink-0">
                    <f.icon size={14} className="text-vinho-700" />
                  </div>
                  <span className="text-xs text-gray-600 font-medium">{f.label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <Link to="/seja-cliente" className="w-full btn-primary justify-center">
                Solicitar acesso
                <ArrowRight size={16} />
              </Link>
              <a
                href="https://wa.me/5521996643765"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full btn-secondary justify-center"
              >
                <MessageCircle size={16} />
                Falar com representante
              </a>
            </div>
          </div>

          {/* Formulário de login mockado */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8 opacity-50 pointer-events-none select-none">
            <h3 className="font-bold text-gray-900 mb-6 text-center">
              Login — Em breve
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  CNPJ ou E-mail
                </label>
                <input
                  type="text"
                  className="input-field"
                  placeholder="00.000.000/0000-00"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Senha
                </label>
                <input
                  type="password"
                  className="input-field"
                  placeholder="••••••••"
                  disabled
                />
              </div>
              <button disabled className="w-full btn-primary justify-center opacity-50">
                Entrar
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
