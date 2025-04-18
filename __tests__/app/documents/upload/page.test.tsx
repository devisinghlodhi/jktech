import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UploadDocumentPage from "@/app/(application)/documents/upload/page"
import { AuthProvider } from "@/context/auth-context"
import { useRouter } from "next/navigation"

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

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("UploadDocumentPage", () => {
  beforeEach(() => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it("renders the upload form", () => {
    render(
      <AuthProvider>
        <UploadDocumentPage />
      </AuthProvider>,
    )

    expect(screen.getByText("Upload Document")).toBeInTheDocument()
    expect(screen.getByText("Document Information")).toBeInTheDocument()
    expect(screen.getByLabelText("Document Title")).toBeInTheDocument()
    expect(screen.getByLabelText("Category")).toBeInTheDocument()
    expect(screen.getByLabelText("Description (Optional)")).toBeInTheDocument()
    expect(screen.getByText("Drag and drop your file here")).toBeInTheDocument()
    expect(screen.getByText("Select File")).toBeInTheDocument()
  })

  it("validates required fields", async () => {
    render(
      <AuthProvider>
        <UploadDocumentPage />
      </AuthProvider>,
    )

    // Submit the form without filling required fields
    fireEvent.click(screen.getByText("Upload Document"))

    // Should show validation error
    await waitFor(() => {
      expect(screen.getByText("Please enter a document title")).toBeInTheDocument()
    })

    // Fill in title but not category
    fireEvent.change(screen.getByLabelText("Document Title"), {
      target: { value: "Test Document" },
    })

    fireEvent.click(screen.getByText("Upload Document"))

    // Should show validation error for category
    await waitFor(() => {
      expect(screen.getByText("Please select a category")).toBeInTheDocument()
    })
  })

  it("handles file upload", async () => {
    render(
      <AuthProvider>
        <UploadDocumentPage />
      </AuthProvider>,
    )

    // Create a mock file
    const file = new File(["dummy content"], "test-document.pdf", { type: "application/pdf" })

    // Get the hidden file input
    const fileInput = screen.getByLabelText(/Document File/i).nextElementSibling?.querySelector('input[type="file"]')

    // Simulate file selection
    if (fileInput) {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      })
    }

    // File info should be displayed
    await waitFor(() => {
      expect(screen.getByText("test-document.pdf")).toBeInTheDocument()
    })
  })

  it("submits the form successfully", async () => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AuthProvider>
        <UploadDocumentPage />
      </AuthProvider>,
    )

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Document Title"), {
      target: { value: "Test Document" },
    })

    // Select a category
    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "1" }, // Finance
    })

    // Create a mock file
    const file = new File(["dummy content"], "test-document.pdf", { type: "application/pdf" })

    // Get the hidden file input
    const fileInput = screen.getByLabelText(/Document File/i).nextElementSibling?.querySelector('input[type="file"]')

    // Simulate file selection
    if (fileInput) {
      fireEvent.change(fileInput, {
        target: { files: [file] },
      })
    }

    // Submit the form
    fireEvent.click(screen.getByText("Upload Document"))

    // Should show loading state
    await waitFor(() => {
      expect(screen.getByText("Uploading...")).toBeInTheDocument()
    })

    // Should show success message
    await waitFor(() => {
      expect(screen.getByText("Document uploaded successfully! Redirecting...")).toBeInTheDocument()
    })

    // Should redirect to documents page
    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith("/documents")
    })
  })
})
