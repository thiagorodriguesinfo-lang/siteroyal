import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle, Loader2, AlertCircle, Briefcase, Upload, X } from 'lucide-react'

const EMAILJS_SERVICE_ID  = 'service_fv4otsn'
const EMAILJS_TEMPLATE_ID = 'template_crwgynf'
const EMAILJS_PUB_KEY     = '9ixdnOZEvFVE4wcC_'

const AREAS = [
  'Comercial / Vendas', 'Logística / Entrega', 'Administrativo / Financeiro',
  'Marketing / Comunicação', 'Operacional / Estoque', 'RH / Recursos Humanos',
  'TI / Tecnologia', 'Gerência / Supervisão', 'Outro',
]

const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

interface TrabalheForm {
  nome: string; telefone: string; email: string
  cidade: string; uf: string; area: string; mensagem: string
}

const initial: TrabalheForm = {
  nome: '', telefone: '', email: '', cidade: '', uf: '', area: '', mensagem: '',
}

export default function TrabalheConosco() {
  const [form, setForm]   = useState<TrabalheForm>(initial)
  const [file, setFile]   = useState<File | null>(null)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const formRef = useRef<HTMLFormElement>(null)

  function set(field: keyof TrabalheForm, value: string) {
    setForm(p => ({ ...p, [field]: value }))
  }

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0]
    if (!f) return
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!allowed.includes(f.type)) {
      setErrorMsg('Formato não suportado. Use PDF, DOC ou DOCX.')
      return
    }
    if (f.size > 5 * 1024 * 1024) {
      setErrorMsg('Arquivo muito grande. Máximo 5 MB.')
      return
    }
    setFile(f)
    setErrorMsg('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading'); setErrorMsg('')

    try {
      const corpo = `
CANDIDATURA — Trabalhe Conosco | Royal Alimentos
Data: ${new Date().toLocaleDateString('pt-BR')}

Nome: ${form.nome}
Telefone: ${form.telefone}
E-mail: ${form.email}
Local: ${form.cidade}/${form.uf}
Área de interesse: ${form.area}
Mensagem:
${form.mensagem || 'Não informada'}

Currículo: ${file ? file.name : 'Não anexado'}
      `.trim()

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'comercial@royalalimentos.com.br',
        empresa: 'Candidatura RH',
        cnpj: '—',
        responsavel: form.nome,
        whatsapp: form.telefone,
        email_contato: form.email,
        cidade_estado: `${form.cidade}/${form.uf}`,
        segmento: form.area,
        produtos: '—',
        volume: '—',
        mensagem: corpo,
      }, EMAILJS_PUB_KEY)

      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg('Erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.')
    }
  }

  if (status === 'success') return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 bg-verde-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-verde-700" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Currículo enviado com sucesso!
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          Nossa equipe de RH irá avaliar seu perfil e entrar em contato caso
          haja uma oportunidade compatível com seu perfil.
        </p>
        <button onClick={() => { setForm(initial); setFile(null); setStatus('idle') }}
          className="btn-secondary">
          Enviar outra candidatura
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-verde-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Briefcase size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Trabalhe Conosco
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Faça parte do time Royal Alimentos. Preencha o formulário abaixo e envie seu currículo.
            Nossa equipe de RH irá avaliar seu perfil.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Nome completo <span className="text-red-500">*</span>
                </label>
                <input required type="text" name="nome" className="input-field"
                  placeholder="Seu nome completo" value={form.nome}
                  onChange={e => set('nome', e.target.value)} />
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Telefone / WhatsApp <span className="text-red-500">*</span>
                  </label>
                  <input required type="tel" name="telefone" className="input-field"
                    placeholder="(00) 00000-0000" value={form.telefone}
                    onChange={e => set('telefone', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    E-mail <span className="text-red-500">*</span>
                  </label>
                  <input required type="email" name="email" className="input-field"
                    placeholder="seu@email.com" value={form.email}
                    onChange={e => set('email', e.target.value)} />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">
                    Cidade <span className="text-red-500">*</span>
                  </label>
                  <input required type="text" name="cidade" className="input-field"
                    placeholder="Sua cidade" value={form.cidade}
                    onChange={e => set('cidade', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">UF</label>
                  <select name="uf" className="select-field" value={form.uf}
                    onChange={e => set('uf', e.target.value)}>
                    <option value="">UF</option>
                    {STATES.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Área de interesse <span className="text-red-500">*</span>
                </label>
                <select required name="area" className="select-field" value={form.area}
                  onChange={e => set('area', e.target.value)}>
                  <option value="">Selecione uma área...</option>
                  {AREAS.map(a => <option key={a}>{a}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensagem</label>
                <textarea rows={3} name="mensagem" className="input-field resize-none"
                  placeholder="Fale um pouco sobre você, sua experiência e o que espera..."
                  value={form.mensagem} onChange={e => set('mensagem', e.target.value)} />
              </div>

              {/* Upload de currículo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Currículo (PDF, DOC ou DOCX — máx. 5 MB)
                </label>
                {file ? (
                  <div className="flex items-center gap-3 p-3 bg-verde-50 border border-verde-200 rounded-xl">
                    <CheckCircle size={16} className="text-verde-700 flex-shrink-0" />
                    <span className="text-sm text-verde-800 font-medium flex-1 truncate">{file.name}</span>
                    <button type="button" onClick={() => setFile(null)}
                      className="text-gray-400 hover:text-gray-600 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center gap-2 p-6 border-2 border-dashed border-gray-200 rounded-xl cursor-pointer hover:border-vinho-400 hover:bg-vinho-50 transition-all">
                    <Upload size={24} className="text-gray-400" />
                    <span className="text-sm text-gray-500">Clique para selecionar o arquivo</span>
                    <span className="text-xs text-gray-400">PDF, DOC, DOCX</span>
                    <input type="file" className="sr-only" accept=".pdf,.doc,.docx"
                      onChange={handleFile} />
                  </label>
                )}
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'}
                className="w-full btn-green justify-center text-base py-4 disabled:opacity-60">
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" /> Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Briefcase size={18} /> Enviar candidatura
                  </span>
                )}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Seus dados serão usados exclusivamente pelo RH da Royal Alimentos.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
