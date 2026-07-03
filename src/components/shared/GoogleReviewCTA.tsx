import { Star } from 'lucide-react'

const GOOGLE_REVIEW_URL = 'https://g.page/r/CT2G35Y5iHL9EBM/review'

export default function GoogleReviewCTA() {
  return (
    <section className="py-14 bg-white border-t border-gray-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="rounded-3xl border-2 border-dourado-200 bg-gradient-to-br from-dourado-50 to-white p-8 md:p-12 flex flex-col md:flex-row items-center gap-8 shadow-sm">
          {/* Ícone de estrelas */}
          <div className="flex-shrink-0">
            <div className="w-20 h-20 bg-dourado-500 rounded-2xl flex items-center justify-center shadow-lg">
              <Star size={36} className="text-white fill-white" />
            </div>
          </div>

          {/* Texto */}
          <div className="flex-1 text-center md:text-left">
            <p className="text-xs font-semibold text-dourado-600 uppercase tracking-wider mb-2">
              Google · Avaliações
            </p>
            <h3
              className="text-2xl md:text-3xl font-bold text-gray-900 mb-3"
              style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
            >
              Avalie a Royal Alimentos no Google
            </h3>
            <p className="text-gray-500 text-base leading-relaxed max-w-lg">
              Sua opinião ajuda a Royal Alimentos a continuar melhorando e
              atendendo cada vez melhor nossos clientes.
            </p>

            {/* Estrelas decorativas */}
            <div className="flex gap-1 mt-3 justify-center md:justify-start">
              {[1, 2, 3, 4, 5].map(n => (
                <Star key={n} size={20} className="text-dourado-500 fill-dourado-500" />
              ))}
              <span className="text-gray-400 text-sm ml-2 self-center">Avalie agora</span>
            </div>
          </div>

          {/* CTA */}
          <div className="flex-shrink-0">
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-dourado-500 hover:bg-dourado-600 text-gray-900 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-md hover:shadow-lg hover:scale-105 text-base"
            >
              <Star size={18} className="fill-gray-900" />
              Avaliar agora
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
