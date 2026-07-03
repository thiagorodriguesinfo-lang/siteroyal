import { jsPDF } from 'jspdf'
import type { ComplaintData } from '../types/complaint'

export async function gerarComplaintPDF(
  f: ComplaintData,
  protocolo: string,
  anexos: string[]
): Promise<string> {
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
  doc.text('Central de Atendimento e Reclamações', m + 26, 20)

  doc.setFontSize(9)
  doc.text('comercial@royalalimentos.com.br', W - m, 12, { align: 'right' })
  doc.text('(21) 99664-3765', W - m, 19, { align: 'right' })

  y = 42

  // ── Protocolo em destaque ────────────────────────────────────────────────
  doc.setFillColor(253, 247, 230)
  doc.setDrawColor(212, 175, 55)
  doc.roundedRect(m, y, W - m * 2, 16, 2, 2, 'FD')
  doc.setTextColor(139, 26, 26)
  doc.setFontSize(8)
  doc.setFont('helvetica', 'bold')
  doc.text('NÚMERO DE PROTOCOLO', m + 5, y + 6)
  doc.setFontSize(13)
  doc.text(protocolo, m + 5, y + 12.5)

  const now = new Date()
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.setTextColor(100, 100, 100)
  doc.text(`Data: ${now.toLocaleDateString('pt-BR')}`, W - m - 5, y + 6, { align: 'right' })
  doc.text(`Hora: ${now.toLocaleTimeString('pt-BR')}`, W - m - 5, y + 12.5, { align: 'right' })
  y += 24

  // ── Título ────────────────────────────────────────────────────────────
  doc.setTextColor(139, 26, 26)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('REGISTRO DE OCORRÊNCIA', W / 2, y, { align: 'center' })
  y += 10

  // ── Dados do cliente ──────────────────────────────────────────────────
  section('Dados do Cliente')
  row2('Nome Completo', f.nomeCompleto, 'Empresa', f.empresa)
  row2('CNPJ', f.cnpj, 'Número do Pedido', f.numeroPedido || 'Não informado')
  row2('Telefone', f.telefone, 'WhatsApp', f.whatsapp)
  row2('E-mail', f.email, 'Cidade/Estado', `${f.cidade}/${f.estado}`)

  // ── Ocorrência ────────────────────────────────────────────────────────
  section('Ocorrência')
  row2('Assunto', f.assunto, 'Prioridade', f.prioridade)
  row1('Data da Ocorrência', f.dataOcorrencia)
  row1('Descrição Detalhada', f.descricao)
  row1('Anexos enviados', anexos.length ? anexos.join(', ') : 'Nenhum')

  // Rodapé em todas as páginas
  const totalPages = doc.getNumberOfPages()
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p)
    doc.setFillColor(245, 245, 245)
    doc.rect(0, H - 12, W, 12, 'F')
    doc.setFontSize(7)
    doc.setTextColor(150, 150, 150)
    doc.text('Royal Alimentos — Central de Atendimento | comercial@royalalimentos.com.br', m, H - 5)
    doc.text(`Página ${p} de ${totalPages}`, W - m, H - 5, { align: 'right' })
  }

  return doc.output('datauristring')
}
