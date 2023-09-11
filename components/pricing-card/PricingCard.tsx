"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface PricingCardProps {
  title: string;
  monthlyPrice: number;
  yearlyPrice: number;
  features: string[];
}

export default function PricingCard({
  title,
  monthlyPrice,
  yearlyPrice,
  features,
}: PricingCardProps) {
  const [period, setPeriod] = useState("month");

  return (
    <div className="mx-auto max-w-full md:flex-1 md:max-w-[300px] rounded-lg border md:mx-4 bg-anti-glass">
      <div className="p-6">
        <h1 className="text-xl font-medium capitalize text-gray-700 lg:text-3xl">
          {title}
        </h1>

        <h2 className="mt-4 text-2xl font-medium text-gray-700 sm:text-4xl">
          ${period === "month" ? monthlyPrice : yearlyPrice}{" "}
          <span className="text-base font-medium">/{period}</span>
        </h2>

        <div className="join flex justify-center mt-3 text-xs">
          <button
            className={cn(
              "btn btn-sm join-item text-xs border-0",
              period === "month" && "bg-accent"
            )}
            onClick={() => setPeriod("month")}
          >
            Monthly
          </button>
          <button
            className={cn(
              "btn btn-sm join-item text-xs border-0",
              period === "year" && "bg-accent"
            )}
            onClick={() => setPeriod("year")}
          >
            Yearly
          </button>
        </div>

        <button className="mt-3 w-full transform rounded-md bg-gradient-to-r from-primary to-secondary px-4 py-2 uppercase tracking-wide font-bold text-white transition-all duration-500 bg-size-200 bg-pos-0 hover:bg-pos-100">
          Subscribe
        </button>
      </div>

      <hr className="border-gray-200" />

      <div className="p-6">
        <h1 className="text-lg font-medium capitalize text-gray-700 lg:text-xl">
          What’s included:
        </h1>

        <div className="mt-4 md:mt-8 space-y-2 md:space-y-4">
          {features.map((feature, indx) => (
            <div key={indx} className="flex items-center">
              <span className="mx-4 text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
