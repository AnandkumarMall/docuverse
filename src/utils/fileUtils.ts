// src/utils/fileUtils.ts
// Shared security and UX utilities for file handling.

/**
 * Validates that an ArrayBuffer begins with the PDF magic bytes (%PDF-).
 * file.type is user-controlled (set from extension) and must NOT be trusted alone.
 */
export function isPdfMagicBytes(buffer: ArrayBuffer): boolean {
  if (buffer.byteLength < 5) return false;
  const b = new Uint8Array(buffer, 0, 5);
  return (
    b[0] === 0x25 && // %
    b[1] === 0x50 && // P
    b[2] === 0x44 && // D
    b[3] === 0x46 && // F
    b[4] === 0x2d    // -
  );
}

/**
 * Prompts the user if the file exceeds warnMB.
 * Returns true if processing should continue, false if user cancelled.
 */
export function confirmLargeFile(file: File, warnMB = 100): boolean {
  const mb = file.size / 1048576;
  if (mb <= warnMB) return true;
  return confirm(
    `This file is ${mb.toFixed(1)} MB. Processing very large files may be slow or use significant memory.\n\nContinue?`
  );
}

/**
 * Safely escapes a string for use as text content (does NOT produce HTML).
 * Use with element.textContent, not innerHTML.
 */
export function safeText(str: string): string {
  return str;
}

/**
 * Revokes an object URL after a short delay to allow the download to start.
 */
export function revokeAfterDownload(url: string, delayMs = 30_000): void {
  setTimeout(() => URL.revokeObjectURL(url), delayMs);
}
