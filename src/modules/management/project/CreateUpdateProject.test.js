import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CreateUpdateProject from "./CreateUpdateProject";

describe("CreateUpdateProject", () => {
  const mockLoaderData = {
    obj: {},
    projectType: {},
    projectStatus: {},
    techStack: {},
    personnel: {},
    center: {},
  };

  test("renders form fields correctly", async () => {
    const routes = [
      {
        path: "/management/project/create",
        element: <CreateUpdateProject />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/management/project/create"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      const textBoxes = screen.getAllByRole("textbox");
      expect(textBoxes).toHaveLength(1);
    });
  });
});
