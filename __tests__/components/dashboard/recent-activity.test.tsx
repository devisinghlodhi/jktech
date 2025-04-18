import { render, screen } from "@testing-library/react"
import { RecentActivity } from "@/components/dashboard/recent-activity"

describe("RecentActivity Component", () => {
  it("renders the component title", () => {
    render(<RecentActivity />)

    expect(screen.getByText("Recent Activity")).toBeInTheDocument()
    expect(screen.getByText("Latest actions in the system")).toBeInTheDocument()
  })

  it("renders the activity list", () => {
    render(<RecentActivity />)

    expect(screen.getByText("John Doe")).toBeInTheDocument()
    expect(screen.getByText("Jane Smith")).toBeInTheDocument()
    expect(screen.getByText("Alex Johnson")).toBeInTheDocument()
    expect(screen.getByText("Sarah Williams")).toBeInTheDocument()
    expect(screen.getByText("Michael Brown")).toBeInTheDocument()
  })

  it("displays activity descriptions", () => {
    render(<RecentActivity />)

    expect(screen.getByText(/uploaded Q4 Financial Report/i)).toBeInTheDocument()
    expect(screen.getByText(/viewed Marketing Strategy 2024/i)).toBeInTheDocument()
    expect(screen.getByText(/downloaded Product Roadmap/i)).toBeInTheDocument()
    expect(screen.getByText(/asked a question about HR Policy Update/i)).toBeInTheDocument()
  })

  it("displays relative timestamps", () => {
    // Mock the Date.now() to return a fixed timestamp
    const originalDateNow = Date.now
    Date.now = jest.fn(() => new Date("2023-12-15T12:30:00Z").getTime())

    render(<RecentActivity />)

    // Reset Date.now
    Date.now = originalDateNow

    // Check for relative time strings (exact values will depend on the mock date)
    const timeElements = screen.getAllByText(/ago/i)
    expect(timeElements.length).toBeGreaterThan(0)
  })
})
