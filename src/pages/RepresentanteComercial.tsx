import { useState } from 'react'
import { jsPDF } from 'jspdf'
import emailjs from '@emailjs/browser'
import {
  CheckCircle, Loader2, AlertCircle, Plus, Trash2, FileText, UserCheck,
} from 'lucide-react'

// ── EmailJS (reusa o serviço já configurado) ──────────────────────────────
// Crie um template em emailjs.com com variável {{corpo_email}} e {{assunto}}
// Ex: Subject: {{assunto}} | Body: {{corpo_email}}
const EMAILJS_SERVICE_ID  = 'service_fv4otsn'
const EMAILJS_TEMPLATE_ID = 'template_crwgynf' // substitua por template dedicado se quiser
const EMAILJS_PUB_KEY     = '9ixdnOZEvFVE4wcC_'

// ── Tipos ─────────────────────────────────────────────────────────────────
interface Socio      { nome: string; cpf: string; participacao: string }
interface RefProf    { empresa: string; data: string }
interface RefPessoal { nome: string; contato: string }

interface RepForm {
  nomeCompleto: string; dataNascimento: string; estadoCivil: string
  nacionalidade: string; sexo: string; cpf: string; rg: string
  dataEmissao: string; orgaoEmissor: string
  razaoSocial: string; cnpj: string; inscricaoEstadual: string
  core: string; juce: string; dataFundacao: string
  endereco: string; numero: string; complemento: string
  bairro: string; cep: string; municipio: string; uf: string
  telFixo: string; celular: string; email: string
  banco: string; agencia: string; contaCorrente: string; operacao: string
  socios: Socio[]
  refsProf: RefProf[]
  refsPessoais: RefPessoal[]
  declaracao: boolean
}

const initial: RepForm = {
  nomeCompleto: '', dataNascimento: '', estadoCivil: '', nacionalidade: 'Brasileiro(a)',
  sexo: '', cpf: '', rg: '', dataEmissao: '', orgaoEmissor: '',
  razaoSocial: '', cnpj: '', inscricaoEstadual: '', core: '', juce: '', dataFundacao: '',
  endereco: '', numero: '', complemento: '', bairro: '', cep: '', municipio: '', uf: '',
  telFixo: '', celular: '', email: '',
  banco: '', agencia: '', contaCorrente: '', operacao: '',
  socios: [{ nome: '', cpf: '', participacao: '' }],
  refsProf: [{ empresa: '', data: '' }, { empresa: '', data: '' }, { empresa: '', data: '' }],
  refsPessoais: [{ nome: '', contato: '' }, { nome: '', contato: '' }],
  declaracao: false,
}

