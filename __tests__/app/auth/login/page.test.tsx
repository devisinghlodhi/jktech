import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import LoginPage from "@/app/login/page"
import * as authContext from "@/context/auth-context" // Import all to access useAuth

// 👇 Mock the auth context and export a mockable useAuth
jest.mock("@/context/auth-context", () => {
  const mockUseAuth = jest.fn()
  return {
    __esModule: true, // Ensures ES module compatibility
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: mockUseAuth,
  }
})

// 👇 Access mocked useAuth for test control
const mockUseAuth = authContext.useAuth as jest.Mock

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the login form", () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      loading: false,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <LoginPage />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Login/i })).toBeInTheDocument()
    expect(screen.getByText(/Don't have an account/i)).toBeInTheDocument()
    expect(screen.getByText(/Sign up/i)).toBeInTheDocument()
  })

  it("handles form submission", async () => {
    const mockLogin = jest.fn()
    mockUseAuth.mockReturnValue({
      login: mockLogin,
      loading: false,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <LoginPage />
      </authContext.AuthProvider>,
    )

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    })

    fireEvent.change(screen.getByLabelText(/Password/i), {
      target: { value: "password123" },
    })

    fireEvent.click(screen.getByRole("button", { name: /Login/i }))

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith("test@example.com", "password123")
    })
  })

  it("displays loading state", () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      loading: true,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <LoginPage />
      </authContext.AuthProvider>,
    )

    const button = screen.getByRole("button", { name: /Logging in/i })
    expect(button).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it("displays error message", () => {
    mockUseAuth.mockReturnValue({
      login: jest.fn(),
      loading: false,
      error: "Invalid credentials",
    })

    render(
      <authContext.AuthProvider>
        <LoginPage />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
  })
})
