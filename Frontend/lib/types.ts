import { ChangeEventHandler, ReactNode } from "react";

export type Form = {
  income: number | ChangeEventHandler<HTMLInputElement>;
  onChangeIncome: number | ChangeEventHandler<HTMLInputElement>;
  multiplier: number | ChangeEventHandler<HTMLInputElement>;
  onChangeMultiplier: number | ChangeEventHandler<HTMLInputElement>;
  depositPercentage: number | ChangeEventHandler<HTMLInputElement>;
  onChangeDepositPercentage: number | ChangeEventHandler<HTMLInputElement>;
  mortgageInterestRate: number | ChangeEventHandler<HTMLInputElement>;
  onChangeMortgageInterestRate: number | ChangeEventHandler<HTMLInputElement>;
  mortgageLengthValue: any;
  mortgageLengthData: any;
  getMortgageLengthText: number | ChangeEventHandler<HTMLInputElement>;
};

export type Output = {
  income: number;
  deposit: number;
  housePrice: number;
  maxBorrow: number;
  monthlyRepayments: number;
  totalPayments: number;
};
