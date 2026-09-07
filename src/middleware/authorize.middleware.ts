import type { Request, Response, NextFunction } from "express";

import { AppError } from "../shared/errors/appError.js";
import {
  type Permission,
  ROLE_PERMISSIONS,
} from "../shared/auth/permissions.js";
import { findStaffByUserAndBranch } from "../models/core/staff/staff.repository.js";

export const authorize = (requiredPermission: Permission) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      // authenticate middleware must run before authorize,
      // so req.user should already contain the authenticated user.
      const id = req.user!.id;

      if (!id) {
        throw new AppError(401, "Unauthenticated");
      }

      // The branch we want to perform the action in.
      const branchId = req.params.branchId;

      if (!branchId || typeof branchId !== "string") {
        throw new AppError(400, "Branch id is required as a string");
      }

      // Check whether this user is a staff member of this branch.
      const staffMember = await findStaffByUserAndBranch(id, branchId);

      if (!staffMember) {
        throw new AppError(403, "Forbidden");
      }

      // Get all permissions allowed for this staff member's role.
      const permissions:Permission[] = ROLE_PERMISSIONS[staffMember.role];

      // Check whether the role contains the action required by the route.
      if (!permissions.includes(requiredPermission)) {
        throw new AppError(403, "Forbidden");
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
