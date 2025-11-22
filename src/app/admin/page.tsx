
"use client"
import { BookingsTable } from "@/components/BookingsTable";
import { RevenueChart } from "@/components/RevenueChart";
import { StatCard } from "@/components/StatCard";
import { getAdminAnalytics, getAdminDashboard } from "@/hooks/useAdminDasboard";
import { Calendar, DollarSign, Music, TrendingUp, Users } from "lucide-react";

export default function AdminHomePage() {

  const { data: DashboardData, isLoading: loadingDashboard } = getAdminDashboard();
  const { data: AnalyticsData, isLoading: loadingAnalytics } = getAdminAnalytics();
  const stats = DashboardData?.stats;
  const bookings = DashboardData?.recentBookings;
  const revenueData = AnalyticsData?.totalRevenue;
  // const bookings = DashboardData?.bookingCount;

  if (loadingDashboard || loadingAnalytics) {
    return (
      <div>Loading...</div>);
  }

  console.log("dahsboar", DashboardData, "analytics", AnalyticsData)
  return (
    <div className="flex-1 overflow-auto">
      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <StatCard
            icon={Calendar}
            label="Total Bookings"
            value={stats?.totalBookings || 0}
            change="12% from last month"
            trend="up"
          /> 
          <StatCard
            icon={DollarSign}
            label="Total Revenue"
            value={`₹${(revenueData || 0).toLocaleString()}`}
            change="8% from last month"
            trend="up"
          />
          <StatCard
            icon={Music}
            label="Total Concerts"
            value={stats?.totalConcerts || 0}
            change="2 new this month"
            trend="up"
          />
          <StatCard
            icon={Users}
            label="Total Users"
            value={stats?.totalUsers || 0}
            change="15 new users"
            trend="up"
          />
          <StatCard
            icon={TrendingUp}
            label="Theaters"
            value={stats?.totalTheaters || 0}
            change="Stable"
            trend="up"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2">
            {/* <RevenueChart data={revenueData} /> */}
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">Avg. Booking Value</span>
                <span className="font-semibold text-gray-900">₹{stats && stats.total_revenue && stats.total_bookings ? (stats.total_revenue / stats.total_bookings).toLocaleString('en-IN', { maximumFractionDigits: 0 }) : 0}</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">Confirmation Rate</span>
                <span className="font-semibold text-green-600">95%</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-600 text-sm">Active Users</span>
                <span className="font-semibold text-gray-900">{Math.round((stats?.total_users || 0) * 0.85)}</span>
              </div>
            </div>
          </div>
        </div>

        <BookingsTable bookings={bookings} />
      </div>
    </div>
  );
}
