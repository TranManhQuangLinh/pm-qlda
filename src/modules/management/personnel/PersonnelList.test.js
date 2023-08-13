import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import PersonnelList from "./PersonnelList";

describe("PersonnelList", () => {
  const mockLoaderData = {
    data: {},
  };

  test("renders correctly", async () => {
    const routes = [
      {
        path: "/management/personnel",
        element: <PersonnelList />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/management/personnel"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Tạo" })).toBeInTheDocument();
    });
  });
});
