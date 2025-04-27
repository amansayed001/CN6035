import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Output } from "@/lib/types";

import { Separator } from "./ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export default function Output({
  income,
  deposit,
  housePrice,
  maxBorrow,
  monthlyRepayments,
}: Output) {
  const moreInfo = (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      ></path>
    </svg>
  );
  const incomeParsed: string = Number(income).toLocaleString();
  const depositParsed: string = Number(deposit.toFixed(2)).toLocaleString();
  const housePriceParsed: string = Number(
    housePrice.toFixed(2)
  ).toLocaleString();
  const maxBorrowParsed: string = Number(maxBorrow.toFixed(2)).toLocaleString();
  const monthlyRepaymentsParsed: string = Number(
    monthlyRepayments.toFixed(2)
  ).toLocaleString();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Estimations</CardTitle>
        <CardDescription>
          All values are approximate and should be verified with a mortgage
          provider
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Type</TableHead>
              <TableHead>Calculation</TableHead>
              <TableHead></TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">Personal</TableCell>
              <TableCell>Income</TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">£{incomeParsed}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium"></TableCell>
              <TableCell>
                Deposit
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>{moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>House price x deposit percentage</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">
                £{depositParsed} approx.
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">House</TableCell>
              <TableCell>
                House price{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>Maximum borrowing + deposit amount</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">£{housePriceParsed}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="font-medium">Mortgage</TableCell>
              <TableCell>
                Maximum borrowing{" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>Income x income multiplier</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell></TableCell>
              <TableCell className="text-right">£{maxBorrowParsed}</TableCell>
            </TableRow>
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>
                Monthly repayments
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>Principal loan = house price - deposit amount</p>
                      <p>Monthly interest rate = mortgage interest rate / 12</p>
                      <p>Total payments = length of mortgage * 12</p>
                      <p>
                        Monthly repayments = principal loan x (monthly interest
                        rate x (1 + monthly interest rate) x total payments - 1)
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </TableCell>
              <TableCell className="text-right">
                £{monthlyRepaymentsParsed}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </CardContent>
    </Card>
  );
}
