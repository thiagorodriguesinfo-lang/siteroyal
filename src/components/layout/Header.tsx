import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Phone, ChevronDown, Headset, Sparkles } from 'lucide-react'

const navLinks = [
  { to: '/', label: 'Início' },
  { to: '/quem-somos', label: 'Quem Somos' },
  { to: '/produtos', label: 'Produtos' },
  {
    label: 'Segmentos',
    children: [
      { to: '/food-service', label: 'Food Service' },
      { to: '/varejo', label: 'Varejo e Distribuição' },
    ],
  },
  { to: '/calculadora', label: 'Calcule seu churrasco' },
  { to: '/contato', label: 'Contato' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
    setDropdownOpen(false)
  }, [location])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? 'bg-white shadow-lg border-gray-200'
          : 'bg-white shadow-sm border-gray-100'
      }`}
    >
      {/* Top bar */}
      <div className="bg-vinho-700 text-white text-xs py-2 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span className="text-white/80">Distribuição de proteínas para varejo, food service e distribuição</span>
          <a
            href="https://wa.me/5521996643765"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-white hover:text-dourado-300 transition-colors"
          >
            <Phone size={12} />
            <span>(21) 99664-3765</span>
          </a>
        </div>
      </div>

      {/* Main nav */}
      <nav className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center select-none">
          <img
            src="/logo.png"
            alt="Royal Alimentos"
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) =>
            link.children ? (
              <div key={link.label} className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-vinho-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  {link.label}
                  <ChevronDown size={14} className={`transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {dropdownOpen && (
                  <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-50">
                    {link.children.map((child) => (
                      <NavLink
                        key={child.to}
                        to={child.to}
                        className={({ isActive }) =>
                          `block px-4 py-2.5 text-sm font-medium transition-colors ${
                            isActive
                              ? 'text-vinho-700 bg-vinho-50'
                              : 'text-gray-700 hover:text-vinho-700 hover:bg-gray-50'
                          }`
                        }
                      >
                        {child.label}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <NavLink
                key={link.to}
                to={link.to!}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'text-vinho-700 bg-vinho-50'
                      : 'text-gray-700 hover:text-vinho-700 hover:bg-gray-50'
                  }`
                }
              >
                {link.label}
              </NavLink>
            )
          )}
        </div>

        {/* CTA buttons */}
        <div className="hidden lg:flex items-center gap-2">
          <Link to="/trabalhe-conosco"
            className="text-sm font-medium text-gray-500 hover:text-vinho-700 px-3 py-2 rounded-full hover:bg-vinho-50/70 transition-all duration-200">
            Trabalhe Conosco
          </Link>

          <Link to="/central-atendimento"
            className="group flex items-center gap-1.5 text-sm font-semibold text-verde-700 px-4 py-2.5 rounded-full
                       border border-verde-600/25 bg-verde-50/50 backdrop-blur-sm
                       transition-all duration-300 ease-out
                       hover:border-verde-600/60 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(227,30,36,0.4)]">
            <Headset size={15} className="transition-transform duration-300 group-hover:scale-110 group-hover:drop-shadow-[0_0_6px_rgba(227,30,36,0.6)]" />
            Central de Atendimento
          </Link>

          <Link to="/representante-comercial"
            className="group flex items-center gap-1.5 text-sm font-semibold text-vinho-700 px-4 py-2.5 rounded-full
                       border border-vinho-600/25 bg-vinho-50/50 backdrop-blur-sm
                       transition-all duration-300 ease-out
                       hover:border-vinho-600/60 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_-6px_rgba(27,42,107,0.4)]">
            Seja Representante
          </Link>

          <div className="relative group">
            <span
              aria-hidden="true"
              className="absolute -inset-1 rounded-full blur-md pointer-events-none transition-opacity duration-300 opacity-50 group-hover:opacity-90"
              style={{
                background: 'linear-gradient(120deg, #1B2A6B, #E31E24)',
                animation: 'pulse-glow 2.6s ease-in-out infinite',
              }}
            />
            <Link
              to="/seja-cliente"
              className="relative overflow-hidden flex items-center gap-1.5 text-sm font-bold text-white pl-5 pr-6 py-2.5 rounded-full
                         transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.03]"
              style={{
                background: 'linear-gradient(120deg, #1B2A6B 0%, #25338e 45%, #E31E24 100%)',
                boxShadow: '0 4px 20px -4px rgba(227,30,36,0.45), inset 0 0 0 1px rgba(255,255,255,0.12)',
              }}
            >
              <span
                aria-hidden="true"
                className="absolute inset-0 pointer-events-none"
                style={{
                  background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
                  backgroundSize: '200% auto',
                  animation: 'cta-shine 2.8s linear infinite',
                }}
              />
              <Sparkles size={15} className="relative z-10" />
              <span className="relative z-10">Seja Cliente</span>
            </Link>
          </div>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 transition-colors"
          aria-label="Menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-4 flex flex-col gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <div className="px-3 py-2 text-xs font-semibold text-gray-400 uppercase tracking-wider">
                    {link.label}
                  </div>
                  {link.children.map((child) => (
                    <NavLink
                      key={child.to}
                      to={child.to}
                      className={({ isActive }) =>
                        `block px-6 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                          isActive
                            ? 'text-vinho-700 bg-vinho-50'
                            : 'text-gray-700 hover:text-vinho-700 hover:bg-gray-50'
                        }`
                      }
                    >
                      {child.label}
                    </NavLink>
                  ))}
                </div>
              ) : (
                <NavLink
                  key={link.to}
                  to={link.to!}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    `block px-3 py-2.5 text-sm font-medium rounded-lg transition-colors ${
                      isActive
                        ? 'text-vinho-700 bg-vinho-50'
                        : 'text-gray-700 hover:text-vinho-700 hover:bg-gray-50'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              )
            )}
            <div className="pt-3 flex flex-col gap-2.5 border-t border-gray-100 mt-2">
              <Link to="/central-atendimento"
                className="flex items-center justify-center gap-1.5 text-sm font-semibold text-verde-700 border border-verde-600/25 bg-verde-50/50 backdrop-blur-sm px-4 py-2.5 rounded-full text-center transition-all duration-300 hover:border-verde-600/60 hover:shadow-[0_6px_16px_-4px_rgba(227,30,36,0.35)]">
                <Headset size={15} />
                Central de Atendimento
              </Link>
              <Link to="/representante-comercial"
                className="flex items-center justify-center text-sm font-semibold text-vinho-700 border border-vinho-600/25 bg-vinho-50/50 backdrop-blur-sm px-4 py-2.5 rounded-full text-center transition-all duration-300 hover:border-vinho-600/60 hover:shadow-[0_6px_16px_-4px_rgba(27,42,107,0.35)]">
                Seja Representante
              </Link>
              <Link to="/trabalhe-conosco"
                className="flex items-center justify-center text-sm font-medium text-gray-500 border border-gray-200 px-4 py-2.5 rounded-full text-center transition-all duration-300 hover:text-vinho-700 hover:bg-vinho-50/70">
                Trabalhe Conosco
              </Link>
              <div className="relative">
                <span
                  aria-hidden="true"
                  className="absolute -inset-1 rounded-full blur-md pointer-events-none opacity-60"
                  style={{
                    background: 'linear-gradient(120deg, #1B2A6B, #E31E24)',
                    animation: 'pulse-glow 2.6s ease-in-out infinite',
                  }}
                />
                <Link
                  to="/seja-cliente"
                  className="relative overflow-hidden flex items-center justify-center gap-1.5 text-sm font-bold text-white px-6 py-3 rounded-full text-center"
                  style={{
                    background: 'linear-gradient(120deg, #1B2A6B 0%, #25338e 45%, #E31E24 100%)',
                    boxShadow: '0 4px 20px -4px rgba(227,30,36,0.45), inset 0 0 0 1px rgba(255,255,255,0.12)',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.35) 50%, transparent 60%)',
                      backgroundSize: '200% auto',
                      animation: 'cta-shine 2.8s linear infinite',
                    }}
                  />
                  <Sparkles size={15} className="relative z-10" />
                  <span className="relative z-10">Seja Cliente</span>
                </Link>
              </div>
              <Link to="/area-cliente" className="btn-secondary justify-center text-sm">
                Área do Cliente
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
