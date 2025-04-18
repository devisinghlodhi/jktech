import { render, screen, fireEvent } from "@testing-library/react"
import { RecentDocuments } from "@/components/dashboard/recent-documents"

describe("RecentDocuments Component", () => {
  it("renders the component title", () => {
    render(<RecentDocuments />)

    expect(screen.getByText("Recent Documents")).toBeInTheDocument()
    expect(screen.getByText("Recently uploaded and modified documents")).toBeInTheDocument()
  })

  it("renders the document list", () => {
    render(<RecentDocuments />)

    expect(screen.getByText("Q4 Financial Report")).toBeInTheDocument()
    expect(screen.getByText("Marketing Strategy 2024")).toBeInTheDocument()
    expect(screen.getByText("Product Roadmap")).toBeInTheDocument()
    expect(screen.getByText("HR Policy Update")).toBeInTheDocument()
    expect(screen.getByText("Client Meeting Notes")).toBeInTheDocument()
  })

  it("displays document metadata", () => {
    render(<RecentDocuments />)

    expect(screen.getByText("PDF")).toBeInTheDocument()
    expect(screen.getByText("DOCX")).toBeInTheDocument()
    expect(screen.getByText("PPTX")).toBeInTheDocument()
    expect(screen.getByText("2.4 MB")).toBeInTheDocument()
  })

  it("toggles the dropdown menu when clicking the menu button", () => {
    render(<RecentDocuments />)

    // Initially, dropdown content should not be visible
    expect(screen.queryByText("View Details")).not.toBeInTheDocument()

    // Click the first menu button
    const menuButtons = screen.getAllByRole("button", { name: "" })
    fireEvent.click(menuButtons[2]) // The third button should be the menu button

    // Dropdown content should now be visible
    expect(screen.getByText("View Details")).toBeInTheDocument()
    expect(screen.getByText("Download")).toBeInTheDocument()
    expect(screen.getByText("Share")).toBeInTheDocument()
    expect(screen.getByText("Delete")).toBeInTheDocument()
  })
})
