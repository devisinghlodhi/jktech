import { render, screen } from "@testing-library/react"
import { HeroSection } from "@/components/home/hero-section"

describe("HeroSection Component", () => {
  it("renders the heading", () => {
    render(<HeroSection />)

    expect(screen.getByText("Manage Your Documents with Ease")).toBeInTheDocument()
  })

  it("renders the description", () => {
    render(<HeroSection />)

    expect(screen.getByText(/comprehensive document management system/i)).toBeInTheDocument()
  })

  it("renders the call-to-action buttons", () => {
    render(<HeroSection />)

    expect(screen.getByText("Get Started")).toBeInTheDocument()
    expect(screen.getByText("Learn More")).toBeInTheDocument()
  })

  it("renders the hero image", () => {
    render(<HeroSection />)

    const heroImage = screen.getByAltText("Document Management System")
    expect(heroImage).toBeInTheDocument()
  })
})
