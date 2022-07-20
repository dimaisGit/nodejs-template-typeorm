import bcrypt from "bcrypt";

export const comparePasswords = async (
  plainPassword: string,
  hash: string
): Promise<boolean> => {
  const result = await bcrypt.compare(plainPassword, hash);

  return result;
};
