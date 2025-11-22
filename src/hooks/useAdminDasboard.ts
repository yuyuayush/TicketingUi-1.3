"use client";
import { adminApi, userApi } from "@/lib/api"
import { useQuery } from "@tanstack/react-query"

export const getAdminDashboard = () => {
    return useQuery({
        queryKey: ["ADMIN_DASHBOARD"],
        queryFn: adminApi.getDasboard,
        staleTime: 60 * 5000,
        select: (res) => res.data

    })
}
export const getAdminAnalytics = () => {
    return useQuery({
        queryKey: ["ADMIN_ANALYTICS"],
        queryFn: adminApi.analytics,
        staleTime: 60 * 5000,
        select: (res) => res.data

    })
}