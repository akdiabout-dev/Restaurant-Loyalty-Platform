import { prisma } from "../../../lib/prisma.js";

import { UpdateUserInput, UserIdParam } from "./user.types.js";

export const getUserById = async (id: string) => {
  console.log("i am in repos of user",id);
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUserById = async (
  id: string,
  data: UpdateUserInput,
) => {
  return prisma.user.update({
    where: { id},
    data: { data },
    omit:{
        passwordHash: true
    }
  });
};

export const fidAllUsers = async (skip: number, take: number) => {
  return prisma.user.findMany({
    skip,
    take,
    omit: {
      passwordHash: true,
    },
  });
};
export const countUsers = async () => {
  return prisma.user.count();
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
