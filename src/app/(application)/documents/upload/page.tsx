"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useAuth } from "@/context/auth-context"
import { Upload, File, X, CheckCircle2 } from "lucide-react"
import { useRouter } from "next/navigation"

// Mock categories
const categories = [
  { id: "1", name: "Finance" },
  { id: "2", name: "Marketing" },
  { id: "3", name: "Product" },
  { id: "4", name: "Human Resources" },
  { id: "5", name: "Sales" },
  { id: "6", name: "Engineering" },
  { id: "7", name: "Legal" },
  { id: "8", name: "Operations" },
]

export default function UploadDocumentPage() {
  const { user } = useAuth()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [description, setDescription] = useState("")
  const [file, setFile] = useState<File | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0])
      setError(null)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0])
      setError(null)
    }
  }

  const handleRemoveFile = () => {
    setFile(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!title.trim()) {
      setError("Please enter a document title")
      return
    }

    if (!category) {
      setError("Please select a category")
      return
    }

    if (!file) {
      setError("Please upload a file")
      return
    }

    setError(null)
    setIsUploading(true)

    try {
      // In a real app, you would upload the file to your backend
      // This is a mock implementation with a timeout to simulate upload
      await new Promise((resolve) => setTimeout(resolve, 2000))

      setUploadSuccess(true)

      // Redirect after a short delay
      setTimeout(() => {
        router.push("/documents")
      }, 1500)
    } catch (error) {
      setError("An error occurred while uploading the document")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upload Document</h1>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <form onSubmit={handleSubmit}>
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <h2 className="text-xl font-bold">Document Information</h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Provide details about the document you're uploading
              </p>
            </div>

            <div className="p-6 space-y-6">
              {error && (
                <div className="p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-md">
                  {error}
                </div>
              )}

              {uploadSuccess && (
                <div className="p-3 bg-green-100 dark:bg-green-900/20 border border-green-200 dark:border-green-800 text-green-600 dark:text-green-400 rounded-md flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Document uploaded successfully! Redirecting...
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="title" className="block text-sm font-medium">
                  Document Title
                </label>
                <input
                  id="title"
                  placeholder="Enter document title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  disabled={isUploading || uploadSuccess}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="category" className="block text-sm font-medium">
                  Category
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  disabled={isUploading || uploadSuccess}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label htmlFor="description" className="block text-sm font-medium">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  placeholder="Enter a brief description of the document"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  disabled={isUploading || uploadSuccess}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium">Document File</label>
                <div
                  className={`border-2 border-dashed rounded-lg p-6 transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                      : file
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded">
                          <File className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {(file.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-colors"
                        onClick={handleRemoveFile}
                        disabled={isUploading || uploadSuccess}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center">
                      <Upload className="h-10 w-10 text-gray-500 dark:text-gray-400 mb-2" />
                      <h3 className="font-medium text-lg">Drag and drop your file here</h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                        Supports PDF, DOCX, XLSX, PPTX, TXT (max 10MB)
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading || uploadSuccess}
                      >
                        Select File
                      </button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        className="hidden"
                        accept=".pdf,.docx,.xlsx,.pptx,.txt"
                        onChange={handleFileChange}
                        disabled={isUploading || uploadSuccess}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <button
                type="button"
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                onClick={() => router.push("/documents")}
                disabled={isUploading || uploadSuccess}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                disabled={isUploading || uploadSuccess || !file}
              >
                {isUploading ? "Uploading..." : "Upload Document"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
