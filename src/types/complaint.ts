export interface ComplaintData {
  nomeCompleto: string
  empresa: string
  cnpj: string
  telefone: string
  whatsapp: string
  email: string
  cidade: string
  estado: string
  numeroPedido: string
  dataOcorrencia: string
  assunto: string
  prioridade: 'Baixa' | 'Média' | 'Alta' | ''
  descricao: string
  declaracao: boolean
}

export const ASSUNTOS = [
  'Entrega', 'Produto', 'Pedido', 'Financeiro',
  'Comercial', 'Representante', 'Atendimento', 'Logística', 'Outro',
] as const

export const PRIORIDADES = ['Baixa', 'Média', 'Alta'] as const
