/**
 * Convert JSON text to TOON. Same rules as the original converter:
 * - top-level array, or an object wrapping a single array ({ "users": [...] })
 *   becomes a table named after its key
 * - any other object is treated as a one-item array named "object"
 * Throws Error with a readable message on invalid input.
 */
export function jsonToToon(input) {
  let data;
  try {
    data = JSON.parse(input);
  } catch {
    throw new Error('Invalid JSON format');
  }

  let rows;
  let root = 'items';
  if (Array.isArray(data)) {
    rows = data;
  } else if (typeof data === 'object' && data !== null) {
    const keys = Object.keys(data);
    if (keys.length === 1 && Array.isArray(data[keys[0]])) {
      root = keys[0];
      rows = data[keys[0]];
    } else {
      rows = [data];
      root = 'object';
    }
  } else {
    throw new Error('Input must be an array or object');
  }

  if (rows.length === 0) return `${root}[0]{}:`;

  const headers = [];
  const seen = new Set();
  rows.forEach((row) => {
    if (typeof row === 'object' && row !== null) {
      Object.keys(row).forEach((k) => { if (!seen.has(k)) { seen.add(k); headers.push(k); } });
    }
  });

  const cell = (val) => {
    if (val === undefined || val === null) return '';
    if (typeof val === 'object') return JSON.stringify(val);
    const s = String(val);
    return s.includes(',') || s.includes('\n') || s.includes('"') ? `"${s.replace(/"/g, '""')}"` : s;
  };

  const body = rows
    .map((row) => `  ${headers.map((k) => cell(row?.[k])).join(',')}`)
    .join('\n');

  return `${root}[${rows.length}]{${headers.join(',')}}:\n${body}`;
}
