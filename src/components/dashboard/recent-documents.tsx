"use client"

import { FileText, Download, Eye, MoreHorizontal } from "lucide-react"
import { useState } from "react"

// Mock data for recent documents
const recentDocuments = [
  {
    id: "1",
    title: "Q4 Financial Report",
    category: "Finance",
    uploadedBy: "John Doe",
    uploadedAt: "2023-12-15T10:30:00Z",
    size: "2.4 MB",
    type: "PDF",
  },
  {
    id: "2",
    title: "Marketing Strategy 2024",
    category: "Marketing",
    uploadedBy: "Jane Smith",
    uploadedAt: "2023-12-14T14:45:00Z",
    size: "1.8 MB",
    type: "DOCX",
  },
  {
    id: "3",
    title: "Product Roadmap",
    category: "Product",
    uploadedBy: "Alex Johnson",
    uploadedAt: "2023-12-13T09:15:00Z",
    size: "3.2 MB",
    type: "PPTX",
  },
  {
    id: "4",
    title: "HR Policy Update",
    category: "Human Resources",
    uploadedBy: "Sarah Williams",
    uploadedAt: "2023-12-12T16:20:00Z",
    size: "1.1 MB",
    type: "PDF",
  },
  {
    id: "5",
    title: "Client Meeting Notes",
    category: "Sales",
    uploadedBy: "Michael Brown",
    uploadedAt: "2023-12-11T11:00:00Z",
    size: "0.8 MB",
    type: "DOCX",
  },
]

// Helper function to format date
function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(date)
}

export function RecentDocuments() {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 border-b border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-bold">Recent Documents</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">Recently uploaded and modified documents</p>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {recentDocuments.map((doc) => (
            <div
              key={doc.id}
              className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-blue-100 dark:bg-blue-900/30 p-2 rounded">
                  <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h4 className="font-medium">{doc.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                    <span className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">{doc.type}</span>
                    <span>{doc.size}</span>
                    <span>•</span>
                    <span>{formatDate(doc.uploadedAt)}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Eye className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
                <button className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors">
                  <Download className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </button>
                <div className="relative">
                  <button
                    className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                    onClick={() => toggleMenu(doc.id)}
                  >
                    <MoreHorizontal className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </button>

                  {openMenuId === doc.id && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 border border-gray-200 dark:border-gray-700 z-10">
                      <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-700">
                        <p className="text-sm font-medium">Actions</p>
                      </div>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        View Details
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Download
                      </button>
                      <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Share
                      </button>
                      <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                      <button className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        Delete
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
            View All Documents
          </button>
        </div>
      </div>
    </div>
  )
}
