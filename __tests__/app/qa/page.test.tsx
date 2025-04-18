import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import QAPage from "@/app/(application)/qa/page"
import { AuthProvider } from "@/context/auth-context"

// Mock the auth context
jest.mock("@/context/auth-context", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: {
      id: "1",
      name: "Test User",
      email: "test@example.com",
      role: "user",
    },
  }),
}))

describe("QAPage", () => {
  it("renders the Q&A interface", () => {
    render(
      <AuthProvider>
        <QAPage />
      </AuthProvider>,
    )

    expect(screen.getByText("Document Q&A")).toBeInTheDocument()
    expect(screen.getByText("Ask a Question")).toBeInTheDocument()
    expect(screen.getByPlaceholderText("Ask anything about your documents...")).toBeInTheDocument()
    expect(screen.getByText("Get Answer")).toBeInTheDocument()
  })

  it("renders recent questions", () => {
    render(
      <AuthProvider>
        <QAPage />
      </AuthProvider>,
    )

    expect(screen.getByText("Recent Questions")).toBeInTheDocument()
    expect(screen.getByText("What is our company's policy on remote work?")).toBeInTheDocument()
    expect(screen.getByText("When is the next board meeting scheduled?")).toBeInTheDocument()
  })

  it("handles question submission", async () => {
    // Mock setTimeout to speed up the test
    jest.useFakeTimers()

    render(
      <AuthProvider>
        <QAPage />
      </AuthProvider>,
    )

    // Type a question
    fireEvent.change(screen.getByPlaceholderText("Ask anything about your documents..."), {
      target: { value: "What is our remote work policy?" },
    })

    // Submit the question
    fireEvent.click(screen.getByText("Get Answer"))

    // Should show loading state
    expect(screen.getByText("Processing...")).toBeInTheDocument()

    // Fast-forward timers
    jest.advanceTimersByTime(2000)

    // Should show the answer
    await waitFor(() => {
      expect(screen.getByText(/Based on the documents I've analyzed/)).toBeInTheDocument()
    })

    // Should show sources
    expect(screen.getByText("Sources")).toBeInTheDocument()
    expect(screen.getByText("HR Policy Handbook 2023")).toBeInTheDocument()

    // Restore timers
    jest.useRealTimers()
  })

  it("switches between tabs", () => {
    render(
      <AuthProvider>
        <QAPage />
      </AuthProvider>,
    )

    // Initially on Recent tab
    expect(screen.getByText("Recent Questions")).toBeInTheDocument()

    // Click on Saved tab
    fireEvent.click(screen.getByText("Saved"))

    // Should show Saved content
    expect(screen.getByText("No saved questions")).toBeInTheDocument()
  })

  it("fills the question input when clicking a recent question", () => {
    render(
      <AuthProvider>
        <QAPage />
      </AuthProvider>,
    )

    // Click on a recent question
    fireEvent.click(screen.getByText("What is our company's policy on remote work?"))

    // The question should be filled in the input
    expect(screen.getByPlaceholderText("Ask anything about your documents...")).toHaveValue(
      "What is our company's policy on remote work?",
    )
  })
})
