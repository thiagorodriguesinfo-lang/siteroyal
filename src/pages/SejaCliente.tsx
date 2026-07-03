import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'
import { CheckCircle, Building2, Loader2, AlertCircle, Search, Phone, Mail, MessageSquare } from 'lucide-react'

// ╔══════════════════════════════════════════════════════════════════════════╗
// ║  CONFIGURAÇÃO — preencha com suas credenciais antes de publicar         ║
// ║                                                                          ║
// ║  EMAIL (EmailJS — emailjs.com, grátis 200 envios/mês):                 ║
// ║   1. Crie conta em emailjs.com                                           ║
// ║   2. Conecte seu serviço de e-mail (Gmail, Outlook…)                   ║
// ║   3. Crie um Template com as variáveis abaixo                           ║
// ║   4. Preencha EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, EMAILJS_PUB_KEY  ║
// ║                                                                          ║
// ║  WHATSAPP (CallMeBot — callmebot.com, grátis):                          ║
// ║   1. Salve +34 623 91 22 04 na agenda como "CallMeBot"                 ║
// ║   2. Envie "I allow callmebot to send me messages" para esse contato    ║
// ║   3. Você receberá um apikey por WhatsApp (em até 2 minutos)           ║
// ║   4. Preencha CALLMEBOT_API_KEY abaixo                                  ║
// ╚══════════════════════════════════════════════════════════════════════════╝

const EMAILJS_SERVICE_ID  = 'service_fv4otsn'
const EMAILJS_TEMPLATE_ID = 'template_crwgynf'
const EMAILJS_PUB_KEY     = '9ixdnOZEvFVE4wcC_'

const WA_NUMERO           = '5521996643765'      // 21 99664-3765 (formato internacional)
const CALLMEBOT_API_KEY   = '9347636'

// ── Constantes do formulário ───────────────────────────────────────────────
const SEGMENTS = [
  'Restaurante', 'Mercado', 'Açougue', 'Distribuidor',
  'Cozinha Industrial', 'Hotel', 'Escola', 'Outro',
]
const PRODUCTS_OF_INTEREST = ['Bovinos', 'Aves', 'Suínos', 'Embutidos', 'Congelados', 'Pescados']
const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA',
  'MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN',
  'RS','RO','RR','SC','SP','SE','TO',
]

// ── Tipos ──────────────────────────────────────────────────────────────────
type CnpjStatus    = 'idle' | 'validating' | 'valid' | 'invalid' | 'not_found' | 'api_error'
type PhoneStatus   = 'idle' | 'valid' | 'invalid'
type SendStatus    = 'idle' | 'sending' | 'done' | 'error'

interface FormData {
  companyName: string; cnpj: string; contactName: string; whatsapp: string
  email: string; city: string; state: string; segment: string
  productsOfInterest: string[]; monthlyVolume: string; message: string
}

const initial: FormData = {
  companyName: '', cnpj: '', contactName: '', whatsapp: '',
  email: '', city: '', state: '', segment: '',
  productsOfInterest: [], monthlyVolume: '', message: '',
}

// ── Utilitários de máscara e validação ────────────────────────────────────
function mascaraCNPJ(v: string) {
  const n = v.replace(/\D/g, '').slice(0, 14)
  return n
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2}\.\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{2}\.\d{3}\.\d{3})(\d)/, '$1/$2')
    .replace(/^(\d{2}\.\d{3}\.\d{3}\/\d{4})(\d)/, '$1-$2')
}

function validarCNPJ(cnpj: string) {
  const n = cnpj.replace(/\D/g, '')
  if (n.length !== 14 || /^(\d)\1+$/.test(n)) return false
  const dig = (base: string) => {
    let s = 0, m = base.length - 7
    for (let i = 0; i < base.length; i++) { s += parseInt(base[i]) * m; m = m === 2 ? 9 : m - 1 }
    const r = s % 11; return r < 2 ? 0 : 11 - r
  }
  return dig(n.slice(0, 12)) === parseInt(n[12]) && dig(n.slice(0, 13)) === parseInt(n[13])
}

