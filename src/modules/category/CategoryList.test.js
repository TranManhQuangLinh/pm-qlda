import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CategoryList from "./CategoryList";

describe("CategoryList", () => {
  const mockLoaderData = {
    data: {},
    objName: "projectType",
  };

  test("renders correctly", async () => {
    const routes = [
      {
        path: "/category/projectType",
        element: <CategoryList />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/category/projectType"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Tạo" })).toBeInTheDocument();
    });
  });
});
