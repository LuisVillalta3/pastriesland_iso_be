export function generateCustomPassword(
  length = 12,
  options = {
    upper: true,
    lower: true,
    number: true,
    symbol: true,
  },
): string {
  const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lower = 'abcdefghijklmnopqrstuvwxyz';
  const number = '0123456789';
  const symbol = '!@#$%^&*()_+-=[]{}|;:,.<>?';

  let all = '';
  if (options.upper) all += upper;
  if (options.lower) all += lower;
  if (options.number) all += number;
  if (options.symbol) all += symbol;

  if (!all) throw new Error('No character sets selected.');

  let password = '';
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * all.length);
    password += all[randomIndex];
  }

  return password;
}