function mascaraTelefone(v: string) {
  const n = v.replace(/\D/g, '').slice(0, 11)
  if (n.length <= 10) return n.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{4})(\d+)$/, '$1-$2')
  return n.replace(/^(\d{2})(\d)/, '($1) $2').replace(/(\d{5})(\d+)$/, '$1-$2')
}
const digitosTel = (v: string) => v.replace(/\D/g, '').length

// ── Envios ─────────────────────────────────────────────────────────────────
async function enviarEmail(form: FormData): Promise<void> {
  await emailjs.send(
    EMAILJS_SERVICE_ID,
    EMAILJS_TEMPLATE_ID,
    {
      to_email:      'comercial@royalalimentos.com.br',
      empresa:       form.companyName,
      cnpj:          form.cnpj,
      responsavel:   form.contactName,
      whatsapp:      form.whatsapp,
      email_contato: form.email || 'Não informado',
      cidade_estado: `${form.city} — ${form.state}`,
      segmento:      form.segment,
      produtos:      form.productsOfInterest.join(', ') || 'Não informado',
      volume:        form.monthlyVolume || 'Não informado',
      mensagem:      form.message       || 'Não informada',
    },
    EMAILJS_PUB_KEY
  )
}

function enviarWhatsApp(form: FormData): void {
  const texto =
    `🔔 *NOVO LEAD - Royal Alimentos*\n\n` +
    `🏢 *Empresa:* ${form.companyName}\n` +
    `📄 *CNPJ:* ${form.cnpj}\n` +
    `👤 *Responsável:* ${form.contactName}\n` +
    `📱 *WhatsApp:* ${form.whatsapp}\n` +
    `📧 *E-mail:* ${form.email || 'Não informado'}\n` +
    `📍 *Local:* ${form.city} — ${form.state}\n` +
    `🏪 *Segmento:* ${form.segment}\n` +
    `📦 *Produtos:* ${form.productsOfInterest.join(', ') || 'Não informado'}\n` +
    `📊 *Volume:* ${form.monthlyVolume || 'Não informado'}\n` +
    (form.message ? `💬 *Mensagem:* ${form.message}` : '')

  // CallMeBot via img tag (evita CORS)
  const img = new Image()
  img.src =
    `https://api.callmebot.com/whatsapp.php` +
    `?phone=${WA_NUMERO}` +
    `&text=${encodeURIComponent(texto)}` +
    `&apikey=${CALLMEBOT_API_KEY}`
}

