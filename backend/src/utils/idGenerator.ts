/**
 * Utility to generate formatted reference numbers for ISLAH
 */

export function getCurrentFinancialYear(): string {
  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonth = now.getMonth(); // 0-indexed, 3 = April
  // Indian Financial Year: April 1 to March 31
  const startYear = currentMonth >= 3 ? currentYear : currentYear - 1;
  const endYearShort = String(startYear + 1).slice(-2);
  return `${startYear}-${endYearShort}`;
}

export function generateReceiptNumber(seq: number): string {
  const fy = getCurrentFinancialYear();
  const padded = String(seq).padStart(6, "0");
  return `ISLAH/RCPT/${fy}/${padded}`;
}

export function generateMemberNumber(categoryCode: string, seq: number): string {
  const year = new Date().getFullYear();
  const padded = String(seq).padStart(3, "0");
  return `ISLAH-${categoryCode.toUpperCase()}-${year}-${padded}`;
}

export function generateApplicationNumber(type: string, seq: number): string {
  const year = new Date().getFullYear();
  const code = type.slice(0, 3).toUpperCase();
  const padded = String(seq).padStart(4, "0");
  return `ISLAH-${code}-${year}-${padded}`;
}
