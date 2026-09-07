import { prisma } from "../../../lib/prisma.js";


export const findStaffByUserAndBranch = async (
  userId: string,
  branchId: string
) => {
  return prisma.staffMember.findFirst({
    where: {
      userId,
      branchId,
    },
  });
};