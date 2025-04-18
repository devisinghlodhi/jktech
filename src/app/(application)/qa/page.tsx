"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/context/auth-context"
import { MessageSquare, Search, FileText, ThumbsUp, ThumbsDown, Bookmark, Copy, RotateCw } from "lucide-react"

export default function QAPage() {
  const { user } = useAuth()
  const [question, setQuestion] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState<string | null>(null)
  const [sources, setSources] = useState<any[] | null>(null)
  const [activeTab, setActiveTab] = useState("recent")
  const [recentQuestions, setRecentQuestions] = useState([
    "What is our company's policy on remote work?",
    "When is the next board meeting scheduled?",
    "What were the Q4 financial results?",
    "Who is responsible for the marketing campaign?",
    "What are the key features of our new product?",
  ])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!question.trim()) return

    setIsLoading(true)
    setAnswer(null)
    setSources(null)

    try {
      // In a real app, you would call your API
      // This is a mock implementation with a timeout to simulate processing
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Mock answer
      setAnswer(
        "Based on the documents I've analyzed, our company's remote work policy allows employees to work remotely up to 3 days per week, with mandatory in-office days on Tuesdays and Thursdays for team meetings and collaboration. This policy was updated in January 2023 and requires manager approval for any exceptions. Employees must ensure they have a secure internet connection and appropriate workspace when working remotely.",
      )

      // Mock sources
      setSources([
        {
          id: "1",
          title: "HR Policy Handbook 2023",
          excerpt:
            "...employees may work remotely up to 3 days per week, with mandatory in-office days on Tuesdays and Thursdays...",
          relevance: 0.92,
        },
        {
          id: "2",
          title: "Remote Work Guidelines",
          excerpt: "...requires manager approval for any exceptions to the standard remote work schedule...",
          relevance: 0.85,
        },
        {
          id: "3",
          title: "IT Security Protocol",
          excerpt: "...employees must ensure they have a secure internet connection when working remotely...",
          relevance: 0.78,
        },
      ])

      // Add to recent questions if not already there
      if (!recentQuestions.includes(question)) {
        setRecentQuestions((prev) => [question, ...prev].slice(0, 5))
      }
    } catch (error) {
      console.error("Error processing question:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">Document Q&A</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">
          Ask questions about your documents and get accurate answers with relevant sources
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-bold">Ask a Question</h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Our AI will search through your documents to find the most relevant answer
                </p>
              </div>
              <div className="p-6">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="relative">
                    <textarea
                      placeholder="Ask anything about your documents..."
                      value={question}
                      onChange={(e) => setQuestion(e.target.value)}
                      className="w-full min-h-[100px] px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white resize-none pr-10"
                    />
                    <button
                      type="submit"
                      className="absolute bottom-2 right-2 p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                      disabled={!question.trim() || isLoading}
                    >
                      <MessageSquare className="h-4 w-4" />
                    </button>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center"
                    disabled={!question.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Search className="mr-2 h-4 w-4" />
                        Get Answer
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {answer && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mb-6">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">Answer</h2>
                    <div className="flex space-x-2">
                      <button className="p-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                        <Copy className="h-4 w-4" />
                      </button>
                      <button className="p-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors">
                        <Bookmark className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex space-x-4">
                    <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center text-white">
                      AI
                    </div>
                    <div className="space-y-4">
                      <p className="text-sm">{answer}</p>
                      <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm transition-colors">
                          <ThumbsUp className="mr-2 h-3 w-3" />
                          Helpful
                        </button>
                        <button className="inline-flex items-center px-3 py-1 border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md text-sm transition-colors">
                          <ThumbsDown className="mr-2 h-3 w-3" />
                          Not Helpful
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {sources && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <h2 className="text-xl font-bold">Sources</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Documents used to generate the answer</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {sources.map((source) => (
                      <div key={source.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                        <div className="flex justify-between items-start mb-2">
                          <div className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-gray-500 dark:text-gray-400" />
                            <h3 className="font-medium">{source.title}</h3>
                          </div>
                          <span className="px-2 py-1 text-xs bg-gray-100 dark:bg-gray-700 rounded-full">
                            {Math.round(source.relevance * 100)}% match
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">"{source.excerpt}"</p>
                        <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">
                          View Document
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div>
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm ${
                    activeTab === "recent"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                  onClick={() => setActiveTab("recent")}
                >
                  Recent
                </button>
                <button
                  className={`flex-1 py-3 text-center font-medium text-sm ${
                    activeTab === "saved"
                      ? "text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                  onClick={() => setActiveTab("saved")}
                >
                  Saved
                </button>
              </div>

              {activeTab === "recent" ? (
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-3">Recent Questions</h3>
                  <div className="space-y-2">
                    {recentQuestions.map((q, index) => (
                      <button
                        key={index}
                        className="w-full text-left p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors flex items-start"
                        onClick={() => setQuestion(q)}
                      >
                        <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0 text-gray-500 dark:text-gray-400" />
                        <span className="truncate text-sm">{q}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex flex-col items-center justify-center py-8 text-center text-gray-500 dark:text-gray-400">
                    <Bookmark className="h-10 w-10 mb-2" />
                    <h3 className="font-medium text-lg">No saved questions</h3>
                    <p className="text-sm">Questions you save will appear here for quick access</p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md mt-6">
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold">Tips</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      1
                    </span>
                    <span>Be specific in your questions for more accurate answers</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      2
                    </span>
                    <span>Include relevant context like dates or document names</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      3
                    </span>
                    <span>Save important questions for quick reference later</span>
                  </li>
                  <li className="flex items-start">
                    <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full w-5 h-5 flex items-center justify-center mr-2 flex-shrink-0">
                      4
                    </span>
                    <span>Provide feedback to help improve answer quality</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
