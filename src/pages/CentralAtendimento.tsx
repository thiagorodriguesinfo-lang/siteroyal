import { useEffect, useState } from 'react'
import { Headset, ChevronDown } from 'lucide-react'
import ComplaintForm from '../components/atendimento/ComplaintForm'
import ComplaintSuccess from '../components/atendimento/ComplaintSuccess'

const FAQS = [
  { q: 'Onde está meu pedido?', a: 'Você pode acompanhar o status do seu pedido entrando em contato pelo WhatsApp (21) 99664-3765 ou registrando uma ocorrência aqui informando o número do pedido, se já o tiver.' },
  { q: 'Como solicitar troca?', a: 'Registre sua solicitação no formulário acima selecionando o assunto "Produto" ou "Pedido", descrevendo o problema e anexando fotos. Nossa equipe entrará em contato para orientar a troca.' },
  { q: 'Como falar com um representante?', a: 'Selecione o assunto "Representante" no formulário, ou acesse a página "Seja Representante" no menu para conhecer nossa rede comercial.' },
  { q: 'Como funciona a garantia dos produtos?', a: 'Trabalhamos com produtos de qualidade e padrão de procedência. Caso identifique qualquer não conformidade, registre o quanto antes pelo formulário acima para que possamos avaliar e resolver.' },
  { q: 'Como acompanhar minha solicitação?', a: 'Guarde o número de protocolo gerado após o envio. Você pode usá-lo em qualquer novo contato com a equipe Royal Alimentos para agilizar o atendimento.' },
]

export default function CentralAtendimento() {
  const [protocolo, setProtocolo] = useState<string | null>(null)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Central de Atendimento | Royal Alimentos'

    const metaDesc = document.querySelector('meta[name="description"]')
    const prevDesc = metaDesc?.getAttribute('content') ?? ''
    metaDesc?.setAttribute(
      'content',
      'Canal oficial de atendimento da Royal Alimentos para dúvidas, sugestões, elogios e ocorrências.'
    )

    return () => {
      document.title = prevTitle
      metaDesc?.setAttribute('content', prevDesc)
    }
  }, [])

  return (
    <>
      {/* Hero */}
      <section className="py-16 bg-vinho-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 30% 50%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Headset size={28} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
            Como podemos ajudar?
          </h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto leading-relaxed">
            Na Royal Alimentos, cada cliente é importante. Caso tenha ocorrido qualquer
            problema com um pedido, entrega, atendimento ou produto, queremos resolver
            da melhor forma possível. Preencha o formulário abaixo que nossa equipe
            entrará em contato o mais rápido possível.
          </p>
        </div>
      </section>

      {/* Formulário ou tela de sucesso */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4">
          {protocolo
            ? <ComplaintSuccess protocolo={protocolo} onReset={() => setProtocolo(null)} />
            : <ComplaintForm onSuccess={setProtocolo} />}
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="section-title gold-underline-center">Perguntas Frequentes</h2>
          </div>
          <div className="space-y-3">
            {FAQS.map((item, i) => {
              const open = openFaq === i
              return (
                <div key={item.q} className="border border-gray-100 rounded-2xl overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-panel-${i}`}
                    className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left bg-white hover:bg-gray-50 transition-colors"
                  >
                    <span className="font-semibold text-gray-900">{item.q}</span>
                    <ChevronDown size={18}
                      className={`text-gray-400 flex-shrink-0 transition-transform ${open ? 'rotate-180' : ''}`} />
                  </button>
                  {open && (
                    <div id={`faq-panel-${i}`} className="px-5 pb-4 text-sm text-gray-500 leading-relaxed">
                      {item.a}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
