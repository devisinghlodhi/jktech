import type React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import Header from "@/components/layout/header"
import * as authContext from "@/context/auth-context"

// ✅ Mock the auth context with dynamic override capability
jest.mock("@/context/auth-context", () => {
  const mockUseAuth = jest.fn()
  return {
    __esModule: true,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: mockUseAuth,
  }
})

const mockUseAuth = authContext.useAuth as jest.Mock

describe("Header Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    mockUseAuth.mockReturnValue({
      user: null,
      logout: jest.fn(),
    })
  })

  it("renders the logo", () => {
    render(
      <authContext.AuthProvider>
        <Header />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("DocManager")).toBeInTheDocument()
  })

  it("renders navigation links", () => {
    render(
      <authContext.AuthProvider>
        <Header />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Dashboard")).toBeInTheDocument()
    expect(screen.getByText("Documents")).toBeInTheDocument()
    expect(screen.getByText("Q&A")).toBeInTheDocument()
  })

  it("renders login and signup buttons when user is not logged in", () => {
    render(
      <authContext.AuthProvider>
        <Header />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Login")).toBeInTheDocument()
    expect(screen.getByText("Sign Up")).toBeInTheDocument()
  })

  it("toggles mobile menu when menu button is clicked", () => {
    render(
      <authContext.AuthProvider>
        <Header />
      </authContext.AuthProvider>,
    )

    // Menu should not be open initially
    expect(screen.queryByRole("navigation")).not.toBeInTheDocument()

    // Click the mobile menu toggle button
    const menuButton = screen.getByRole("button", { name: /toggle menu/i })
    fireEvent.click(menuButton)

    // Now, the navigation should be visible
    expect(screen.getByRole("navigation")).toBeInTheDocument()
  })
})
