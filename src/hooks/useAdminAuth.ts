"use client";

import { adminApi, userApi } from "@/lib/api"; // Adjust path as necessary
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./use-toast"; // Adjust path as necessary
import {
  IUser,
  IUpdateProfileData,
  IUpdatePasswordData,
  IAdminUpdateUserData,
  IResetPasswordData,
  IGetAllUsersParams,
  MenuItem,
  ApiResponse,
} from "@/lib/types"; // Adjust path as necessary
import { useAuthStore } from "@/store/useAuth";
import { USER_ROLES } from "@/lib/constants";

// --- Query Keys ---
const PROFILE_QUERY_KEY = ["userProfile"];
const ALL_USERS_QUERY_KEY = ["allUsers"];


export const useGetProfile = () => {
  return useQuery({
    queryKey: PROFILE_QUERY_KEY,
    queryFn: () => userApi.getProfile(),
    select: (res) => res.data as IUser,
    staleTime: 5 * 60 * 1000,
  });
};


export const useUpdateProfile = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateProfile"],
    mutationFn: (data: IUpdateProfileData) => userApi.updateProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PROFILE_QUERY_KEY });
      toast({
        title: "Profile Updated ",
        description: "Your profile details have been successfully updated.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to update profile.";
      toast({
        variant: "destructive",
        title: "Update Failed ",
        description: errorMessage,
      });
    },
  });
};


export const useUpdatePassword = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["updatePassword"],
    mutationFn: (data: IUpdatePasswordData) => userApi.updatePassword(data),
    onSuccess: () => {
      toast({
        title: "Password Updated ✅",
        description: "Your password has been changed successfully.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to update password.";
      toast({
        variant: "destructive",
        title: "Update Failed ",
        description: errorMessage,
      });
    },
  });
};

// ====================================================================
// 2. ADMIN HOOKS (User Management)
// ====================================================================

export const useGetAllUsers = (params: IGetAllUsersParams = {}) => {
  return useQuery({
    queryKey: [...ALL_USERS_QUERY_KEY, params],
    queryFn: () => userApi.getAllUsers(params),
    staleTime: 60 * 2000, // 2 minute stale time
  });
};


export const useUpdateUserByAdmin = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["updateUserByAdmin"],
    mutationFn: ({ userId, data }: { userId: string; data: IAdminUpdateUserData }) =>
      userApi.updateUserByAdmin(userId, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_USERS_QUERY_KEY });
      toast({
        title: "User Updated ",
        description: "User details updated successfully by admin.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to update user.";
      toast({
        variant: "destructive",
        title: "Admin Update Failed ",
        description: errorMessage,
      });
    },
  });
};

/**
 * Resets a user's password by ID. (Admin Only)
 * @PUT /users/:id/password
 */
export const useResetUserPassword = () => {
  const { toast } = useToast();

  return useMutation({
    mutationKey: ["resetUserPassword"],
    mutationFn: ({ userId, data }: { userId: string; data: IResetPasswordData }) =>
      userApi.resetUserPassword(userId, data),
    onSuccess: () => {
      toast({
        title: "Password Reset Success ✔️",
        description: "User's password has been successfully reset.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to reset password.";
      toast({
        variant: "destructive",
        title: "Reset Failed ",
        description: errorMessage,
      });
    },
  });
};

/**
 * Deletes a user by ID. (Admin Only)
 * @DELETE /users/:id
 */
export const useDeleteUser = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: (userId: string) => userApi.deleteUser(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ALL_USERS_QUERY_KEY });
      toast({
        title: "User Deleted 🗑️",
        description: "User has been removed from the system.",
      });
    },
    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.error || error?.message || "Failed to delete user.";
      toast({
        variant: "destructive",
        title: "Delete Failed ",
        description: errorMessage,
      });
    },
  });
};


export const useAdminMenu = () => {
  const { currentUser } = useAuthStore();
  return useQuery({
    queryKey: ["adminMenu"],
    select: (res) => res.data?.menu,
    queryFn: () => adminApi.getAdminMenu(),
    staleTime: 5 * 60 * 10000,
    retry: false,
    enabled: currentUser?.role === USER_ROLES.admin,
  });
};

export const useAdminSideMenu = () => {
  const { currentUser } = useAuthStore();
  return useQuery({
    queryKey: ["adminSideMenu"],
    queryFn: () => adminApi.getAdminSideMenu(),
    select: (res) => res.data?.menu,
    staleTime: 5 * 60 * 10000,
    retry: 2,
    // enabled: currentUser?.role === USER_ROLES.admin,

  });
};

