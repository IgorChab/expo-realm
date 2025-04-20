/**
 * Добавляет прозрачность к hex цвету.
 * @param hex - Цвет в hex формате, например "#FF5733" или "#F53"
 * @param alpha - Прозрачность от 0 до 1
 * @returns Цвет с прозрачностью в формате rgba или hex8
 */
export const colorWithAlpha = (hex: string, alpha: number): string => {
  alpha = Math.max(0, Math.min(1, alpha));
  
  let cleanHex = hex.replace('#', '');
  
  if (cleanHex.length === 3) {
    cleanHex = cleanHex
      .split('')
      .map((char) => char + char)
      .join('');
  }
  
  if (cleanHex.length !== 6) {
    throw new Error('Неверный формат hex цвета');
  }
  
  const r = parseInt(cleanHex.slice(0, 2), 16);
  const g = parseInt(cleanHex.slice(2, 4), 16);
  const b = parseInt(cleanHex.slice(4, 6), 16);
  
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
