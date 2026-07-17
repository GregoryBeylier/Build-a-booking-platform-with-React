import { render, screen } from "@testing-library/react";
import FavoriteButton from "@/components/property/FavoriteButton";
import userEvent from "@testing-library/user-event";
import { fetchAddFavorite, fetchRemoveFavorite } from "@/lib/api";

jest.mock("@/lib/api", () => ({
  fetchAddFavorite: jest.fn(),
  fetchRemoveFavorite: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    push: jest.fn(),
    refresh: jest.fn(),
  }),
}));

jest.mock("js-cookie", () => ({
  get: jest.fn(() => "fake-token"),
}));

describe("FavoriteButton", () => {
  it("ajoute le logement aux favoris au clic", async () => {
    render(<FavoriteButton propertyId="1" />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(fetchAddFavorite).toHaveBeenCalled();
  });

  it("retire le logement des favoris au clic", async () => {
    render(<FavoriteButton propertyId="1" initialFavorite={true} />);
    const button = screen.getByRole("button");
    const user = userEvent.setup();
    await user.click(button);
    expect(fetchRemoveFavorite).toHaveBeenCalled();
  });
});
