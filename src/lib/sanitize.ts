export function sanitizeInput(input: string): string {
  return input
    .replace(/[<>'"]/g, '')
    .trim()
    .slice(0, 500);
}

export function sanitizePhone(phone: string): string {
  return phone
    .replace(/[^0-9+\s()-]/g, '')
    .trim()
    .slice(0, 20);
}

export function sanitizeEmail(email: string): string {
  return email
    .toLowerCase()
    .replace(/[^a-z0-9@._-]/g, '')
    .trim()
    .slice(0, 100);
}
