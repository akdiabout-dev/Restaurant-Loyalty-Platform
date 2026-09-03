import { prisma } from "../../../../lib/prisma.js";
import { RefreshSessionInput, RegisterInput } from "./auth.types.js";
import { hashPassword } from "../../../../shared/utils/hashHelper.js";
import { RefreshSession, User } from "../../../../generated/prisma/client.js";

const create = async (data: RegisterInput) => {
  const passwordHash = await hashPassword(data.password);
  return await prisma.user.create({
    data: {
      ...data,
      passwordHash,
    },
    select: {
      $scalars: true,
      passwordHash: false,
    },
  });
};

const findByEmail = async (
  email: string
): Promise<User | null> => {
  return prisma.user.findUnique({
    where: { email }
  });
};

const createRefreshSession = async (data: RefreshSession) => {
  return prisma.refreshSession.create({
    data: {
      ...data,
    },
  });
};

export { create, findByEmail, createRefreshSession };
