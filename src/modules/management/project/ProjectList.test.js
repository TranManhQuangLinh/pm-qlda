import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import ProjectList from "./ProjectList";

describe("ProjectList", () => {
  const mockLoaderData = {
    data: {},
  };

  test("renders correctly", async () => {
    const routes = [
      {
        path: "/management/project",
        element: <ProjectList />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/management/project"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      expect(screen.getByRole("link", { name: "Tạo" })).toBeInTheDocument();
    });
  });
});
