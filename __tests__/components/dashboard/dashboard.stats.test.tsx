import { render, screen } from "@testing-library/react"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"

describe("DashboardStats Component", () => {
  it("renders all stat cards", () => {
    render(<DashboardStats />)

    expect(screen.getByText("Total Documents")).toBeInTheDocument()
    expect(screen.getByText("Active Users")).toBeInTheDocument()
    expect(screen.getByText("Recent Uploads")).toBeInTheDocument()
    expect(screen.getByText("Total Queries")).toBeInTheDocument()
  })

  it("displays the correct stat values", () => {
    render(<DashboardStats />)

    expect(screen.getByText("128")).toBeInTheDocument() // Total Documents
    expect(screen.getByText("24")).toBeInTheDocument() // Active Users
    expect(screen.getByText("17")).toBeInTheDocument() // Recent Uploads
    expect(screen.getByText("342")).toBeInTheDocument() // Total Queries
  })

  it("displays the trend information", () => {
    render(<DashboardStats />)

    expect(screen.getByText("+12% from last month")).toBeInTheDocument()
    expect(screen.getByText("+4 new users this week")).toBeInTheDocument()
    expect(screen.getByText("In the last 7 days")).toBeInTheDocument()
    expect(screen.getByText("+18% from last month")).toBeInTheDocument()
  })
})
