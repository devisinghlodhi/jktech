"use client"

import { FileText, Upload, Download, Eye, MessageSquare } from "lucide-react"

// Mock data for recent activity
const recentActivity = [
  {
    id: "1",
    type: "upload",
    user: {
      name: "John Doe",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    document: "Q4 Financial Report",
    timestamp: "2023-12-15T10:30:00Z",
  },
  {
    id: "2",
    type: "view",
    user: {
      name: "Jane Smith",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    document: "Marketing Strategy 2024",
    timestamp: "2023-12-14T14:45:00Z",
  },
  {
    id: "3",
    type: "download",
    user: {
      name: "Alex Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    document: "Product Roadmap",
    timestamp: "2023-12-13T09:15:00Z",
  },
  {
    id: "4",
    type: "qa",
    user: {
      name: "Sarah Williams",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    document: "HR Policy Update",
    timestamp: "2023-12-12T16:20:00Z",
  },
  {
    id: "5",
    type: "upload",
    user: {
      name: "Michael Brown",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    document: "Client Meeting Notes",
    timestamp: "2023-12-11T11:00:00Z",
  },
]

// Helper function to format relative time
function formatRelativeTime(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} ${diffInMinutes === 1 ? "minute" : "minutes"} ago`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? "hour" : "hours"} ago`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? "day" : "days"} ago`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  return `${diffInMonths} ${diffInMonths === 1 ? "month" : "months"} ago`
}

// Helper function to get icon based on activity type
function getActivityIcon(type: string) {
  switch (type) {
    case "upload":
      return <Upload className="h-4 w-4" />
    case "download":
      return <Download className="h-4 w-4" />
    case "view":
      return <Eye className="h-4 w-4" />
    case "qa":
      return <MessageSquare className="h-4 w-4" />
    default:
      return <FileText className="h-4 w-4" />
  }
}

// Helper function to get activity description
function getActivityDescription(activity: (typeof recentActivity)[0]) {
  switch (activity.type) {
    case "upload":
      return `uploaded ${activity.document}`
    case "download":
      return `downloaded ${activity.document}`
    case "view":
      return `viewed ${activity.document}`
    case "qa":
      return `asked a question about ${activity.document}`
    default:
      return `interacted with ${activity.document}`
  }
}

export function RecentActivity() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold">Recent Activity</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Latest actions in the system</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-start space-x-4">
              <div className="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                <span className="text-sm font-medium">{activity.user.name.charAt(0)}</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                  <span className="mr-1">{getActivityIcon(activity.type)}</span>
                  {getActivityDescription(activity)}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-500">{formatRelativeTime(activity.timestamp)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
