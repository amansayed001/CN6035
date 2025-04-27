import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Output from "./Output";
import { Output as OutputProps } from "@/lib/types";

const OutputProps: OutputProps = {
  income: 123,
  deposit: 123,
  housePrice: 123,
  maxBorrow: 123,
  monthlyRepayments: 123,
  totalPayments: 123,
};

it("Title render: 'Your Estimations", async () => {
  render(<Output {...OutputProps} />);
  expect(screen.findAllByText(/Your Estimations/)).toBeTruthy();
});

it("Title render: 'All values are approximate and should be verified with a mortgage provider", async () => {
  render(<Output {...OutputProps} />);
  expect(screen.findAllByText(/Your Estimations/)).toBeTruthy();
});

it("Find all by table role", async () => {
  render(<Output {...OutputProps} />);
  expect(screen.findAllByRole("table")).toBeTruthy();
});

it("Find all by table header", async () => {
  render(<Output {...OutputProps} />);
  expect(screen.findAllByRole("th")).toBeTruthy();
});

it("Find all by table row", async () => {
  render(<Output {...OutputProps} />);
  expect(screen.findAllByRole("tr")).toBeTruthy();
});

it("Render prop values", async () => {
  render(<Output {...OutputProps} />);
  expect(screen.findAllByText(/123/)).toBeTruthy();
});
