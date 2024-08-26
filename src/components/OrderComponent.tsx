"use client";

import useTransactionStore from '@/store/transactionStore';
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";

export default function Component({ setSee, see }) {
  const [active, setActive] = useState(null);
  const { transactions } = useTransactionStore();

  return (
    <Card className="w-full">
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Type</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow
                key={transaction.id}
                onClick={() => {setSee(!see); see ? setActive(null) : setActive(transaction.id) }}
                className={see == true && active == transaction.id ? "bg-accent cursor-pointer" : "cursor-pointer"}
              >
                <TableCell>
                  <div className="font-medium">{transaction.customer}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {transaction.phone}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">{transaction.category}</TableCell>
                <TableCell className="hidden md:table-cell">
                  {transaction.date}
                </TableCell>
                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}