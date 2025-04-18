"use client"

import { render, screen, act, waitFor } from "@testing-library/react"
import { AuthProvider, useAuth } from "@/context/auth-context"
import { useRouter } from "next/navigation"
import { jest, describe, beforeEach, it, expect } from "@jest/globals"

// Mock the router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// Test component that uses the auth context
const TestComponent = () => {
  const { user, login, signup, logout, loading, error } = useAuth()

  return (
    <div>
      <div data-testid="loading">{loading.toString()}</div>
      <div data-testid="error">{error || "no-error"}</div>
      <div data-testid="user">{user ? JSON.stringify(user) : "no-user"}</div>
      <button onClick={() => login("test@example.com", "password123")}>Login</button>
      <button onClick={() => signup("Test User", "test@example.com", "password123")}>Signup</button>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

describe("AuthContext", () => {
  beforeEach(() => {
    // Clear localStorage before each test
    window.localStorage.clear()

    // Reset router mock
    const mockRouter = {
      push: jest.fn(),
      replace: jest.fn(),
      prefetch: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it("provides initial auth state", async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // Initially loading should be true
    expect(screen.getByTestId("loading").textContent).toBe("true")

    // Wait for initial auth check to complete
    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false")
    })

    // No user should be logged in initially
    expect(screen.getByTestId("user").textContent).toBe("no-user")
    expect(screen.getByTestId("error").textContent).toBe("no-error")
  })

  it("handles login with admin credentials", async () => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { getByText } = render(
      <AuthProvider>
        <div>
          <button onClick={() => useAuth().login("admin@gmail.com", "Admin@123")}>Login as Admin</button>
        </div>
      </AuthProvider>,
    )

    // Wait for initial auth check to complete
    await waitFor(() => {
      expect(screen.getByText("Login as Admin")).toBeInTheDocument()
    })

    // Perform admin login
    act(() => {
      getByText("Login as Admin").click()
    })

    // Wait for login to complete
    await waitFor(() => {
      // Should redirect to dashboard after login
      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard")
    })

    // Check localStorage for user data
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    expect(storedUser.role).toBe("admin")
  })

  it("handles login with user credentials from localStorage", async () => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    // Setup a mock user in localStorage
    const mockUsers = [
      {
        id: "123",
        name: "Test User",
        email: "test@example.com",
        role: "user",
        password: "password123",
      },
    ]
    localStorage.setItem("users", JSON.stringify(mockUsers))

    const { getByText } = render(
      <AuthProvider>
        <div>
          <button onClick={() => useAuth().login("test@example.com", "password123")}>Login as User</button>
        </div>
      </AuthProvider>,
    )

    // Wait for initial auth check to complete
    await waitFor(() => {
      expect(screen.getByText("Login as User")).toBeInTheDocument()
    })

    // Perform user login
    act(() => {
      getByText("Login as User").click()
    })

    // Wait for login to complete
    await waitFor(() => {
      // Should redirect to dashboard after login
      expect(mockRouter.push).toHaveBeenCalledWith("/dashboard")
    })

    // Check localStorage for user data
    const storedUser = JSON.parse(localStorage.getItem("user") || "{}")
    expect(storedUser.email).toBe("test@example.com")
    expect(storedUser.role).toBe("user")
  })

  it("handles login with invalid credentials", async () => {
    const { getByText, getByTestId } = render(
      <AuthProvider>
        <div>
          <div data-testid="error-message"></div>
          <button
            onClick={() => {
              useAuth()
                .login("invalid@example.com", "wrongpassword")
                .catch((err) => {
                  document.getElementById("error-message")!.textContent = err.message
                })
            }}
          >
            Invalid Login
          </button>
        </div>
      </AuthProvider>,
    )

    // Wait for initial auth check to complete
    await waitFor(() => {
      expect(screen.getByText("Invalid Login")).toBeInTheDocument()
    })

    // Perform invalid login
    act(() => {
      getByText("Invalid Login").click()
    })

    // Should show error message
    await waitFor(
      () => {
        const context = useAuth()
        expect(context.error).toBe("Invalid credentials")
      },
      { timeout: 3000 },
    )
  })

  it("handles signup for new user", async () => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    const { getByText } = render(
      <AuthProvider>
        <div>
          <button onClick={() => useAuth().signup("New User", "new@example.com", "newpassword")}>Sign Up</button>
        </div>
      </AuthProvider>,
    )

    // Wait for initial auth check to complete
    await waitFor(() => {
      expect(screen.getByText("Sign Up")).toBeInTheDocument()
    })

    // Perform signup
    act(() => {
      getByText("Sign Up").click()
    })

    // Wait for signup to complete
    await waitFor(() => {
      // Should redirect to login page after signup
      expect(mockRouter.push).toHaveBeenCalledWith("/login")
    })

    // Check localStorage for users data
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    expect(storedUsers.length).toBe(1)
    expect(storedUsers[0].email).toBe("new@example.com")
    expect(storedUsers[0].name).toBe("New User")
    expect(storedUsers[0].password).toBe("newpassword")
  })

  it("handles signup for existing user (update)", async () => {
    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    // Setup an existing user
    const existingUsers = [
      {
        id: "123",
        name: "Existing User",
        email: "existing@example.com",
        role: "user",
        password: "oldpassword",
      },
    ]
    localStorage.setItem("users", JSON.stringify(existingUsers))

    const { getByText } = render(
      <AuthProvider>
        <div>
          <button onClick={() => useAuth().signup("Updated User", "existing@example.com", "newpassword")}>
            Update User
          </button>
        </div>
      </AuthProvider>,
    )

    // Wait for initial auth check to complete
    await waitFor(() => {
      expect(screen.getByText("Update User")).toBeInTheDocument()
    })

    // Perform update
    act(() => {
      getByText("Update User").click()
    })

    // Wait for signup/update to complete
    await waitFor(() => {
      // Should redirect to login page after signup
      expect(mockRouter.push).toHaveBeenCalledWith("/login")
    })

    // Check localStorage for updated user data
    const storedUsers = JSON.parse(localStorage.getItem("users") || "[]")
    expect(storedUsers.length).toBe(1)
    expect(storedUsers[0].email).toBe("existing@example.com")
    expect(storedUsers[0].name).toBe("Updated User")
    expect(storedUsers[0].password).toBe("newpassword")
  })

  it("handles logout", async () => {
    // Mock a logged in user
    window.localStorage.setItem(
      "user",
      JSON.stringify({
        id: "1",
        name: "Test User",
        email: "test@example.com",
        role: "user",
      }),
    )

    const mockRouter = {
      push: jest.fn(),
    }
    ;(useRouter as jest.Mock).mockReturnValue(mockRouter)

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    )

    // Wait for initial auth check to complete and user to be loaded
    await waitFor(() => {
      expect(screen.getByTestId("loading").textContent).toBe("false")
      expect(screen.getByTestId("user").textContent).not.toBe("no-user")
    })

    // Perform logout
    act(() => {
      screen.getByText("Logout").click()
    })

    // User should be logged out
    expect(screen.getByTestId("user").textContent).toBe("no-user")

    // Should redirect to login page after logout
    expect(mockRouter.push).toHaveBeenCalledWith("/login")

    // localStorage should be cleared
    expect(window.localStorage.getItem("user")).toBeNull()
  })
})
