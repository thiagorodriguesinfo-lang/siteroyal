import { Link } from 'react-router-dom'
import { CheckCircle, Copy } from 'lucide-react'
import { useState } from 'react'

interface Props {
  protocolo: string
  onReset: () => void
}

export default function ComplaintSuccess({ protocolo, onReset }: Props) {
  const [copiado, setCopiado] = useState(false)

  function copiarProtocolo() {
    navigator.clipboard.writeText(protocolo).then(() => {
      setCopiado(true)
      setTimeout(() => setCopiado(false), 2000)
    })
  }

  return (
    <div className="min-h-[50vh] flex items-center justify-center px-4 py-12">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-10 text-center max-w-md w-full">
        <div className="w-20 h-20 bg-verde-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-verde-700" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3"
          style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          Solicitação enviada com sucesso.
        </h2>
        <p className="text-gray-500 mb-5">Seu protocolo é</p>

        <div className="flex items-center justify-center gap-2 mb-6">
          <span className="font-mono text-lg font-bold text-vinho-700 bg-vinho-50 border border-vinho-200 px-4 py-2 rounded-xl">
            {protocolo}
          </span>
          <button type="button" onClick={copiarProtocolo}
            aria-label="Copiar número do protocolo"
            className="p-2.5 text-gray-400 hover:text-vinho-700 hover:bg-vinho-50 rounded-xl transition-colors">
            <Copy size={16} />
          </button>
        </div>
        {copiado && <p className="text-xs text-verde-700 -mt-4 mb-5">Protocolo copiado!</p>}

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          Guarde esse número para futuros contatos. Um PDF com todos os detalhes
          foi salvo automaticamente no seu dispositivo e uma confirmação foi
          enviada para o seu e-mail.
        </p>

        <div className="flex flex-col gap-3">
          <Link to="/" className="btn-primary justify-center">
            Voltar ao início
          </Link>
          <button type="button" onClick={onReset}
            className="text-sm text-gray-500 hover:text-vinho-700 transition-colors">
            Registrar nova ocorrência
          </button>
        </div>
      </div>
    </div>
  )
}
