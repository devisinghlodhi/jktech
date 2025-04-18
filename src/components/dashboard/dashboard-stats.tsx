"use client"

import { FileText, Users, Clock, BarChart } from "lucide-react"

// In a real application, this would come from an API
const mockStats = {
  totalDocuments: 128,
  activeUsers: 24,
  recentUploads: 17,
  totalQueries: 342,
}

export function DashboardStats() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Documents</h3>
          <FileText className="h-4 w-4 text-gray-500 dark:text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{mockStats.totalDocuments}</div>
        <p className="text-xs text-gray-600 dark:text-gray-400">+12% from last month</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Users</h3>
          <Users className="h-4 w-4 text-gray-500 dark:text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{mockStats.activeUsers}</div>
        <p className="text-xs text-gray-600 dark:text-gray-400">+4 new users this week</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Recent Uploads</h3>
          <Clock className="h-4 w-4 text-gray-500 dark:text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{mockStats.recentUploads}</div>
        <p className="text-xs text-gray-600 dark:text-gray-400">In the last 7 days</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Queries</h3>
          <BarChart className="h-4 w-4 text-gray-500 dark:text-gray-500" />
        </div>
        <div className="text-2xl font-bold">{mockStats.totalQueries}</div>
        <p className="text-xs text-gray-600 dark:text-gray-400">+18% from last month</p>
      </div>
    </div>
  )
}
