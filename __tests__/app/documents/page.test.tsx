import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import DocumentsPage from "@/app/(application)/documents/page"
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

describe("DocumentsPage", () => {
  it("renders the documents page", () => {
    render(
      <AuthProvider>
        <DocumentsPage />
      </AuthProvider>,
    )

    expect(screen.getByText("Documents")).toBeInTheDocument()
    expect(screen.getByText("Manage and organize all your documents")).toBeInTheDocument()
    expect(screen.getByText("Upload Document")).toBeInTheDocument()
  })

  it("renders the document table with headers", () => {
    render(
      <AuthProvider>
        <DocumentsPage />
      </AuthProvider>,
    )

    expect(screen.getByText("Name")).toBeInTheDocument()
    expect(screen.getByText("Category")).toBeInTheDocument()
    expect(screen.getByText("Type")).toBeInTheDocument()
    expect(screen.getByText("Size")).toBeInTheDocument()
    expect(screen.getByText("Uploaded By")).toBeInTheDocument()
    expect(screen.getByText("Date")).toBeInTheDocument()
    expect(screen.getByText("Actions")).toBeInTheDocument()
  })

  it("renders the document list", () => {
    render(
      <AuthProvider>
        <DocumentsPage />
      </AuthProvider>,
    )

    expect(screen.getByText("Q4 Financial Report")).toBeInTheDocument()
    expect(screen.getByText("Marketing Strategy 2024")).toBeInTheDocument()
    expect(screen.getByText("Product Roadmap")).toBeInTheDocument()
    expect(screen.getByText("HR Policy Update")).toBeInTheDocument()
  })

  it("filters documents based on search query", () => {
    render(
      <AuthProvider>
        <DocumentsPage />
      </AuthProvider>,
    )

    // Type in the search box
    fireEvent.change(screen.getByPlaceholderText("Search documents..."), {
      target: { value: "financial" },
    })

    // Only the matching document should be visible
    expect(screen.getByText("Q4 Financial Report")).toBeInTheDocument()
    expect(screen.queryByText("Marketing Strategy 2024")).not.toBeInTheDocument()
    expect(screen.queryByText("Product Roadmap")).not.toBeInTheDocument()
  })

  it("deletes a document when delete is clicked", async () => {
    render(
      <AuthProvider>
        <DocumentsPage />
      </AuthProvider>,
    )

    // Open the dropdown menu for the first document
    const menuButtons = screen.getAllByRole("button", { name: "" })
    fireEvent.click(menuButtons[2]) // The third button should be the menu button

    // Click the delete button
    fireEvent.click(screen.getByText("Delete"))

    // The document should be removed from the list
    await waitFor(() => {
      expect(screen.queryByText("Q4 Financial Report")).not.toBeInTheDocument()
    })
  })
})
