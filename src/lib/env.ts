export function getAdminKey(): string {
  const key = process.env.ADMIN_KEY;
  if (!key) throw new Error("ADMIN_KEY is not set");
  return key;
}
