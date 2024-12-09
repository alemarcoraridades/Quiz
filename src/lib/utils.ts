export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]): string {
  return classes.filter(Boolean).join(' ');
}

export function generateId(): string {
  return Math.random().toString(36).substring(2, 15);
}