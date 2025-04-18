import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import UsersPage from "@/app/(application)/admin/users/page"
import { AuthProvider } from "@/context/auth-context"
import { useRouter } from "next/navigation"

// Mock the auth context
jest.mock("@/context/auth-context", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => children,
  useAuth: () => ({
    user: {
      id: "1",
      name: "Admin User",
      email: "admin@example.com",
      role: "admin",
    },
  }),
}))

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("UsersPage", () => {
  beforeEach(() => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it("renders the users management page", () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    expect(screen.getByText("User Management")).toBeInTheDocument()
    expect(screen.getByText("Manage users and their permissions")).toBeInTheDocument()
    expect(screen.getByText("Add User")).toBeInTheDocument()
  })

  it("renders the users table with headers", () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    expect(screen.getByText("User")).toBeInTheDocument()
    expect(screen.getByText("Email")).toBeInTheDocument()
    expect(screen.getByText("Role")).toBeInTheDocument()
    expect(screen.getByText("Status")).toBeInTheDocument()
    expect(screen.getByText("Last Active")).toBeInTheDocument()
    expect(screen.getByText("Actions")).toBeInTheDocument()
  })

  it("renders the user list", () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("jane.smith@example.com")).toBeInTheDocument()
    expect(screen.getByText("Alex Johnson")).toBeInTheDocument()
  })

  it("filters users based on search query", () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    // Type in the search box
    fireEvent.change(screen.getByPlaceholderText("Search users..."), {
      target: { value: "john" },
    })

    // Only the matching user should be visible
    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.queryByText("Jane Smith")).not.toBeInTheDocument()
    expect(screen.queryByText("Alex Johnson")).not.toBeInTheDocument()
  })

  it("opens the add user dialog", () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    // Click the Add User button
    fireEvent.click(screen.getByText("Add User"))

    // The dialog should be visible
    expect(screen.getByText("Add New User")).toBeInTheDocument()
    expect(screen.getByLabelText("Full Name")).toBeInTheDocument()
    expect(screen.getByLabelText("Email")).toBeInTheDocument()
    expect(screen.getByLabelText("Role")).toBeInTheDocument()
    expect(screen.getByLabelText("Status")).toBeInTheDocument()
  })

  it("adds a new user", async () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    // Click the Add User button
    fireEvent.click(screen.getByText("Add User"))

    // Fill in the form
    fireEvent.change(screen.getByLabelText("Full Name"), {
      target: { value: "New Test User" },
    })

    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "newuser@example.com" },
    })

    // Submit the form
    fireEvent.click(screen.getByText("Add User").closest("button")!)

    // The new user should be added to the list
    await waitFor(() => {
      expect(screen.getByText("New Test User")).toBeInTheDocument()
      expect(screen.getByText("newuser@example.com")).toBeInTheDocument()
    })
  })

  it("deletes a user", async () => {
    render(
      <AuthProvider>
        <UsersPage />
      </AuthProvider>,
    )

    // Open the dropdown menu for the first user
    const menuButtons = screen.getAllByRole("button", { name: "" })
    fireEvent.click(menuButtons[0]) // The first menu button

    // Click the Delete User option
    fireEvent.click(screen.getByText("Delete User"))

    // Confirm deletion
    fireEvent.click(screen.getByText("Delete User").closest("button")!)

    // The user should be removed from the list
    await waitFor(() => {
      expect(screen.queryByText("John Doe")).not.toBeInTheDocument()
    })
  })
})
