import * as bcrypt from 'bcrypt';

export async function encryptPassword(
  plainPassword: string,
  saltRounds: number = 10,
): Promise<string> {
  return await bcrypt.hash(plainPassword, saltRounds);
}
