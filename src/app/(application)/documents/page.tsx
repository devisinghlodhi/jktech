"use client"

import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import Link from "next/link"
import { FileText, Upload, Search, Filter, Download, Eye, Trash2, MoreHorizontal, Share2 } from "lucide-react"

// Mock data for documents
const mockDocuments = [
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
  {
    id: "6",
    title: "Project Timeline",
    category: "Project Management",
    uploadedBy: "Emily Davis",
    uploadedAt: "2023-12-10T13:25:00Z",
    size: "1.5 MB",
    type: "XLSX",
  },
  {
    id: "7",
    title: "Customer Feedback Analysis",
    category: "Customer Success",
    uploadedBy: "David Wilson",
    uploadedAt: "2023-12-09T15:10:00Z",
    size: "2.1 MB",
    type: "PDF",
  },
  {
    id: "8",
    title: "Technical Documentation",
    category: "Engineering",
    uploadedBy: "Lisa Taylor",
    uploadedAt: "2023-12-08T09:45:00Z",
    size: "4.3 MB",
    type: "PDF",
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

export default function DocumentsPage() {
  const { user } = useAuth()
  const [searchQuery, setSearchQuery] = useState("")
  const [documents, setDocuments] = useState(mockDocuments)
  const [openMenuId, setOpenMenuId] = useState<string | null>(null)

  // Filter documents based on search query
  const filteredDocuments = documents.filter(
    (doc) =>
      doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.uploadedBy.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Handle document deletion
  const handleDelete = (id: string) => {
    setDocuments(documents.filter((doc) => doc.id !== id))
    setOpenMenuId(null)
  }

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">Documents</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage and organize all your documents</p>
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

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-8">
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500 dark:text-gray-400" />
              <input
                placeholder="Search documents..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </button>
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Size
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Uploaded By
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <FileText className="mr-2 h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span className="font-medium">{doc.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">{doc.type}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.size}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{doc.uploadedBy}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{formatDate(doc.uploadedAt)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
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
                                <Eye className="inline-block mr-2 h-4 w-4" />
                                View Details
                              </button>
                              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Download className="inline-block mr-2 h-4 w-4" />
                                Download
                              </button>
                              <button className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                                <Share2 className="inline-block mr-2 h-4 w-4" />
                                Share
                              </button>
                              <div className="border-t border-gray-200 dark:border-gray-700 my-1"></div>
                              <button
                                onClick={() => handleDelete(doc.id)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                              >
                                <Trash2 className="inline-block mr-2 h-4 w-4" />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="px-6 py-16 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-500 dark:text-gray-400">
                      <FileText className="h-12 w-12 mb-2" />
                      <h3 className="text-lg font-medium">No documents found</h3>
                      <p className="mb-4">Try adjusting your search or filters</p>
                      <Link
                        href="/documents/upload"
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors"
                      >
                        Upload Document
                      </Link>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
