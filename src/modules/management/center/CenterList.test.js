import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CenterList from "./CenterList";

describe("CenterList", () => {
  const mockLoaderData = {
    data: {},
  };

  test("renders correctly", async () => {
    const routes = [
      {
        path: "/management/center",
        element: <CenterList />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/management/center"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Tạo" })).toBeInTheDocument();
    });
  });
});
