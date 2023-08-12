import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CreateUpdatePersonnel from "./CreateUpdatePersonnel";

describe("CreateUpdatePersonnel", () => {
  const mockLoaderData = {
    obj: {},
    techStack: {},
    project: {},
  };

  test("renders form fields correctly", async () => {
    const routes = [
      {
        path: "/management/personnel/create",
        element: <CreateUpdatePersonnel />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/management/personnel/create"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      const textBoxes = screen.getAllByRole("textbox");
      expect(textBoxes).toHaveLength(3);
    });
  });
});
