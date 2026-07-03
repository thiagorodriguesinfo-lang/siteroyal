import { useState } from 'react'
import emailjs from '@emailjs/browser'
import { AlertCircle, Loader2, Send } from 'lucide-react'
import ComplaintUpload from './ComplaintUpload'
import { gerarComplaintPDF } from '../../utils/complaintPdf'
import { gerarProtocolo } from '../../utils/protocolGenerator'
import { ASSUNTOS, PRIORIDADES, type ComplaintData } from '../../types/complaint'

const EMAILJS_SERVICE_ID       = 'service_fv4otsn'
const EMAILJS_TEMPLATE_EQUIPE  = 'template_tw2x03h'
const EMAILJS_TEMPLATE_CLIENTE = 'template_crwgynf'
const EMAILJS_PUB_KEY          = '9ixdnOZEvFVE4wcC_'

const STATES = [
  'AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG',
  'PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO',
]

const initial: ComplaintData = {
  nomeCompleto: '', empresa: '', cnpj: '', telefone: '', whatsapp: '',
  email: '', cidade: '', estado: '', numeroPedido: '', dataOcorrencia: '',
  assunto: '', prioridade: '', descricao: '', declaracao: false,
}

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

interface Props {
  onSuccess: (protocolo: string) => void
}

export default function ComplaintForm({ onSuccess }: Props) {
  const [form, setForm] = useState<ComplaintData>(initial)
  const [files, setFiles] = useState<File[]>([])
  const [cnpjValido, setCnpjValido] = useState<'idle' | 'valid' | 'invalid'>('idle')
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle')
  const [progress, setProgress] = useState(0)
  const [stageLabel, setStageLabel] = useState('')
  const [errorMsg, setErrorMsg] = useState('')

  function set<K extends keyof ComplaintData>(field: K, value: ComplaintData[K]) {
    setForm(p => ({ ...p, [field]: value }))
  }

  function handleCNPJ(raw: string) {
    const masked = mascaraCNPJ(raw)
    set('cnpj', masked)
    if (masked.replace(/\D/g, '').length < 14) { setCnpjValido('idle'); return }
    setCnpjValido(validarCNPJ(masked) ? 'valid' : 'invalid')
  }

  const telefoneDigitos = digitosTel(form.telefone)
  const whatsappDigitos = digitosTel(form.whatsapp)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setErrorMsg('')

    if (cnpjValido === 'invalid') { setErrorMsg('Corrija o CNPJ antes de enviar.'); return }
    if (telefoneDigitos < 10)      { setErrorMsg('Telefone incompleto.'); return }
    if (whatsappDigitos < 10)      { setErrorMsg('WhatsApp incompleto.'); return }
    if (!form.declaracao)          { setErrorMsg('Você precisa declarar que as informações são verdadeiras.'); return }

    setStatus('loading')
    const protocolo = gerarProtocolo()
    const anexosNomes = files.map(f => f.name)

    try {
      // 1. Gera o PDF e dispara o download
      setStageLabel('Gerando PDF da ocorrência...'); setProgress(25)
      const pdfDataUri = await gerarComplaintPDF(form, protocolo, anexosNomes)
      const link = document.createElement('a')
      link.href = pdfDataUri
      link.download = `Ocorrencia_${protocolo}.pdf`
      link.click()

      // 2. Notifica a equipe Royal Alimentos
      setStageLabel('Enviando notificação para a equipe...'); setProgress(60)
      const corpo = `
NOVA OCORRÊNCIA REGISTRADA — Central de Atendimento Royal Alimentos
Protocolo: ${protocolo}
Data/Hora: ${new Date().toLocaleString('pt-BR')}

=== CLIENTE ===
Nome: ${form.nomeCompleto}
Empresa: ${form.empresa}
CNPJ: ${form.cnpj}
Telefone: ${form.telefone} | WhatsApp: ${form.whatsapp}
E-mail: ${form.email}
Cidade/Estado: ${form.cidade}/${form.estado}

=== OCORRÊNCIA ===
Número do Pedido: ${form.numeroPedido || 'Não informado'}
Data da Ocorrência: ${form.dataOcorrencia}
Assunto: ${form.assunto}
Prioridade: ${form.prioridade}

Descrição:
${form.descricao}

Anexos: ${anexosNomes.length ? anexosNomes.join(', ') : 'Nenhum'}
(PDF completo gerado e salvo no dispositivo do cliente)
      `.trim()

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_EQUIPE, {
        to_email: 'comercial@royalalimentos.com.br',
        assunto: `Nova ocorrência registrada - Protocolo ${protocolo}`,
        empresa: form.empresa,
        cnpj: form.cnpj,
        responsavel: form.nomeCompleto,
        whatsapp: form.whatsapp,
        email_contato: form.email,
        cidade_estado: `${form.cidade}/${form.estado}`,
        segmento: `Central de Atendimento — ${form.assunto}`,
        produtos: '—',
        volume: '—',
        mensagem: corpo,
      }, EMAILJS_PUB_KEY)

      // 3. Confirmação automática para o cliente (best-effort)
      setStageLabel('Enviando confirmação por e-mail...'); setProgress(85)
      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_CLIENTE, {
          to_email: form.email,
          assunto: 'Recebemos sua solicitação',
          empresa: 'Royal Alimentos',
          cnpj: '—',
          responsavel: form.nomeCompleto,
          whatsapp: '—',
          email_contato: form.email,
          cidade_estado: '—',
          segmento: 'Confirmação de recebimento',
          produtos: '—',
          volume: '—',
          mensagem: `Olá, ${form.nomeCompleto}.\n\nRecebemos sua solicitação com sucesso.\n\nNúmero do protocolo: ${protocolo}\n\nNossa equipe irá analisar o ocorrido e entrar em contato o mais breve possível.\n\nObrigado por confiar na Royal Alimentos.\n\nEquipe Royal Alimentos`,
        }, EMAILJS_PUB_KEY)
      } catch (err) {
        console.error('[EmailJS confirmação cliente]', err)
      }

      setProgress(100); setStageLabel('Concluído!')
      onSuccess(protocolo)
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg('Ocorreu um erro ao enviar sua solicitação. Tente novamente ou fale conosco pelo WhatsApp.')
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
      <form onSubmit={handleSubmit} noValidate className="space-y-6">

        {/* ── Dados do cliente ──────────────────────────────── */}
        <FormSection title="Seus dados">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <Label required htmlFor="nomeCompleto">Nome completo</Label>
              <input id="nomeCompleto" required type="text" className="input-field"
                placeholder="Seu nome completo" value={form.nomeCompleto}
                onChange={e => set('nomeCompleto', e.target.value)} />
            </div>
            <div>
              <Label required htmlFor="empresa">Empresa</Label>
              <input id="empresa" required type="text" className="input-field"
                placeholder="Nome da empresa" value={form.empresa}
                onChange={e => set('empresa', e.target.value)} />
            </div>
            <div>
              <Label required htmlFor="cnpj">CNPJ</Label>
              <input id="cnpj" required type="text" inputMode="numeric"
                className={`input-field border-2 transition-colors ${
                  cnpjValido === 'valid' ? 'border-verde-500' : cnpjValido === 'invalid' ? 'border-red-400' : 'border-gray-200'
                }`}
                placeholder="00.000.000/0000-00" value={form.cnpj}
                onChange={e => handleCNPJ(e.target.value)}
                aria-invalid={cnpjValido === 'invalid'}
                aria-describedby="cnpj-hint" />
              <div id="cnpj-hint" className="mt-1.5 text-xs min-h-[16px]">
                {cnpjValido === 'invalid' && <span className="text-red-600">CNPJ inválido. Verifique os dígitos.</span>}
                {cnpjValido === 'valid' && <span className="text-verde-700 font-medium">✓ CNPJ válido</span>}
              </div>
            </div>
            <div>
              <Label required htmlFor="telefone">Telefone</Label>
              <input id="telefone" required type="tel" inputMode="numeric" className="input-field"
                placeholder="(00) 00000-0000" value={form.telefone}
                onChange={e => set('telefone', mascaraTelefone(e.target.value))} />
            </div>
            <div>
              <Label required htmlFor="whatsapp">WhatsApp</Label>
              <div className="relative">
                <input id="whatsapp" required type="tel" inputMode="numeric" className="input-field pr-16"
                  placeholder="(00) 00000-0000" value={form.whatsapp}
                  onChange={e => set('whatsapp', mascaraTelefone(e.target.value))} />
                <span className={`absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono font-bold ${
                  whatsappDigitos === 0 ? 'text-gray-300' : whatsappDigitos >= 10 ? 'text-verde-600' : 'text-red-500'
                }`}>{whatsappDigitos}/11</span>
              </div>
            </div>
            <div>
              <Label required htmlFor="email">E-mail</Label>
              <input id="email" required type="email" className="input-field"
                placeholder="seu@email.com" value={form.email}
                onChange={e => set('email', e.target.value)} />
            </div>
            <div>
              <Label required htmlFor="cidade">Cidade</Label>
              <input id="cidade" required type="text" className="input-field"
                placeholder="Sua cidade" value={form.cidade}
                onChange={e => set('cidade', e.target.value)} />
            </div>
            <div>
              <Label required htmlFor="estado">Estado</Label>
              <select id="estado" required className="select-field"
                value={form.estado} onChange={e => set('estado', e.target.value)}>
                <option value="">UF</option>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </FormSection>

        {/* ── Ocorrência ──────────────────────────────────────── */}
        <FormSection title="Sobre a ocorrência">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="numeroPedido">Número do Pedido (opcional)</Label>
              <input id="numeroPedido" type="text" className="input-field"
                placeholder="Se souber, informe o número" value={form.numeroPedido}
                onChange={e => set('numeroPedido', e.target.value)} />
            </div>
            <div>
              <Label required htmlFor="dataOcorrencia">Data da ocorrência</Label>
              <input id="dataOcorrencia" required type="date" className="input-field"
                value={form.dataOcorrencia} onChange={e => set('dataOcorrencia', e.target.value)} />
            </div>
            <div>
              <Label required htmlFor="assunto">Assunto</Label>
              <select id="assunto" required className="select-field"
                value={form.assunto} onChange={e => set('assunto', e.target.value)}>
                <option value="">Selecione...</option>
                {ASSUNTOS.map(a => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>
            <div>
              <Label required htmlFor="prioridade">Prioridade</Label>
              <select id="prioridade" required className="select-field"
                value={form.prioridade} onChange={e => set('prioridade', e.target.value as ComplaintData['prioridade'])}>
                <option value="">Selecione...</option>
                {PRIORIDADES.map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <Label required htmlFor="descricao">Descrição detalhada</Label>
            <textarea id="descricao" required rows={6} className="input-field resize-none"
              placeholder="Descreva detalhadamente o ocorrido. Quanto mais informações, mais rápido conseguiremos resolver."
              value={form.descricao} onChange={e => set('descricao', e.target.value)} />
          </div>

          <div className="mt-4">
            <Label htmlFor="complaint-upload-input">Anexos (opcional)</Label>
            <ComplaintUpload files={files} onChange={setFiles} onError={setErrorMsg} />
          </div>
        </FormSection>

        {/* ── Declaração ─────────────────────────────────────── */}
        <div className="bg-vinho-50 border border-vinho-200 rounded-2xl p-5">
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={form.declaracao}
              onChange={e => set('declaracao', e.target.checked)}
              className="mt-1 w-4 h-4 accent-vinho-700 flex-shrink-0"
              aria-describedby="declaracao-label"
            />
            <span id="declaracao-label" className="text-sm text-gray-700 leading-relaxed">
              Declaro que as informações acima são verdadeiras. <span className="text-red-500">*</span>
            </span>
          </label>
        </div>

        {errorMsg && (
          <div role="alert" className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
            <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
            {errorMsg}
          </div>
        )}

        {status === 'loading' && (
          <div role="status" aria-live="polite">
            <div className="flex items-center justify-between text-xs text-gray-500 mb-1.5">
              <span>{stageLabel}</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-vinho-700 rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }} />
            </div>
          </div>
        )}

        <button type="submit" disabled={status === 'loading'}
          className="w-full btn-primary justify-center text-base py-4 disabled:opacity-60">
          {status === 'loading' ? (
            <span className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin" /> Enviando...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Send size={18} /> Enviar solicitação
            </span>
          )}
        </button>
        <p className="text-xs text-gray-400 text-center">
          Ao enviar, um número de protocolo será gerado e um PDF com o registro completo
          será salvo automaticamente no seu dispositivo.
        </p>
      </form>
    </div>
  )
}

function FormSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="font-bold text-gray-900 mb-4 pb-2 border-b-2 border-vinho-700/20 flex items-center gap-2">
        <span className="w-1 h-5 bg-vinho-700 rounded-full inline-block" />
        {title}
      </h2>
      {children}
    </div>
  )
}

function Label({ children, required, htmlFor }: { children: React.ReactNode; required?: boolean; htmlFor: string }) {
  return (
    <label htmlFor={htmlFor} className="block text-sm font-medium text-gray-700 mb-1.5">
      {children}{required && <span className="text-red-500 ml-0.5" aria-hidden="true">*</span>}
    </label>
  )
}
