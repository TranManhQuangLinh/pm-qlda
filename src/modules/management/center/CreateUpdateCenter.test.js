import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { RouterProvider, createMemoryRouter } from "react-router-dom";
import CreateUpdateCenter from "./CreateUpdateCenter";

describe("CreateUpdateCenter", () => {
  const mockLoaderData = {
    obj: {},
    techStack: {},
    project: {},
    personnel: {},
  };

  test("renders form fields correctly", async () => {
    const routes = [
      {
        path: "/management/center/create",
        element: <CreateUpdateCenter />,
        loader: () => mockLoaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: ["/management/center/create"],
    });

    render(<RouterProvider router={router} />);

    // Debug the rendered output
    // screen.debug();

    await waitFor(() => {
      const textBoxes = screen.getAllByRole("textbox");
      expect(textBoxes).toHaveLength(2);
    });
    
  });
});
