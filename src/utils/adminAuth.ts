const SESSION_KEY = 'rc_admin_session'

export function adminLogin(user: string, pass: string): boolean {
  if (user === 'admin' && pass === 'admin') {
    sessionStorage.setItem(SESSION_KEY, '1')
    return true
  }
  return false
}

export function adminLogout(): void {
  sessionStorage.removeItem(SESSION_KEY)
}

export function isAdminAuthenticated(): boolean {
  return sessionStorage.getItem(SESSION_KEY) === '1'
}
