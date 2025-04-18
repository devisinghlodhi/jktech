import type React from "react"
import { render, screen, waitFor } from "@testing-library/react"
import DashboardPage from "@/app/(application)/dashboard/page"
import * as authContext from "@/context/auth-context"
import { useRouter } from "next/navigation"

// ✅ Mock router
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

// ✅ Mock dashboard components
jest.mock("@/components/dashboard/dashboard-stats", () => ({
  DashboardStats: () => <div data-testid="dashboard-stats">Dashboard Stats</div>,
}))
jest.mock("@/components/dashboard/recent-documents", () => ({
  RecentDocuments: () => <div data-testid="recent-documents">Recent Documents</div>,
}))
jest.mock("@/components/dashboard/recent-activity", () => ({
  RecentActivity: () => <div data-testid="recent-activity">Recent Activity</div>,
}))

// ✅ Initial static mock setup for useAuth (will override dynamically per test)
jest.mock("@/context/auth-context", () => {
  const mockUseAuth = jest.fn()
  return {
    __esModule: true,
    AuthProvider: ({ children }: { children: React.ReactNode }) => children,
    useAuth: mockUseAuth,
  }
})

const mockUseAuth = authContext.useAuth as jest.Mock
const mockPush = jest.fn()

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.clearAllMocks()
    ;(useRouter as jest.Mock).mockReturnValue({ push: mockPush })
  })

  it("renders the dashboard for authenticated users", () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: "1",
        name: "Test User",
        email: "test@example.com",
        role: "user",
      },
      loading: false,
    })

    render(
      <authContext.AuthProvider>
        <DashboardPage />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Welcome back, Test User")).toBeInTheDocument()
    expect(screen.getByTestId("dashboard-stats")).toBeInTheDocument()
    expect(screen.getByTestId("recent-documents")).toBeInTheDocument()
    expect(screen.getByTestId("recent-activity")).toBeInTheDocument()
    expect(screen.getByText("Document Management")).toBeInTheDocument()
    expect(screen.getByText("Q&A System")).toBeInTheDocument()
  })

  it("redirects unauthenticated users to login page", async () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: false,
    })

    render(
      <authContext.AuthProvider>
        <DashboardPage />
      </authContext.AuthProvider>,
    )

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/auth/login")
    })
  })

  it("shows loading state while checking authentication", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      loading: true,
    })

    render(
      <authContext.AuthProvider>
        <DashboardPage />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Loading...")).toBeInTheDocument()
  })

  it("renders admin controls for admin users", () => {
    mockUseAuth.mockReturnValue({
      user: {
        id: "1",
        name: "Admin User",
        email: "admin@example.com",
        role: "admin",
      },
      loading: false,
    })

    render(
      <authContext.AuthProvider>
        <DashboardPage />
      </authContext.AuthProvider>,
    )

    expect(screen.getByText("Admin Controls")).toBeInTheDocument()
    expect(screen.getByText("Manage Users")).toBeInTheDocument()
    expect(screen.getByText("System Settings")).toBeInTheDocument()
    expect(screen.getByText("View Logs")).toBeInTheDocument()
  })
})
