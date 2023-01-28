export function getOrigin() {
  const vercelUrl =
    process.env.NEXT_PUBLIC_VERCEL_URL || process.env.VERCEL_URL;

  if (vercelUrl) {
    return `https://${vercelUrl}`;
  }

  return `http://localhost:${process.env.PORT ?? 3000}`;
}
