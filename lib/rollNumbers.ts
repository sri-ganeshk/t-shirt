/**
 * Regex patterns for all valid roll number ranges
 */
const ROLL_NUMBER_PATTERNS: RegExp[] = [
  // 22L31A0501 -> 22L31A0599
  /^22L31A05(0[1-9]|[1-9]\d)$/,

  // 22L31A05A0 -> 22L31A05P6
  /^22L31A05([A-OA-O]\d|P[0-6])$/,

  // 23L35A0501 -> 23L35A0547
  /^23L35A05([0-3]\d|4[0-7]|0[1-9])$/,

  // 22L31A4401 -> 22L31A4457
  /^22L31A44(0[1-9]|[1-4]\d|5[0-7])$/,

  // 23L35A4401 -> 23L35A4412
  /^23L35A44(0[1-9]|1[0-2])$/,

  // 22L31A4301 -> 22L31A4363
  /^22L31A43(0[1-9]|[1-5]\d|6[0-3])$/,

  // 23L35A4301 -> 23L35A4309
  /^23L35A43(0[1-9])$/,

  // 22L31A4602 -> 22L31A4654
  /^22L31A46(0[2-9]|[1-4]\d|5[0-4])$/,

  // 23L35A4601 -> 23L35A4606
  /^23L35A46(0[1-6])$/,
];

/**
 * Check if a roll number is valid — O(k) where k = number of patterns (constant)
 */
export function isValidRollNumber(rollNumber: string): boolean {
  const normalized = rollNumber.trim().toUpperCase();
  return ROLL_NUMBER_PATTERNS.some((pattern) => pattern.test(normalized));
}

/**
 * Generate all valid roll numbers (only use when you actually need the full list)
 */
export function generateValidRollNumbers(): string[] {
  const rollNumbers: string[] = [];

  // 22L31A0501 -> 22L31A0599
  for (let i = 1; i <= 99; i += 1)
    rollNumbers.push(`22L31A05${String(i).padStart(2, "0")}`);

  // 22L31A05A0 -> 22L31A05P6
  for (let code = "A".charCodeAt(0); code <= "P".charCodeAt(0); code += 1) {
    const letter = String.fromCharCode(code);
    const endDigit = letter === "P" ? 6 : 9;
    for (let digit = 0; digit <= endDigit; digit += 1)
      rollNumbers.push(`22L31A05${letter}${digit}`);
  }

  // 23L35A0501 -> 23L35A0547
  for (let i = 501; i <= 547; i += 1)
    rollNumbers.push(`23L35A${String(i).padStart(4, "0")}`);

  // 22L31A4401 -> 22L31A4457
  for (let i = 1; i <= 57; i += 1)
    rollNumbers.push(`22L31A44${String(i).padStart(2, "0")}`);

  // 23L35A4401 -> 23L35A4412
  for (let i = 1; i <= 12; i += 1)
    rollNumbers.push(`23L35A44${String(i).padStart(2, "0")}`);

  // 22L31A4301 -> 22L31A4363
  for (let i = 1; i <= 63; i += 1)
    rollNumbers.push(`22L31A43${String(i).padStart(2, "0")}`);

  // 23L35A4301 -> 23L35A4309
  for (let i = 1; i <= 9; i += 1)
    rollNumbers.push(`23L35A43${String(i).padStart(2, "0")}`);

  // 22L31A4602 -> 22L31A4654
  for (let i = 2; i <= 54; i += 1)
    rollNumbers.push(`22L31A46${String(i).padStart(2, "0")}`);

  // 23L35A4601 -> 23L35A4606
  for (let i = 1; i <= 6; i += 1)
    rollNumbers.push(`23L35A46${String(i).padStart(2, "0")}`);

  return rollNumbers;
}
