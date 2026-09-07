import { prisma } from "../../../../lib/prisma.js";
import {
  createInput,
  RefreshSessionInput,
  RegisterInput,
} from "./auth.types.js";
import { hashPassword } from "../../../../shared/utils/hashHelper.js";
import { RefreshSession, User } from "../../../../generated/prisma/client.js";

export const create = async (data: createInput, passwordHash: string) => {
  console.log("i am in repo");
  console.log(data, passwordHash);
  return await prisma.user.create({
    data: {
      ...data,
      passwordHash,
    },
    omit: {
      passwordHash: true,
    },
  });
};

export const findByEmail = async (email: string): Promise<User | null> => {
  console.log("i am in findById");
  return prisma.user.findUnique({
    where: { email },
  });
};

export const createRefreshSession = async (data: RefreshSessionInput) => {
  return prisma.refreshSession.create({
    data: {
      ...data,
    },
  });
};

export const findSession = async (tokenHash: string) => {
  return prisma.refreshSession.findUnique({
    where: { tokenHash },
    omit: {
      tokenHash: true,
    },
  });
};

export const updateRefreshSession = async (
  tokenHash: string,
  data: {
    revokedAt?: Date;
    replacedById?: string;
  },
) => {
  return prisma.refreshSession.update({
    where: { tokenHash },
    data,
    omit: {
      tokenHash: true,
    },
  });
};

export const revokeFamilySession = async (familyId: string) => {
  return prisma.refreshSession.updateMany({
    where: {
      familyId,
      revokedAt: null,
    },
    data: {
      revokedAt: new Date(),
    },
  });
};
