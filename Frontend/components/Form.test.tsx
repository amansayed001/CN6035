import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Form from "./Form";
import { Form as FormProps } from "@/lib/types";

const FormProps: FormProps = {
  income: 0,
  onChangeIncome: 0,
  multiplier: 0,
  onChangeMultiplier: 0,
  depositPercentage: 0,
  onChangeDepositPercentage: 0,
  mortgageInterestRate: 0,
  onChangeMortgageInterestRate: 0,
  mortgageLengthValue: "test",
  mortgageLengthData: 4,
  getMortgageLengthText: 0,
};

it("Title render: 'Mortgage Calculator", async () => {
  render(<Form {...FormProps} />);
  expect(screen.findAllByText(/Mortgage Calculator/)).toBeTruthy();
});

it("Title render: 'Enter values to calculate home and mortgage estimation values'", () => {
  render(<Form {...FormProps} />);
  expect(
    screen.findAllByText(
      /Enter values to calculate home and mortgage estimation values/
    )
  ).toBeTruthy();
});

it("Renders textbox for income", () => {
  render(<Form {...FormProps} />);
  expect(screen.getByRole("textbox")).toBeTruthy();
});

it("Renders textbox for number steppers", () => {
  render(<Form {...FormProps} />);
  expect(screen.getAllByRole("spinbutton")).toHaveLength(3);
});

it("Renders textbox for combobox", () => {
  render(<Form {...FormProps} />);
  expect(screen.getByRole("combobox")).toBeTruthy();
});
