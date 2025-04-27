"use client";

declare global {
  interface Window {
    ethereum?: any;
  }
}


import { Button } from "@/components/ui/button";
import Form from "@/components/Form";
import Output from "@/components/Output";
import { cn } from "@/lib/utils";
import { CommandGroup, CommandItem } from "@/components/ui/command";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import axios from "axios";
import { ethers } from "ethers";
import abi from "./abi/AccessControl.json";


import { CheckIcon } from "@radix-ui/react-icons";
import { ChangeEventHandler, useState, useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";


const contractAbi = abi.abi;
const contractAddress = "0xd462039b98Fa8E5E1c9AA74575aE930cD52B99B9";

let provider: ethers.BrowserProvider;
let signer: ethers.JsonRpcSigner;
let contract: ethers.Contract;


// Wallet Helpers
const connectWallet = async () => {
  if (!window.ethereum) {
    alert("Please install MetaMask!");
    return;
  }

  provider = new ethers.BrowserProvider(window.ethereum);
  signer = await provider.getSigner();
  contract = new ethers.Contract(contractAddress, contractAbi, signer);

  const address = await signer.getAddress();
  return address;
};

const checkAccess = async (userAddress: string): Promise<boolean> => {
  const access = await contract.checkAccess(userAddress);
  return access;
};

const payAccessFee = async () => {
  if (!contract) {
    console.error("Contract not initialized");
    return;
  }

  const tx = await contract.payAccessFee({
    value: ethers.parseEther("0.01") 
  });

  // wait for the transaction to be mined
  await tx.wait();
};

interface IRate {
  _id: string;
  week: string;
  from30: string;
  from15: string;
  createdAt: string;
  updated: string;
  __v: number;
}

const fetchRates = async () => {
  try {
    const res = await axios.get("http://localhost:3001/api/getRates");

    if (res.status === 200) {
      return res.data.rates;
    }

    throw new Error("Unable to fetch the rates!");
  } catch (e) {
    alert("Unable to fetch the rates!");
  }
}


export default function Home() {
  const [income, setIncome] = useState<number>(0);
  const [incomeMultiplier, setIncomeMultiplier] = useState<number>(0);
  const [mortgageInterestRate, setMortgageInterestRate] = useState<number>(0);
  const [lengthOfMortgage, setLengthOfMortgage] = useState<number>(0);
  const [depositPercentage, setDepositPercentage] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [rates, setRates] = useState<IRate | null>(null);
  const [connected, setConnected] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [walletAddress, setWalletAddress] = useState<string>("");

  const maxBorrow: number = income * incomeMultiplier;
  const housePrice: number = maxBorrow / (1 - depositPercentage / 100); // Adjusted formula
  const depositAmount: number = housePrice * (depositPercentage / 100); // Now depends on the adjusted housePrice
  const principalLoan: number = housePrice - depositAmount;
  const monthlyInterestRate: number = mortgageInterestRate / 100 / 12;
  const totalPayments: number = lengthOfMortgage * 12;
  const monthlyRepayments: number = totalPayments
    ? (principalLoan *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1)
    : 0;

  const onChangeIncome = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    setIncome(e.target.value as unknown as number);
  };

  const onChangeIncomeMultiplier = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault;
    setIncomeMultiplier(e.target.value as unknown as number);
  };

  const onChangeMortgageInterestRate = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault;
    setMortgageInterestRate(e.target.value as unknown as number);
  };

  const onChangeDepositPercentage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    e.preventDefault;
    setDepositPercentage(e.target.value as unknown as number);
  };

  const handlePay = async () => {
    await payAccessFee();
    setHasAccess(true); // after payment, unlock!
  };

  useEffect(() => {
    (async function() {
      try {
        const r = await fetchRates();

        setRates(r);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const address = await connectWallet();
        if (address) {
          setConnected(true);
          setWalletAddress(address);

          const access = await checkAccess(address);
          setHasAccess(access);
        }
      }
    };
    init();
  }, []);

  const mortgageLengthData: any[] = [
    {
      value: 15,
      label: "15 years",
    },
    {
      value: 20,
      label: "20 years",
    },
    {
      value: 25,
      label: "25 years",
    },
    {
      value: 30,
      label: "30 years",
    },
    {
      value: 40,
      label: "40 years",
    },
  ];

  const mortgageLengthValue = (
    <CommandGroup>
      {mortgageLengthData.map((years: { value: number; label: string }) => (
        <CommandItem
          key={years.value}
          value={years.value as any}
          onSelect={() => {
            setLengthOfMortgage(years.value);
            setOpen(false);
          }}
        >
          {years.label}
          <CheckIcon
            className={cn(
              "ml-auto h-4 w-4",
              lengthOfMortgage === years.value ? "opacity-100" : "opacity-0"
            )}
          />
        </CommandItem>
      ))}
    </CommandGroup>
  );

  if (!connected) {
    return (
      <div className="h-screen flex items-center justify-center text-center">
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="h-screen flex flex-col items-center justify-center text-center">
        <h2 className="text-lg font-semibold">Access Locked 🔒</h2>
        <p>Pay 0.01 ETH to unlock full access.</p>
        <Button onClick={handlePay} className="mt-4">
          Pay and Unlock
        </Button>
      </div>
    );
  }

  return (
    <div className="border-b">
      <ResizablePanelGroup
        direction="horizontal"
        className="min-h-[600px] rounded-lg "
      >
        <ResizablePanel defaultSize={50}>
          <div className="flex h-screen items-center justify-center p-6">
            <span className="font-semibold">
              <Form
                income={income}
                onChangeIncome={
                  onChangeIncome as unknown as ChangeEventHandler<HTMLInputElement>
                }
                multiplier={incomeMultiplier}
                onChangeMultiplier={onChangeIncomeMultiplier}
                mortgageInterestRate={mortgageInterestRate}
                onChangeMortgageInterestRate={onChangeMortgageInterestRate}
                mortgageLengthData={mortgageLengthData}
                mortgageLengthValue={mortgageLengthValue}
                onChangeDepositPercentage={onChangeDepositPercentage}
                depositPercentage={depositPercentage}
                getMortgageLengthText={lengthOfMortgage}
              />
            </span>
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <div className="flex h-full items-center justify-center p-6">
            <span className="font-semibold">
              {" "}
              <Output
                income={income}
                deposit={depositAmount}
                housePrice={housePrice}
                maxBorrow={maxBorrow}
                totalPayments={totalPayments}
                monthlyRepayments={monthlyRepayments}
              />
            </span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>

      {/* Mortgage Rates */}
      <div className="border-t py-4">
        {
          (!rates) 
          ?
          <p className="text-center">
            Loading Please wait!
          </p>
          :
          <div className="w-[500px] mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>
                  Today's Mortgage Rates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Rates provided by API Ninjas – updated weekly.
                </CardDescription>
                
                <div className="my-3">
                  <p className="my-4 text-lg text-muted-foreground">
                    30-Year Fixed Rate: {rates.from30}%
                  </p>
                  <p className="my-4 text-lg text-muted-foreground">
                    15-Year Fixed Rate: {rates.from15}%
                  </p>
                </div>
              </CardContent>
              <CardFooter className="border-t">
                <p className="text-center mt-2 text-sm">Last Updated: {rates.createdAt}</p>
              </CardFooter>
            </Card>
          </div>
        }
      </div>
    </div>
  );
}
