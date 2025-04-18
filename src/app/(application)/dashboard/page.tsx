"use client"

import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { FileText, Upload, MessageSquare, Users } from "lucide-react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { RecentDocuments } from "@/components/dashboard/recent-documents"
import { RecentActivity } from "@/components/dashboard/recent-activity"

export default function DashboardPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 flex items-center justify-center min-h-[calc(100vh-200px)]">
        <p>Loading...</p>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Welcome back, {user.name}</h1>
          <p className="text-gray-600 dark:text-gray-400">Here's an overview of your document management system</p>
        </div>
        <div className="flex space-x-4 mt-4 md:mt-0">
          <Link
            href="/documents/upload"
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
          >
            <Upload className="mr-2 h-4 w-4" />
            Upload Document
          </Link>
        </div>
      </div>

      <DashboardStats />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-8">
        <div className="lg:col-span-2">
          <RecentDocuments />
        </div>
        <div>
          <RecentActivity />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold flex items-center">
              <FileText className="mr-2 h-5 w-5 text-blue-600" />
              Document Management
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Upload, organize, and manage your documents</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col space-y-2">
              <Link
                href="/documents"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                View All Documents
              </Link>
              <Link
                href="/documents/upload"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Upload New Document
              </Link>
              <Link
                href="/documents/categories"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Manage Categories
              </Link>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-semibold flex items-center">
              <MessageSquare className="mr-2 h-5 w-5 text-blue-600" />
              Q&A System
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Ask questions about your documents</p>
          </div>
          <div className="p-6">
            <div className="flex flex-col space-y-2">
              <Link
                href="/qa"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Ask a Question
              </Link>
              <Link
                href="/qa/history"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                View Question History
              </Link>
              <Link
                href="/qa/saved"
                className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
              >
                Saved Answers
              </Link>
            </div>
          </div>
        </div>

        {user.role === "admin" && (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold flex items-center">
                <Users className="mr-2 h-5 w-5 text-blue-600" />
                Admin Controls
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Manage users and system settings</p>
            </div>
            <div className="p-6">
              <div className="flex flex-col space-y-2">
                <Link
                  href="/admin/users"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  Manage Users
                </Link>
                <Link
                  href="/admin/settings"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  System Settings
                </Link>
                <Link
                  href="/admin/logs"
                  className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                  View Logs
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
