"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { ChangeEvent, ChangeEventHandler, useState } from "react";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Separator } from "@/components/ui/separator";

import { Controller, useForm, FormProvider } from "react-hook-form";
import { Form } from "@/lib/types";

const formSchema = z.object({
  multiplier: z.coerce
    .number()
    .min(3)
    .max(5, "Multiplier must be between 3 and 5"),
  depositPercentage: z.coerce
    .number()
    .min(5)
    .max(20, "Deposit percentage must be between 5 and 20"),
  mortgageInterestRate: z.coerce
    .number()
    .min(2)
    .max(5, "Mortgage interest rate must be between 2 and 5"),
});

export default function Form({
  income,
  onChangeIncome,
  multiplier,
  onChangeMultiplier,
  depositPercentage,
  onChangeDepositPercentage,
  mortgageInterestRate,
  onChangeMortgageInterestRate,
  mortgageLengthValue,
  getMortgageLengthText,
}: Form) {
  const [open, setOpen] = useState(false);
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
  const {
    control,
    formState: { errors },
    watch,
  } = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  const methods = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Mortgage Calculator</CardTitle>
        <CardDescription>
          Enter values to calculate home and mortgage estimation values
        </CardDescription>
      </CardHeader>
      <Separator />
      <CardContent>
        <FormProvider {...methods}>
          <form>
            <FormItem className="mt-4">
              <FormLabel>Annual income</FormLabel>
              <FormDescription className="flex items-center !mt-0">
                Enter income before tax
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>Gross income</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormDescription>
              <FormControl>
                <Input
                  placeholder="income"
                  onChangeCapture={
                    onChangeIncome as unknown as ChangeEventHandler<HTMLInputElement>
                  }
                  value={income as number}
                />
              </FormControl>
            </FormItem>

            <FormItem className="mt-4">
              <FormLabel>Income multiplier</FormLabel>
              <FormDescription className="flex items-center !mt-0">
                (3 - 5 times)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>
                        This is the max denominator the mortgage provider is
                        willing to lend
                      </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormDescription>
              <FormControl>
                <FormField
                  name="multiplier"
                  control={control}
                  render={({ field }: any) => (
                    <Input
                      type="number"
                      min="3"
                      max="5"
                      placeholder="enter a value between 3 and 5"
                      defaultValue={multiplier as number}
                      onChangeCapture={
                        onChangeMultiplier as unknown as ChangeEventHandler<HTMLInputElement>
                      }
                      // onBlur={field.onBlur}
                      {...field}
                    />
                  )}
                />
              </FormControl>
              {errors.multiplier && (
                <FormMessage>{errors.multiplier.message}</FormMessage>
              )}
            </FormItem>

            <FormItem className="mt-4">
              <FormLabel>Deposit percentage</FormLabel>
              <FormDescription className="flex items-center !mt-0">
                (5% - 20%){" "}
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>House price x income multiplier</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormDescription>
              <FormControl>
                <FormField
                  name="depositPercentage"
                  control={control}
                  render={({ field }: any) => (
                    <Input
                      type="number"
                      min="5"
                      max="20"
                      defaultValue={depositPercentage as number}
                      onChangeCapture={
                        onChangeDepositPercentage as unknown as ChangeEventHandler<HTMLInputElement>
                      }
                      {...field}
                    />
                  )}
                />
              </FormControl>
              {errors.depositPercentage && (
                <FormMessage>{errors.depositPercentage.message}</FormMessage>
              )}
            </FormItem>

            <FormItem className="mt-4">
              <FormLabel>Mortgage Interest Rate</FormLabel>
              <FormDescription className="flex items-center !mt-0">
                (2% - 5%)
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>The interest that is added to the mortgage lent</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormDescription>
              <FormControl>
                <FormField
                  name="mortgageInterestRate"
                  control={control}
                  render={({ field }: any) => (
                    <Input
                      type="number"
                      min="2"
                      max="5"
                      defaultValue={mortgageInterestRate as number}
                      onChangeCapture={
                        onChangeMortgageInterestRate as unknown as ChangeEventHandler<HTMLInputElement>
                      }
                      {...field}
                    />
                  )}
                />
              </FormControl>
              {errors.mortgageInterestRate && (
                <FormMessage>{errors.mortgageInterestRate.message}</FormMessage>
              )}
            </FormItem>

            <FormItem className="mt-4">
              <FormLabel>Length of Mortgage</FormLabel>
              <FormDescription className="flex items-center !mt-0">
                Enter total amount of years of mortgage agreement
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger> {moreInfo}</TooltipTrigger>
                    <TooltipContent>
                      <p>Total years of mortgage agreement</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </FormDescription>
              <FormControl>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-[450px] justify-between"
                    >
                      {getMortgageLengthText
                        ? `${getMortgageLengthText} years`
                        : "Select length of mortgage"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[450px] p-0">
                    <Command>{mortgageLengthValue}</Command>
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          </form>
        </FormProvider>
      </CardContent>
    </Card>
  );
}
