import { useState } from 'react'
import { CheckCircle, Mail, MapPin, Phone, Instagram, MessageCircle } from 'lucide-react'

interface FormData {
  name: string
  company: string
  whatsapp: string
  email: string
  message: string
}

const initial: FormData = {
  name: '',
  company: '',
  whatsapp: '',
  email: '',
  message: '',
}

export default function Contato() {
  const [form, setForm] = useState<FormData>(initial)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  function set(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      setSubmitted(true)
    }, 1000)
  }

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-gray-900 relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1586816001966-79b736744398?w=1400&q=80')",
          }}
        />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
          >
            Fale com a Royal Alimentos
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Estamos prontos para atender seu negócio. Entre em contato pelo
            canal de sua preferência.
          </p>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-10">
            {/* Info */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="section-title mb-6">Canais de atendimento</h2>
              </div>

              <a
                href="https://wa.me/5521996643765"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-green-300 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 bg-green-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-green-700 transition-colors">
                    WhatsApp
                  </div>
                  <div className="text-gray-400 text-sm">(21) 99664-3765</div>
                  <div className="text-xs text-green-600 font-medium mt-0.5">
                    Atendimento rápido
                  </div>
                </div>
              </a>

              <a
                href="mailto:comercial@royalalimentos.com.br"
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-vinho-300 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 bg-vinho-700 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Mail size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-vinho-700 transition-colors">
                    E-mail
                  </div>
                  <div className="text-gray-400 text-sm">comercial@royalalimentos.com.br</div>
                </div>
              </a>

              <a
                href="https://www.instagram.com/alimentosroyal/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100 hover:border-pink-300 hover:shadow-md transition-all group"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Instagram size={20} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 group-hover:text-pink-600 transition-colors">
                    Instagram
                  </div>
                  <div className="text-gray-400 text-sm">@alimentosroyal</div>
                </div>
              </a>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={20} className="text-gray-500" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Endereço</div>
                  <div className="text-gray-400 text-sm leading-relaxed">
                    R. da Farinha, 985<br />
                    Penha Circular, Rio de Janeiro — RJ<br />
                    CEP: 21011-080
                  </div>
                  <a
                    href="https://maps.google.com/?q=R.+da+Farinha,+985,+Penha+Circular,+Rio+de+Janeiro,+RJ,+21011-080"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-vinho-700 font-medium mt-2 hover:text-vinho-800"
                  >
                    <MapPin size={11} />
                    Como chegar
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-gray-100">
                <div className="w-11 h-11 bg-gray-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={20} className="text-gray-500" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Telefone / SAC</div>
                  <div className="text-gray-400 text-sm">(21) 99664-3765</div>
                  <div className="text-gray-400 text-sm">Seg–Sáb, segunda a sábado</div>
                </div>
              </div>
            </div>

            {/* Formulário */}
            <div className="lg:col-span-3">
              {submitted ? (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center h-full flex items-center justify-center">
                  <div>
                    <div className="w-16 h-16 bg-verde-50 rounded-full flex items-center justify-center mx-auto mb-5">
                      <CheckCircle size={32} className="text-verde-700" />
                    </div>
                    <h3
                      className="text-2xl font-bold text-gray-900 mb-3"
                      style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                    >
                      Mensagem enviada!
                    </h3>
                    <p className="text-gray-500">
                      Em breve um representante da Royal Alimentos entrará em contato.
                    </p>
                    <button
                      onClick={() => { setForm(initial); setSubmitted(false) }}
                      className="mt-6 btn-secondary text-sm"
                    >
                      Enviar nova mensagem
                    </button>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
                  <h2 className="font-bold text-gray-900 text-xl mb-6">
                    Envie uma mensagem
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Nome <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="text"
                          className="input-field"
                          placeholder="Seu nome"
                          value={form.name}
                          onChange={(e) => set('name', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          Empresa
                        </label>
                        <input
                          type="text"
                          className="input-field"
                          placeholder="Nome da empresa"
                          value={form.company}
                          onChange={(e) => set('company', e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          WhatsApp <span className="text-red-500">*</span>
                        </label>
                        <input
                          required
                          type="tel"
                          className="input-field"
                          placeholder="(00) 00000-0000"
                          value={form.whatsapp}
                          onChange={(e) => set('whatsapp', e.target.value)}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1.5">
                          E-mail
                        </label>
                        <input
                          type="email"
                          className="input-field"
                          placeholder="email@empresa.com.br"
                          value={form.email}
                          onChange={(e) => set('email', e.target.value)}
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1.5">
                        Mensagem <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        required
                        rows={5}
                        className="input-field resize-none"
                        placeholder="Como podemos ajudar?"
                        value={form.message}
                        onChange={(e) => set('message', e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full btn-primary justify-center text-base py-3.5"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                          </svg>
                          Enviando...
                        </span>
                      ) : 'Enviar mensagem'}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
