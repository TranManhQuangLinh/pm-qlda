import React from "react";
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Layout from "./Layout";

const normalizeText = (text) =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

const createTextMatcher = (label) => (content) =>
  normalizeText(content).includes(normalizeText(label));

test("renders category items in sidebar", () => {
  render(
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );

  const categoryLabels = [
    "Loại dự án",
    "Trạng thái dự án",
    "Tech stack",
    "Nhóm khách hàng",
  ];
  categoryLabels.forEach((label) => {
    const linkElements = screen.queryAllByText(createTextMatcher(label));
    expect(linkElements).not.toBeNull();
    expect(linkElements.length).toBeGreaterThan(0);
    linkElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  const managementLabels = [
    "Trung tâm, bộ phận, phòng ban",
    "Nhân sự",
    "Dự án",
  ];
  managementLabels.forEach((label) => {
    const linkElements = screen.queryAllByText(createTextMatcher(label));
    expect(linkElements).not.toBeNull();
    expect(linkElements.length).toBeGreaterThan(0);
    linkElements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });
});
