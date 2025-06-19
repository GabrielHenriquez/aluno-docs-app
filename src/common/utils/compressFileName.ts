export function compressFileName(fullName: string, maxBaseLength = 20): string {
  if (!fullName) return "";
  const lastDotIndex = fullName.lastIndexOf(".");
  if (lastDotIndex === -1) return fullName;

  const baseName = fullName.substring(0, lastDotIndex).trim();
  const extension = fullName.substring(lastDotIndex).trim();

  if (baseName.length <= maxBaseLength) return `${baseName}${extension}`;
  const compressedBase = `${baseName.substring(0, maxBaseLength)}...`;
  return `${compressedBase}${extension}`;
}
