import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PetCard from "../components/PetCard";

const mockPet = {
  id: 1,
  name: "Golden Retriever",
  breed: "Golden Retriever",
  age: "2 years",
  price: 25000,
  tag: "Popular",
  image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=500&h=360&fit=crop",
  description: "Friendly and loyal.",
};

// UNIT TEST 1 — PetCard renders pet info correctly
describe("PetCard", () => {
  it("renders pet name and price correctly", () => {
    render(<PetCard pet={mockPet} onAdd={vi.fn()} onView={vi.fn()} />);
    expect(screen.getByText("Golden Retriever")).toBeInTheDocument();
    expect(screen.getByText(/25,000/)).toBeInTheDocument();
  });

  // UNIT TEST 2 — Add to Cart button calls onAdd with pet
  it("calls onAdd with pet when Add to Cart is clicked", () => {
    const onAdd = vi.fn();
    render(<PetCard pet={mockPet} onAdd={onAdd} onView={vi.fn()} />);
    fireEvent.click(screen.getByTestId("add-btn"));
    expect(onAdd).toHaveBeenCalledWith(mockPet);
  });
});
