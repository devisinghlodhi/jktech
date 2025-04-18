import { render, screen } from "@testing-library/react"
import { FeatureSection } from "@/components/home/feature-section"

describe("FeatureSection Component", () => {
  it("renders the section title", () => {
    render(<FeatureSection />)

    expect(screen.getByText("Key Features")).toBeInTheDocument()
  })

  it("renders all feature cards", () => {
    render(<FeatureSection />)

    expect(screen.getByText("Document Management")).toBeInTheDocument()
    expect(screen.getByText("User Management")).toBeInTheDocument()
    expect(screen.getByText("Powerful Search")).toBeInTheDocument()
    expect(screen.getByText("Secure Access")).toBeInTheDocument()
    expect(screen.getByText("Intelligent Q&A")).toBeInTheDocument()
    expect(screen.getByText("Analytics")).toBeInTheDocument()
  })

  it("renders feature descriptions", () => {
    render(<FeatureSection />)

    expect(screen.getByText(/Upload, organize, and manage all your documents/i)).toBeInTheDocument()
    expect(screen.getByText(/Control access with role-based permissions/i)).toBeInTheDocument()
    expect(screen.getByText(/Find any document instantly/i)).toBeInTheDocument()
  })
})
