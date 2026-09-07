import { AppError } from "../../../shared/errors/appError.js";
import { findByEmail } from "./auth/auth.repository.js";
import {
  countUsers,
  deleteUser,
  fidAllUsers,
  getUserById,
  updateUserById,
} from "./user.repository.js";
import {
  UpdateUserInput,
  UserIdParam,
  UserListResponse,
  UserQueryParams,
  UserResponse,
} from "./user.types.js";

export const getAllUsers = async (
  query: UserQueryParams,
): Promise<UserListResponse> => {
  const { page, limit } = query;
  const skip = (page - 1) * limit;

  const [users, total] = await Promise.all([
    fidAllUsers(skip, limit),
    countUsers(),
  ]);
  return {
    data: users,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getMyProfile = async (
  userId: UserIdParam,
): Promise<UserResponse> => {
  const { id } = userId;
  const user = await getUserById(id);
  console.log("USER FROM service:", user);
  if (!user) {
    throw new AppError(404, "User not found");
  }
  return user;
};

export const updateUser = async (
  userId: UserIdParam,
  data: UpdateUserInput,
): Promise<UserResponse> => {
    const {id} = userId;
    const existingUser = await getUserById(id);
    
    if(!existingUser){
        throw new AppError(404, "User was not found");
    }
    return await updateUserById(id, data)
};

export const getOneUserById = async (
  userId: UserIdParam,
): Promise<UserResponse> => {
  const { id } = userId;
  const user = await getUserById(id);

  if (!user) {
    throw new AppError(404, "User was not found");
  }
  return user;
};

export const deleteOneUser = async (
  userId: UserIdParam,
): Promise<UserResponse> => {
  const { id } = userId;
  return await deleteUser(id);
};
