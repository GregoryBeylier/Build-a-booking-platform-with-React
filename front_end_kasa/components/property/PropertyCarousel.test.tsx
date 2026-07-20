import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import PropertyCarousel from "./PropertyCarousel";

describe("PropertyCarousel", () => {
  const pictures = ["photo1.jpg", "photo2.jpg", "photo3.jpg"];
  it("affiche la photo suivante au clic sur le bouton suivant", async () => {
    render(<PropertyCarousel pictures={pictures} />);

    const user = userEvent.setup();
    const nextButton = screen.getByRole("button", { name: /photo suivante/i });

    await user.click(nextButton);

    expect(
      screen.getByAltText("Photo 2 sur 3 du logement"),
    ).toBeInTheDocument();
  });

  it("revient à la dernière photo au clic sur le bouton précédent depuis la première photo", async () => {
    render(<PropertyCarousel pictures={pictures} />);

    const user = userEvent.setup();
    const previousButton = screen.getByRole("button", {
      name: /photo précédente/i,
    });

    await user.click(previousButton);

    expect(
      screen.getByAltText("Photo 3 sur 3 du logement"),
    ).toBeInTheDocument();
  });
});
