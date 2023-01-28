export function createShortUrl(url: string) {
  // TODO - make deterministic
  return Math.random().toString(36).slice(7);
}
