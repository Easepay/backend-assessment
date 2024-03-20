import { compare, genSalt, hash } from "bcrypt";

const SALT_ROUNDS = 13;

export const encrypt = async (plainTextPassword: string) => {
  const salt = await genSalt(SALT_ROUNDS);
  return await hash(plainTextPassword, salt);
};

export const matchPassword = async (
  hashedPassword: string,
  plainTextPassword: string,
) => {
  return await compare(plainTextPassword, hashedPassword);
};
