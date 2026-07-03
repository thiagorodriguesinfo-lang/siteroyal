import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Instagram, MessageCircle } from 'lucide-react'

const WA = 'https://wa.me/5521996643765'
const INSTAGRAM = 'https://www.instagram.com/alimentosroyal/'
const EMAIL = 'comercial@royalalimentos.com.br'

const footerLinks = {
  empresa: [
    { to: '/quem-somos', label: 'Quem Somos' },
    { to: '/seja-cliente', label: 'Seja Cliente' },
    { to: '/representante-comercial', label: 'Seja Representante' },
    { to: '/trabalhe-conosco', label: 'Trabalhe Conosco' },
    { to: '/central-atendimento', label: 'Central de Atendimento' },
    { to: '/area-cliente', label: 'Área do Cliente' },
    { to: '/contato', label: 'Contato' },
  ],
  produtos: [
    { to: '/produtos?cat=bovinos',   label: 'Bovinos' },
    { to: '/produtos?cat=aves',      label: 'Aves' },
    { to: '/produtos?cat=suinos',    label: 'Suínos' },
    { to: '/produtos?cat=embutidos', label: 'Embutidos' },
    { to: '/produtos?cat=congelados',label: 'Congelados' },
    { to: '/produtos?cat=pescados',  label: 'Pescados' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center mb-5">
              <img
                src="/logo.png"
                alt="Royal Alimentos"
                className="h-12 w-auto max-w-[160px] object-contain"
              />
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-sm">
              Distribuidora de proteínas para varejo, food service e distribuição
              no Rio de Janeiro. Bovinos, aves, suínos, embutidos, congelados e
              pescados com qualidade, variedade e atendimento de verdade.
            </p>
            <p className="text-gray-500 text-xs mb-4 italic">
              "A Realeza dos Alimentos!"
            </p>
            <div className="flex gap-3">
              <a
                href={WA}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-green-600 rounded-lg flex items-center justify-center hover:bg-green-500 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={16} className="text-white" />
              </a>
              <a
                href={INSTAGRAM}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-pink-600 rounded-lg flex items-center justify-center hover:bg-pink-500 transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={16} className="text-white" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="w-9 h-9 bg-vinho-700 rounded-lg flex items-center justify-center hover:bg-vinho-600 transition-colors"
                aria-label="E-mail"
              >
                <Mail size={16} className="text-white" />
              </a>
            </div>
          </div>

          {/* Links — Empresa */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Empresa
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.empresa.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links — Produtos */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Produtos
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.produtos.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className="text-gray-400 hover:text-white text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">
              Contato
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Phone size={14} className="text-vinho-400 mt-0.5 flex-shrink-0" />
                <a href={WA} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors">
                  (21) 99664-3765
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail size={14} className="text-vinho-400 mt-0.5 flex-shrink-0" />
                <a href={`mailto:${EMAIL}`}
                  className="text-gray-400 hover:text-white text-sm transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Instagram size={14} className="text-vinho-400 mt-0.5 flex-shrink-0" />
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer"
                  className="text-gray-400 hover:text-white text-sm transition-colors">
                  @alimentosroyal
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={14} className="text-vinho-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  R. da Farinha, 985 — Penha Circular<br />
                  Rio de Janeiro — RJ, 21011-080
                </span>
              </li>
            </ul>

            <div className="mt-6">
              <Link to="/seja-cliente" className="btn-primary text-sm w-full justify-center">
                Seja Cliente
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-gray-500 text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Royal Alimentos. Todos os direitos reservados.
          </p>
          <p className="text-gray-600 text-xs">
            CNPJ: 44.447.433/0001-65
          </p>
        </div>
      </div>
    </footer>
  )
}
