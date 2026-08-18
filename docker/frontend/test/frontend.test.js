import { render, screen, act } from "@testing-library/react";
import App from "../src/App.jsx";

jest.mock("../src/api.js", () => ({
  getProducts: jest.fn().mockResolvedValue([]),
  createProduct: jest.fn(),
  updateProduct: jest.fn(),
  deleteProduct: jest.fn(),
}));

test("renderiza el titulo de la tienda", async () => {
  await act(async () => {
    render(<App />);
  });
  await act(async () => {
    await Promise.resolve();
  });
  expect(screen.getByText("CloudOps Store")).toBeInTheDocument();
});
