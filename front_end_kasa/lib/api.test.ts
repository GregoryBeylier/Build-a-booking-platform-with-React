import { fetchFavorites } from "@/lib/api";

describe("fetchFavorites", () => {
  it("appelle la bonne URL avec le bon token", async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([]),
      }),
    ) as jest.Mock;

    await fetchFavorites("1", "fake-token");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/api/users/1/favorites"),
      expect.any(Object),
    );
  });
});
