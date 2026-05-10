export function extractFirstLine(body: string): string {
  for (const raw of body.split('\n')) {
    const line = raw.trim();
    if (!line) continue;
    if (line.startsWith('---')) continue;
    if (line.startsWith('#')) continue;
    if (line.startsWith('<')) continue;
    return line;
  }
  return '';
}
