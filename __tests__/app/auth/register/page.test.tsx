import type React from "react"
import { render, screen, fireEvent, waitFor } from "@testing-library/react"
import SignupPage from "@/app/register/page"
import * as authContext from "@/context/auth-context"

// 👇 Properly mock the auth context and make useAuth controllable
jest.mock("@/context/auth-context", () => {
  const mockUseAuth = jest.fn()
  return {
    __esModule: true,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: mockUseAuth,
  }
})

const mockUseAuth = authContext.useAuth as jest.Mock

describe("SignupPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders the signup form", () => {
    mockUseAuth.mockReturnValue({
      signup: jest.fn(),
      loading: false,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <SignupPage />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Create an account")).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/^Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/I agree to the/i)).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Create account/i })).toBeInTheDocument()
    expect(screen.getByText(/Already have an account/i)).toBeInTheDocument()
  })

  it("validates passwords match", async () => {
    mockUseAuth.mockReturnValue({
      signup: jest.fn(),
      loading: false,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <SignupPage />
      </authContext.AuthProvider>,
    )

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Test User" },
    })

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    })

    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "password123" },
    })

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password456" },
    })

    fireEvent.click(screen.getByLabelText(/I agree to the/i))

    fireEvent.click(screen.getByRole("button", { name: /Create account/i }))

    await waitFor(() => {
      expect(screen.getByText("Passwords do not match")).toBeInTheDocument()
    })
  })

  it("validates terms agreement", async () => {
    mockUseAuth.mockReturnValue({
      signup: jest.fn(),
      loading: false,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <SignupPage />
      </authContext.AuthProvider>,
    )

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Test User" },
    })

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    })

    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "password123" },
    })

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    })

    // Terms not agreed
    fireEvent.click(screen.getByRole("button", { name: /Create account/i }))

    await waitFor(() => {
      expect(
        screen.getByText("You must agree to the terms and conditions"),
      ).toBeInTheDocument()
    })
  })

  it("handles successful form submission", async () => {
    const mockSignup = jest.fn()
    mockUseAuth.mockReturnValue({
      signup: mockSignup,
      loading: false,
      error: null,
    })

    render(
      <authContext.AuthProvider>
        <SignupPage />
      </authContext.AuthProvider>,
    )

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Test User" },
    })

    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "test@example.com" },
    })

    fireEvent.change(screen.getByLabelText(/^Password/i), {
      target: { value: "password123" },
    })

    fireEvent.change(screen.getByLabelText(/Confirm Password/i), {
      target: { value: "password123" },
    })

    fireEvent.click(screen.getByLabelText(/I agree to the/i))

    fireEvent.click(screen.getByRole("button", { name: /Create account/i }))

    await waitFor(() => {
      expect(mockSignup).toHaveBeenCalledWith("Test User", "test@example.com", "password123")
    })
  })
})
