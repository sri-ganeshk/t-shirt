/**
 * Generate all valid roll numbers for the system
 */
export function generateValidRollNumbers(): string[] {
  const rollNumbers: string[] = [];

  // 22L31A0501 -> 22L31A0599
  for (let i = 1; i <= 99; i += 1) {
    rollNumbers.push(`22L31A05${String(i).padStart(2, "0")}`);
  }

  // 22L31A05A0 -> 22L31A05P6
  for (let code = "A".charCodeAt(0); code <= "P".charCodeAt(0); code += 1) {
    const letter = String.fromCharCode(code);
    const endDigit = letter === "P" ? 6 : 9;

    for (let digit = 0; digit <= endDigit; digit += 1) {
      rollNumbers.push(`22L31A05${letter}${digit}`);
    }
  }

  // 23L35A0501 -> 23L35A0547
  for (let i = 501; i <= 547; i += 1) {
    rollNumbers.push(`23L35A${String(i).padStart(4, "0")}`);
  }

  return rollNumbers;
}

/**
 * Check if a roll number is valid
 */
export function isValidRollNumber(rollNumber: string): boolean {
  const validRollNumbers = generateValidRollNumbers();
  return validRollNumbers.includes(rollNumber.trim().toUpperCase());
}
