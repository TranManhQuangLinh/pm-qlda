import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CreateUpdateCategory from "./CreateUpdateCategory";

describe("CreateUpdateCategory", () => {
  const mockLoaderData = {
    obj: {},
    objName: "projectType",
  };

  test("renders form fields correctly", async () => {
    const routes = [
      {
        path: "/category/projectType/create",
        element: <CreateUpdateCategory />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/category/projectType/create"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      const textBoxes = screen.getAllByRole("textbox");
      expect(textBoxes).toHaveLength(3);
    });
    await waitFor(() => {
      expect(screen.getByRole("combobox")).toBeInTheDocument();
    });
  });
});
