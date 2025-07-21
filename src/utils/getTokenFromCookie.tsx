export function getTokenFromCookie(): string | null {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("access_token="));
  return match ? match.split("=")[1] : null;
}
