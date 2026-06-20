export function getPageNumbers(current, total) {
  const delta = 2;
  const range = [];
  const rangeWithDots = [];

  for (
    let i = Math.max(2, current - delta);
    i <= Math.min(total - 1, current + delta);
    i++
  ) {
    range.push(i);
  }

  if (current - delta > 2) {
    rangeWithDots.push("...");
  }

  if (total > 1) {
    rangeWithDots.unshift(1);
  }

  rangeWithDots.push(...range);

  if (current + delta < total - 1) {
    rangeWithDots.push("...");
  }

  if (total > 1) {
    rangeWithDots.push(total);
  }

  return rangeWithDots;
}
