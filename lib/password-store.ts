let storedPassword: string | null = "cypher202"

export function setStoredPassword(password: string) {
  storedPassword = password
}

export function getStoredPassword(): string | null {
  return storedPassword
}
