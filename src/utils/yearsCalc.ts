/** Data de fundação da Royal Alimentos: 20/10/2008 */
const FOUNDATION = new Date(2008, 9, 20) // mês 0-indexado: 9 = outubro

/** Calcula anos completos desde a fundação até hoje */
export function calcYearsInBusiness(): number {
  const now = new Date()
  let years = now.getFullYear() - FOUNDATION.getFullYear()
  const monthDiff = now.getMonth() - FOUNDATION.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < FOUNDATION.getDate())) {
    years--
  }
  return years
}