// ── Geração do PDF ─────────────────────────────────────────────────────────
async function gerarPDF(f: RepForm): Promise<string> {
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = doc.internal.pageSize.width
  const H = doc.internal.pageSize.height
  const m = 18
  let y = 0

  function newPageIfNeeded(needed = 12) {
    if (y + needed > H - 20) { doc.addPage(); y = 20 }
  }

  function section(title: string) {
    newPageIfNeeded(18)
    y += 4
    doc.setFillColor(139, 26, 26)
    doc.rect(m, y, W - m * 2, 8, 'F')
    doc.setTextColor(255, 255, 255)
    doc.setFontSize(9)
    doc.setFont('helvetica', 'bold')
    doc.text(title.toUpperCase(), m + 3, y + 5.5)
    doc.setTextColor(30, 30, 30)
    y += 12
  }

  function field(label: string, value: string, half = false, col = 0) {
    newPageIfNeeded(10)
    const colW = (W - m * 2) / 2
    const x = half ? m + col * colW : m
    const w = half ? colW - 4 : W - m * 2
    doc.setFontSize(7.5)
    doc.setFont('helvetica', 'bold')
    doc.setTextColor(100, 100, 100)
    doc.text(label, x, y)
    doc.setFont('helvetica', 'normal')
    doc.setTextColor(20, 20, 20)
    doc.setFontSize(9)
    const lines = doc.splitTextToSize(value || '—', w - 2)
    doc.text(lines, x, y + 4)
    doc.setDrawColor(220, 220, 220)
    doc.line(x, y + 5 + lines.length * 0.5, x + w - 2, y + 5 + lines.length * 0.5)
    return lines.length
  }

  function row2(l1: string, v1: string, l2: string, v2: string) {
    const h1 = field(l1, v1, true, 0)
    const h2 = field(l2, v2, true, 1)
    y += Math.max(h1, h2) * 0.5 + 10
  }

  function row1(label: string, value: string) {
    const h = field(label, value)
    y += h * 0.5 + 10
  }

  // ── Cabeçalho ──────────────────────────────────────────────────────────
  doc.setFillColor(139, 26, 26)
  doc.rect(0, 0, W, 32, 'F')
  doc.setFillColor(212, 175, 55)
  doc.rect(0, 32, W, 2, 'F')

  // Tenta carregar logo
  try {
    const res = await fetch('/logo.png')
    const blob = await res.blob()
    const reader = new FileReader()
    const b64 = await new Promise<string>(resolve => {
      reader.onload = () => resolve(reader.result as string)
      reader.readAsDataURL(blob)
    })
    doc.addImage(b64, 'PNG', m, 4, 22, 22)
  } catch { /* logo indisponível */ }

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(18)
  doc.setFont('helvetica', 'bold')
  doc.text('Royal Alimentos', m + 26, 14)
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.text('Distribuidora de Proteínas', m + 26, 20)

  doc.setFontSize(9)
  doc.text('comercial@royalalimentos.com.br', W - m, 12, { align: 'right' })
  doc.text('(21) 99664-3765', W - m, 19, { align: 'right' })

  y = 42

  // Título
  doc.setTextColor(139, 26, 26)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('FICHA CADASTRAL PARA REPRESENTANTE', W / 2, y, { align: 'center' })
  y += 7
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(120, 120, 120)
  doc.text(`Data de emissão: ${new Date().toLocaleDateString('pt-BR')}`, W / 2, y, { align: 'center' })
  y += 8

  // ── Dados Pessoais ──────────────────────────────────────────────────────
  section('Dados Pessoais')
  row1('Nome Completo', f.nomeCompleto)
  row2('Data de Nascimento', f.dataNascimento, 'Estado Civil', f.estadoCivil)
  row2('Nacionalidade', f.nacionalidade, 'Sexo', f.sexo)
  row2('CPF', f.cpf, 'RG', f.rg)
  row2('Data de Emissão', f.dataEmissao, 'Órgão Emissor', f.orgaoEmissor)

  // ── Dados da Empresa ────────────────────────────────────────────────────
  section('Dados da Empresa')
  row1('Razão Social', f.razaoSocial)
  row2('CNPJ', f.cnpj, 'Inscrição Estadual', f.inscricaoEstadual)
  row2('CORE', f.core, 'JUCE', f.juce)
  row1('Data de Fundação', f.dataFundacao)

  // ── Endereço ────────────────────────────────────────────────────────────
  section('Endereço')
  row2('Endereço', f.endereco, 'Número', f.numero)
  row2('Complemento', f.complemento, 'Bairro', f.bairro)
  row2('CEP', f.cep, 'Município', f.municipio)
  row1('UF', f.uf)

  // ── Contato ─────────────────────────────────────────────────────────────
  section('Contato')
  row2('Telefone Fixo', f.telFixo, 'Celular', f.celular)
  row1('E-mail', f.email)

  // ── Dados Bancários ─────────────────────────────────────────────────────
  section('Dados Bancários')
  row2('Banco', f.banco, 'Agência', f.agencia)
  row2('Conta Corrente', f.contaCorrente, 'Operação', f.operacao)

  // ── Sócios ──────────────────────────────────────────────────────────────
  if (f.socios.some(s => s.nome)) {
    section('Sócios / Representantes')
    f.socios.forEach((s, i) => {
      if (!s.nome) return
      newPageIfNeeded(22)
      doc.setFontSize(8)
      doc.setFont('helvetica', 'bold')
      doc.setTextColor(139, 26, 26)
      doc.text(`Sócio ${i + 1}`, m, y)
      doc.setTextColor(30, 30, 30)
      y += 5
      row2('Nome', s.nome, 'CPF', s.cpf)
      row1('Participação (%)', s.participacao)
    })
  }

  // ── Referências Profissionais ────────────────────────────────────────────
  section('Referências Profissionais')
  f.refsProf.forEach((r, i) => {
    if (!r.empresa) return
    row2(`Referência ${i + 1}`, r.empresa, 'Data', r.data)
  })

  // ── Referências Pessoais ─────────────────────────────────────────────────
  section('Referências Pessoais')
  f.refsPessoais.forEach((r, i) => {
    if (!r.nome) return
    row2(`Nome da Referência ${i + 1}`, r.nome, 'Contato', r.contato)
  })

  // ── Declaração ───────────────────────────────────────────────────────────
  section('Declaração')
  doc.setFontSize(9)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(30, 30, 30)
  const decl = doc.splitTextToSize(
    'Declaro sob as penas da lei serem verdadeiras as informações acima prestadas.',
    W - m * 2
  )
  doc.text(decl, m, y)
  y += decl.length * 5 + 16

  doc.setDrawColor(80, 80, 80)
  doc.line(m, y, m + 80, y)
  doc.setFontSize(8)
  doc.setTextColor(100, 100, 100)
  doc.text('Assinatura do Representante', m, y + 4)
  doc.line(W - m - 60, y, W - m, y)
  doc.text('Data', W - m - 60, y + 4)

  // Rodapé em todas as páginas
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFillColor(245, 245, 245)
    doc.rect(0, H - 12, W, 12, 'F')
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text('Royal Alimentos — Distribuidora de Proteínas | comercial@royalalimentos.com.br', m, H - 5)
    doc.text(`Página ${p} de ${totalPages}`, W - m, H - 5, { align: 'right' })
  }

  return doc.output('datauristring')
}