// ── Componente ─────────────────────────────────────────────────────────────
export default function SejaCliente() {
  const [form, setForm]           = useState<FormData>(initial)
  const [cnpjStatus, setCnpjStatus]   = useState<CnpjStatus>('idle')
  const [phoneStatus, setPhoneStatus] = useState<PhoneStatus>('idle')
  const [autoFilled, setAutoFilled]   = useState<Set<string>>(new Set())
  const [sendStatus, setSendStatus]   = useState<SendStatus>('idle')
  const [sendLog, setSendLog]         = useState({ email: false, wa: false })
  const cnpjAbort = useRef<AbortController | null>(null)

  function setField(field: keyof FormData, value: string) {
    setForm(prev => ({ ...prev, [field]: value }))
    setAutoFilled(prev => { const s = new Set(prev); s.delete(field); return s })
  }

  // CNPJ
  async function handleCNPJ(raw: string) {
    const masked = mascaraCNPJ(raw)
    setField('cnpj', masked)
    if (masked.replace(/\D/g, '').length < 14) { setCnpjStatus('idle'); return }
    if (!validarCNPJ(masked)) { setCnpjStatus('invalid'); return }

    setCnpjStatus('validating')
    cnpjAbort.current?.abort()
    cnpjAbort.current = new AbortController()
    try {
      const res = await fetch(
        `https://brasilapi.com.br/api/cnpj/v1/${masked.replace(/\D/g, '')}`,
        { signal: cnpjAbort.current.signal }
      )
      if (res.status === 404) { setCnpjStatus('not_found'); return }
      if (!res.ok)            { setCnpjStatus('api_error'); return }

      const data = await res.json()
      const filled = new Set<string>()
      if (data.razao_social || data.nome_fantasia) {
        const name = (data.nome_fantasia?.trim() || data.razao_social?.trim()) as string
        setForm(p => ({ ...p, companyName: name })); filled.add('companyName')
      }
      if (data.municipio) {
        const city = (data.municipio as string).trim().toLowerCase().replace(/\b\w/g, c => c.toUpperCase())
        setForm(p => ({ ...p, city })); filled.add('city')
      }
      if (data.uf) { setForm(p => ({ ...p, state: (data.uf as string).toUpperCase() })); filled.add('state') }
      setAutoFilled(filled); setCnpjStatus('valid')
    } catch (e: unknown) {
      if (e instanceof Error && e.name === 'AbortError') return
      setCnpjStatus('api_error')
    }
  }

  // WhatsApp
  function handlePhone(raw: string) {
    const masked = mascaraTelefone(raw)
    setField('whatsapp', masked)
    const d = digitosTel(masked)
    setPhoneStatus(d === 0 ? 'idle' : d >= 10 ? 'valid' : 'invalid')
  }

  function toggleProduct(p: string) {
    setForm(prev => ({
      ...prev,
      productsOfInterest: prev.productsOfInterest.includes(p)
        ? prev.productsOfInterest.filter(x => x !== p)
        : [...prev.productsOfInterest, p],
    }))
  }

  // Submit
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (cnpjStatus === 'invalid' || phoneStatus === 'invalid') return
    setSendStatus('sending')

    let emailOk = false, waOk = false

    // Email
    try {
      await enviarEmail(form)
      emailOk = true
    } catch (err) {
      console.error('[EmailJS]', err)
    }

    // WhatsApp (fire-and-forget)
    try {
      enviarWhatsApp(form)
      waOk = true
    } catch (err) {
      console.error('[CallMeBot]', err)
    }

    setSendLog({ email: emailOk, wa: waOk })
    setSendStatus('done')
  }

  // ── Tela de sucesso ──────────────────────────────────────────────────────
  if (sendStatus === 'done') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="w-20 h-20 bg-verde-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={40} className="text-verde-700" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Cadastro recebido!
          </h2>
          <p className="text-gray-600 leading-relaxed mb-6">
            Em breve um representante da Royal Alimentos entrará em contato para
            conversar sobre suas necessidades.
          </p>

          {/* Confirmação dos canais */}
          <div className="flex flex-col gap-2 mb-8">
            <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${sendLog.email ? 'bg-verde-50 text-verde-700' : 'bg-gray-50 text-gray-400'}`}>
              <Mail size={15} />
              {sendLog.email
                ? 'E-mail enviado para comercial@royalalimentos.com.br'
                : 'E-mail: configure o EmailJS para ativar'}
            </div>
            <div className={`flex items-center gap-2 text-sm px-4 py-2 rounded-lg ${sendLog.wa ? 'bg-verde-50 text-verde-700' : 'bg-gray-50 text-gray-400'}`}>
              <MessageSquare size={15} />
              {sendLog.wa
                ? 'Notificação enviada por WhatsApp'
                : 'WhatsApp: configure o CallMeBot para ativar'}
            </div>
          </div>

          <button
            onClick={() => {
              setForm(initial); setSendStatus('idle')
              setCnpjStatus('idle'); setPhoneStatus('idle')
            }}
            className="btn-secondary">
            Fazer novo cadastro
          </button>
        </div>
      </div>
    )
  }

  const cnpjBorder = {
    idle: 'border-gray-200', validating: 'border-blue-300',
    valid: 'border-verde-500', invalid: 'border-red-400',
    not_found: 'border-amber-400', api_error: 'border-amber-400',
  }[cnpjStatus]

  const phoneBorder = { idle: 'border-gray-200', valid: 'border-verde-500', invalid: 'border-red-400' }[phoneStatus]
  const phoneDigits = digitosTel(form.whatsapp)

  return (
    <>
      <section className="py-16 bg-verde-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0"
            style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Building2 size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Seja Cliente Royal Alimentos
          </h1>
          <p className="text-white/70 text-lg max-w-xl mx-auto">
            Preencha o cadastro abaixo e um representante entrará em contato
            para montar a melhor proposta para o seu negócio.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* ── Dados da empresa ──────────────────────────────── */}
              <div>
                <h2 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Dados da Empresa
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* CNPJ */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      CNPJ <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input required type="text" inputMode="numeric"
                        className={`input-field pr-10 border-2 transition-colors ${cnpjBorder}`}
                        placeholder="00.000.000/0000-00"
                        value={form.cnpj} onChange={e => handleCNPJ(e.target.value)} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        {cnpjStatus === 'validating' && <Loader2 size={16} className="text-blue-500 animate-spin" />}
                        {cnpjStatus === 'valid'      && <CheckCircle size={16} className="text-verde-600" />}
                        {cnpjStatus === 'invalid'    && <AlertCircle size={16} className="text-red-500" />}
                        {(cnpjStatus === 'not_found' || cnpjStatus === 'api_error') && <Search size={16} className="text-amber-500" />}
                      </div>
                    </div>
                    <div className="mt-1.5 text-xs min-h-[16px]">
                      {cnpjStatus === 'validating' && <span className="text-blue-600">Consultando Receita Federal...</span>}
                      {cnpjStatus === 'valid'      && <span className="text-verde-700 font-medium">✓ CNPJ válido — dados preenchidos automaticamente</span>}
                      {cnpjStatus === 'invalid'    && <span className="text-red-600">CNPJ inválido. Verifique os dígitos.</span>}
                      {cnpjStatus === 'not_found'  && <span className="text-amber-600">CNPJ válido, não localizado na Receita Federal.</span>}
                      {cnpjStatus === 'api_error'  && <span className="text-amber-600">Consulta indisponível. Preencha manualmente.</span>}
                    </div>
                  </div>

                  {/* Segmento */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Segmento <span className="text-red-500">*</span>
                    </label>
                    <select required className="select-field"
                      value={form.segment} onChange={e => setField('segment', e.target.value)}>
                      <option value="">Selecione...</option>
                      {SEGMENTS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  {/* Nome empresa */}
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nome da empresa <span className="text-red-500">*</span>
                      {autoFilled.has('companyName') && <AutoBadge />}
                    </label>
                    <input required type="text"
                      className={`input-field ${autoFilled.has('companyName') ? 'border-verde-400 bg-verde-50' : ''}`}
                      placeholder="Razão social ou nome fantasia"
                      value={form.companyName} onChange={e => setField('companyName', e.target.value)} />
                  </div>
                </div>
              </div>

              {/* ── Dados de contato ──────────────────────────────── */}
              <div>
                <h2 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Dados de Contato
                </h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Nome do responsável <span className="text-red-500">*</span>
                    </label>
                    <input required type="text" className="input-field"
                      placeholder="Seu nome completo"
                      value={form.contactName} onChange={e => setField('contactName', e.target.value)} />
                  </div>

                  {/* WhatsApp */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1">
                      <Phone size={13} className="text-gray-500" />
                      WhatsApp <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <input required type="tel" inputMode="numeric"
                        className={`input-field pr-16 border-2 transition-colors ${phoneBorder}`}
                        placeholder="(00) 00000-0000"
                        value={form.whatsapp} onChange={e => handlePhone(e.target.value)} />
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
                        <span className={`text-[10px] font-mono font-bold ${
                          phoneDigits === 0 ? 'text-gray-300' : phoneDigits >= 10 ? 'text-verde-600' : 'text-red-500'
                        }`}>{phoneDigits}/11</span>
                        {phoneStatus === 'valid'   && <CheckCircle size={14} className="text-verde-600" />}
                        {phoneStatus === 'invalid' && <AlertCircle size={14} className="text-red-500" />}
                      </div>
                    </div>
                    <div className="mt-1.5 text-xs min-h-[16px]">
                      {phoneStatus === 'invalid' && <span className="text-red-600">Incompleto — DDD + número ({phoneDigits}/11 dígitos).</span>}
                      {phoneStatus === 'valid'   && <span className="text-verde-700 font-medium">✓ Número válido</span>}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">E-mail</label>
                    <input type="email" className="input-field"
                      placeholder="email@empresa.com.br"
                      value={form.email} onChange={e => setField('email', e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Cidade <span className="text-red-500">*</span>
                      {autoFilled.has('city') && <AutoBadge />}
                    </label>
                    <input required type="text"
                      className={`input-field ${autoFilled.has('city') ? 'border-verde-400 bg-verde-50' : ''}`}
                      placeholder="Sua cidade"
                      value={form.city} onChange={e => setField('city', e.target.value)} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1.5">
                      Estado <span className="text-red-500">*</span>
                      {autoFilled.has('state') && <AutoBadge />}
                    </label>
                    <select required
                      className={`select-field ${autoFilled.has('state') ? 'border-verde-400 bg-verde-50' : ''}`}
                      value={form.state} onChange={e => setField('state', e.target.value)}>
                      <option value="">UF</option>
                      {STATES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              {/* ── Produtos ──────────────────────────────────────── */}
              <div>
                <h2 className="font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                  Interesse em Produtos
                </h2>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Produtos de interesse (selecione todos que se aplicam)
                </label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {PRODUCTS_OF_INTEREST.map(p => (
                    <button key={p} type="button" onClick={() => toggleProduct(p)}
                      className={`px-4 py-2 rounded-full text-sm font-medium border-2 transition-all ${
                        form.productsOfInterest.includes(p)
                          ? 'bg-vinho-700 border-vinho-700 text-white'
                          : 'bg-white border-gray-200 text-gray-600 hover:border-vinho-300'
                      }`}>{p}</button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Volume médio mensal</label>
                  <select className="select-field"
                    value={form.monthlyVolume} onChange={e => setField('monthlyVolume', e.target.value)}>
                    <option value="">Selecione uma faixa...</option>
                    <option value="ate-100">Até 100 kg/mês</option>
                    <option value="100-500">100 a 500 kg/mês</option>
                    <option value="500-1000">500 a 1.000 kg/mês</option>
                    <option value="1000-5000">1.000 a 5.000 kg/mês</option>
                    <option value="acima-5000">Acima de 5.000 kg/mês</option>
                  </select>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1.5">Mensagem</label>
                  <textarea rows={4} className="input-field resize-none"
                    placeholder="Conte mais sobre o seu negócio..."
                    value={form.message} onChange={e => setField('message', e.target.value)} />
                </div>
              </div>

              {/* Aviso de validação */}
              {(cnpjStatus === 'invalid' || phoneStatus === 'invalid') && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <span>
                    {cnpjStatus === 'invalid' && 'Corrija o CNPJ antes de enviar. '}
                    {phoneStatus === 'invalid' && 'O WhatsApp está incompleto.'}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={sendStatus === 'sending' || cnpjStatus === 'invalid' || phoneStatus === 'invalid'}
                className="w-full btn-green justify-center text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {sendStatus === 'sending' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Enviando cadastro...
                  </span>
                ) : 'Quero ser cliente Royal Alimentos'}
              </button>

              <p className="text-xs text-gray-400 text-center">
                Seus dados serão usados exclusivamente para atendimento comercial.
                Não compartilhamos informações com terceiros.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function AutoBadge() {
  return (
    <span className="ml-2 text-[10px] bg-verde-100 text-verde-700 px-2 py-0.5 rounded-full font-semibold">
      auto-preenchido
    </span>
  )
}