// ── Componente ─────────────────────────────────────────────────────────────
const Label = ({ children, required }: { children: React.ReactNode; required?: boolean }) => (
  <label className="block text-sm font-medium text-gray-700 mb-1.5">
    {children}{required && <span className="text-red-500 ml-0.5">*</span>}
  </label>
)
const Input = (p: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input {...p} className={`input-field ${p.className || ''}`} />
)
const Select = (p: React.SelectHTMLAttributes<HTMLSelectElement> & { children: React.ReactNode }) => (
  <select {...p} className={`select-field ${p.className || ''}`} />
)

export default function RepresentanteComercial() {
  const [form, setForm] = useState<RepForm>(initial)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  function set(field: keyof RepForm, value: string | boolean) {
    setForm(p => ({ ...p, [field]: value }))
  }

  function setSocio(i: number, k: keyof Socio, v: string) {
    setForm(p => {
      const s = [...p.socios]; s[i] = { ...s[i], [k]: v }; return { ...p, socios: s }
    })
  }
  function addSocio() {
    setForm(p => ({ ...p, socios: [...p.socios, { nome: '', cpf: '', participacao: '' }] }))
  }
  function removeSocio(i: number) {
    setForm(p => ({ ...p, socios: p.socios.filter((_, idx) => idx !== i) }))
  }

  function setRefProf(i: number, k: keyof RefProf, v: string) {
    setForm(p => {
      const r = [...p.refsProf]; r[i] = { ...r[i], [k]: v }; return { ...p, refsProf: r }
    })
  }

  function setRefPes(i: number, k: keyof RefPessoal, v: string) {
    setForm(p => {
      const r = [...p.refsPessoais]; r[i] = { ...r[i], [k]: v }; return { ...p, refsPessoais: r }
    })
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.declaracao) { setErrorMsg('Você deve aceitar a declaração para continuar.'); return }
    setStatus('loading'); setErrorMsg('')

    try {
      // 1. Gera PDF e faz download
      const pdfDataUri = await gerarPDF(form)
      const link = document.createElement('a')
      link.href = pdfDataUri
      link.download = `Ficha_Representante_${form.nomeCompleto || 'Real_Carnes'}.pdf`
      link.click()

      // 2. Envia dados por e-mail
      const corpo = `
FICHA CADASTRAL PARA REPRESENTANTE — Royal Alimentos
Data: ${new Date().toLocaleDateString('pt-BR')}

=== DADOS PESSOAIS ===
Nome: ${form.nomeCompleto}
Data de Nascimento: ${form.dataNascimento}
Estado Civil: ${form.estadoCivil} | Sexo: ${form.sexo}
Nacionalidade: ${form.nacionalidade}
CPF: ${form.cpf} | RG: ${form.rg}
Data Emissão RG: ${form.dataEmissao} | Órgão: ${form.orgaoEmissor}

=== DADOS DA EMPRESA ===
Razão Social: ${form.razaoSocial}
CNPJ: ${form.cnpj} | Insc. Estadual: ${form.inscricaoEstadual}
CORE: ${form.core} | JUCE: ${form.juce}
Data Fundação: ${form.dataFundacao}

=== ENDEREÇO ===
${form.endereco}, ${form.numero} ${form.complemento}
${form.bairro} — ${form.municipio}/${form.uf} — CEP: ${form.cep}

=== CONTATO ===
Tel Fixo: ${form.telFixo} | Celular: ${form.celular}
E-mail: ${form.email}

=== DADOS BANCÁRIOS ===
Banco: ${form.banco} | Agência: ${form.agencia}
C/C: ${form.contaCorrente} | Operação: ${form.operacao}

=== SÓCIOS ===
${form.socios.filter(s => s.nome).map((s, i) => `${i + 1}. ${s.nome} | CPF: ${s.cpf} | Part.: ${s.participacao}%`).join('\n') || 'Não informado'}

=== REFERÊNCIAS PROFISSIONAIS ===
${form.refsProf.filter(r => r.empresa).map((r, i) => `${i + 1}. ${r.empresa} (${r.data})`).join('\n') || 'Não informado'}

=== REFERÊNCIAS PESSOAIS ===
${form.refsPessoais.filter(r => r.nome).map((r, i) => `${i + 1}. ${r.nome} — ${r.contato}`).join('\n') || 'Não informado'}

PDF gerado e enviado automaticamente.
      `.trim()

      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        to_email: 'comercial@royalalimentos.com.br',
        empresa: form.razaoSocial || form.nomeCompleto,
        cnpj: form.cnpj,
        responsavel: form.nomeCompleto,
        whatsapp: form.celular,
        email_contato: form.email,
        cidade_estado: `${form.municipio}/${form.uf}`,
        segmento: 'Representante Comercial',
        produtos: '—',
        volume: '—',
        mensagem: corpo,
      }, EMAILJS_PUB_KEY)

      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
      setErrorMsg('Ocorreu um erro ao enviar. Tente novamente ou entre em contato pelo WhatsApp.')
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
          Cadastro enviado com sucesso!
        </h2>
        <p className="text-gray-600 leading-relaxed mb-6">
          O PDF da sua ficha cadastral foi gerado e salvo no seu dispositivo.
          Nossa equipe comercial irá analisar suas informações e entrar em contato.
        </p>
        <button onClick={() => { setForm(initial); setStatus('idle') }} className="btn-secondary">
          Preencher novo cadastro
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-vinho-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <UserCheck size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Seja um Representante Comercial
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            Preencha a ficha cadastral abaixo. Um PDF será gerado automaticamente
            e nossa equipe comercial entrará em contato para dar sequência ao processo.
          </p>
        </div>
      </section>

      <section className="py-10 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
            <form onSubmit={handleSubmit} className="space-y-8">

              {/* ── Dados Pessoais ──────────────────────────────── */}
              <FormSection title="Dados Pessoais">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label required>Nome completo</Label>
                    <Input required placeholder="Nome completo" value={form.nomeCompleto} onChange={e => set('nomeCompleto', e.target.value)} />
                  </div>
                  <div>
                    <Label required>Data de nascimento</Label>
                    <Input required type="date" value={form.dataNascimento} onChange={e => set('dataNascimento', e.target.value)} />
                  </div>
                  <div>
                    <Label>Estado civil</Label>
                    <Select value={form.estadoCivil} onChange={e => set('estadoCivil', e.target.value)}>
                      <option value="">Selecione...</option>
                      {['Solteiro(a)','Casado(a)','Divorciado(a)','Viúvo(a)','União estável'].map(o => <option key={o}>{o}</option>)}
                    </Select>
                  </div>
                  <div>
                    <Label>Nacionalidade</Label>
                    <Input placeholder="Brasileiro(a)" value={form.nacionalidade} onChange={e => set('nacionalidade', e.target.value)} />
                  </div>
                  <div>
                    <Label>Sexo</Label>
                    <Select value={form.sexo} onChange={e => set('sexo', e.target.value)}>
                      <option value="">Selecione...</option>
                      <option>Masculino</option><option>Feminino</option><option>Outro</option>
                    </Select>
                  </div>
                  <div>
                    <Label required>CPF</Label>
                    <Input required placeholder="000.000.000-00" value={form.cpf} onChange={e => set('cpf', e.target.value)} />
                  </div>
                  <div>
                    <Label>RG</Label>
                    <Input placeholder="00.000.000-0" value={form.rg} onChange={e => set('rg', e.target.value)} />
                  </div>
                  <div>
                    <Label>Data de emissão</Label>
                    <Input type="date" value={form.dataEmissao} onChange={e => set('dataEmissao', e.target.value)} />
                  </div>
                  <div>
                    <Label>Órgão emissor</Label>
                    <Input placeholder="SSP/RJ" value={form.orgaoEmissor} onChange={e => set('orgaoEmissor', e.target.value)} />
                  </div>
                </div>
              </FormSection>

              {/* ── Dados da Empresa ────────────────────────────── */}
              <FormSection title="Dados da Empresa">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>Razão social</Label>
                    <Input placeholder="Razão social" value={form.razaoSocial} onChange={e => set('razaoSocial', e.target.value)} />
                  </div>
                  <div>
                    <Label>CNPJ</Label>
                    <Input placeholder="00.000.000/0000-00" value={form.cnpj} onChange={e => set('cnpj', e.target.value)} />
                  </div>
                  <div>
                    <Label>Inscrição estadual</Label>
                    <Input placeholder="Inscrição estadual" value={form.inscricaoEstadual} onChange={e => set('inscricaoEstadual', e.target.value)} />
                  </div>
                  <div>
                    <Label>CORE</Label>
                    <Input placeholder="CORE" value={form.core} onChange={e => set('core', e.target.value)} />
                  </div>
                  <div>
                    <Label>JUCE</Label>
                    <Input placeholder="JUCE" value={form.juce} onChange={e => set('juce', e.target.value)} />
                  </div>
                  <div>
                    <Label>Data de fundação</Label>
                    <Input type="date" value={form.dataFundacao} onChange={e => set('dataFundacao', e.target.value)} />
                  </div>
                </div>
              </FormSection>

              {/* ── Endereço ────────────────────────────────────── */}
              <FormSection title="Endereço">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label required>Endereço</Label>
                    <Input required placeholder="Rua, Avenida..." value={form.endereco} onChange={e => set('endereco', e.target.value)} />
                  </div>
                  <div>
                    <Label>Número</Label>
                    <Input placeholder="Nº" value={form.numero} onChange={e => set('numero', e.target.value)} />
                  </div>
                  <div>
                    <Label>Complemento</Label>
                    <Input placeholder="Sala, Bloco..." value={form.complemento} onChange={e => set('complemento', e.target.value)} />
                  </div>
                  <div>
                    <Label>Bairro</Label>
                    <Input placeholder="Bairro" value={form.bairro} onChange={e => set('bairro', e.target.value)} />
                  </div>
                  <div>
                    <Label required>CEP</Label>
                    <Input required placeholder="00000-000" value={form.cep} onChange={e => set('cep', e.target.value)} />
                  </div>
                  <div>
                    <Label required>Município</Label>
                    <Input required placeholder="Cidade" value={form.municipio} onChange={e => set('municipio', e.target.value)} />
                  </div>
                  <div>
                    <Label required>UF</Label>
                    <Select required value={form.uf} onChange={e => set('uf', e.target.value)}>
                      <option value="">UF</option>
                      {['AC','AL','AP','AM','BA','CE','DF','ES','GO','MA','MT','MS','MG','PA','PB','PR','PE','PI','RJ','RN','RS','RO','RR','SC','SP','SE','TO'].map(s => <option key={s}>{s}</option>)}
                    </Select>
                  </div>
                </div>
              </FormSection>

              {/* ── Contato ─────────────────────────────────────── */}
              <FormSection title="Contato">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <Label>Telefone fixo</Label>
                    <Input placeholder="(00) 0000-0000" value={form.telFixo} onChange={e => set('telFixo', e.target.value)} />
                  </div>
                  <div>
                    <Label required>Telefone celular</Label>
                    <Input required placeholder="(00) 00000-0000" value={form.celular} onChange={e => set('celular', e.target.value)} />
                  </div>
                  <div className="sm:col-span-2">
                    <Label required>E-mail</Label>
                    <Input required type="email" placeholder="email@empresa.com.br" value={form.email} onChange={e => set('email', e.target.value)} />
                  </div>
                </div>
              </FormSection>

              {/* ── Dados Bancários ─────────────────────────────── */}
              <FormSection title="Dados Bancários">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <Label>Banco</Label>
                    <Input placeholder="Nome do banco" value={form.banco} onChange={e => set('banco', e.target.value)} />
                  </div>
                  <div>
                    <Label>Agência</Label>
                    <Input placeholder="0000" value={form.agencia} onChange={e => set('agencia', e.target.value)} />
                  </div>
                  <div>
                    <Label>Conta corrente</Label>
                    <Input placeholder="00000-0" value={form.contaCorrente} onChange={e => set('contaCorrente', e.target.value)} />
                  </div>
                  <div>
                    <Label>Operação</Label>
                    <Input placeholder="003" value={form.operacao} onChange={e => set('operacao', e.target.value)} />
                  </div>
                </div>
              </FormSection>

              {/* ── Sócios ──────────────────────────────────────── */}
              <FormSection title="Sócios / Representantes">
                {form.socios.map((s, i) => (
                  <div key={i} className="grid sm:grid-cols-3 gap-3 mb-3 p-3 bg-gray-50 rounded-xl relative">
                    <div>
                      <Label>Nome do sócio</Label>
                      <Input placeholder="Nome completo" value={s.nome} onChange={e => setSocio(i, 'nome', e.target.value)} />
                    </div>
                    <div>
                      <Label>CPF</Label>
                      <Input placeholder="000.000.000-00" value={s.cpf} onChange={e => setSocio(i, 'cpf', e.target.value)} />
                    </div>
                    <div className="pr-8">
                      <Label>Participação (%)</Label>
                      <Input placeholder="0" value={s.participacao} onChange={e => setSocio(i, 'participacao', e.target.value)} />
                    </div>
                    {i > 0 && (
                      <button type="button" onClick={() => removeSocio(i)}
                        className="absolute top-2 right-2 p-1 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                ))}
                <button type="button" onClick={addSocio}
                  className="flex items-center gap-2 text-sm text-vinho-700 hover:text-vinho-800 font-medium mt-2">
                  <Plus size={16} /> Adicionar sócio
                </button>
              </FormSection>

              {/* ── Referências Profissionais ────────────────────── */}
              <FormSection title="Referências Profissionais">
                {form.refsProf.map((r, i) => (
                  <div key={i} className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label>Referência profissional {i + 1}</Label>
                      <Input placeholder="Nome da empresa / referência" value={r.empresa} onChange={e => setRefProf(i, 'empresa', e.target.value)} />
                    </div>
                    <div>
                      <Label>Data</Label>
                      <Input type="date" value={r.data} onChange={e => setRefProf(i, 'data', e.target.value)} />
                    </div>
                  </div>
                ))}
              </FormSection>

              {/* ── Referências Pessoais ─────────────────────────── */}
              <FormSection title="Referências Pessoais">
                {form.refsPessoais.map((r, i) => (
                  <div key={i} className="grid sm:grid-cols-2 gap-3 mb-3">
                    <div>
                      <Label>Nome da referência {i + 1}</Label>
                      <Input placeholder="Nome" value={r.nome} onChange={e => setRefPes(i, 'nome', e.target.value)} />
                    </div>
                    <div>
                      <Label>Contato</Label>
                      <Input placeholder="Telefone ou e-mail" value={r.contato} onChange={e => setRefPes(i, 'contato', e.target.value)} />
                    </div>
                  </div>
                ))}
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
                  />
                  <span className="text-sm text-gray-700 leading-relaxed">
                    <strong>Declaração obrigatória:</strong> Declaro sob as penas da lei serem verdadeiras as informações acima prestadas.
                  </span>
                </label>
              </div>

              {errorMsg && (
                <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  {errorMsg}
                </div>
              )}

              <button type="submit" disabled={status === 'loading'}
                className="w-full btn-primary justify-center text-base py-4 disabled:opacity-60">
                {status === 'loading' ? (
                  <span className="flex items-center gap-2">
                    <Loader2 size={18} className="animate-spin" />
                    Gerando PDF e enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FileText size={18} />
                    Enviar Ficha Cadastral
                  </span>
                )}
              </button>
              <p className="text-xs text-gray-400 text-center">
                Ao enviar, um PDF será gerado automaticamente e salvo no seu dispositivo.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
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
