"use client";

import {
  ArrowUpRight,
  Filter,
  Check,
  ChevronUp,
  ChevronDown,
  CalendarIcon,
} from "lucide-react";
import { useState, useMemo, useCallback } from "react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import { debounce } from "lodash";
import { saveAs } from "file-saver";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { motion, AnimatePresence } from "framer-motion";
import useTransactionStore from '@/store/transactionStore';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const columns: ColumnDef<(typeof transactions)[0]>[] = [
  {
    header: "Customer",
    accessorKey: "customer",
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.getValue("customer")}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {row.original.phone}
        </div>
      </div>
    ),
  },
  {
    header: "Amount",
    accessorKey: "amount",
    cell: ({ row }) => (
      <div className="text-right">${row.getValue("amount").toFixed(2)}</div>
    ),
    enableSorting: true,
  },
  {
    header: "Date",
    accessorKey: "date",
    cell: ({ row }) => <div>{row.getValue("date")}</div>,
    enableSorting: true,
  },
  {
    header: "Status",
    accessorKey: "status",
    cell: ({ row }) => <div>{row.getValue("status")}</div>,
    enableSorting: true,
  },
  {
    header: "Category",
    accessorKey: "category",
    cell: ({ row }) => <div>{row.getValue("category")}</div>,
    enableSorting: true,
  },
  {
    header: "Subcategory",
    accessorKey: "subcategory",
    cell: ({ row }) => <div>{row.getValue("subcategory")}</div>,
    enableSorting: true,
  },
];

export default function Component() {
  const { transactions } = useTransactionStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filters, setFilters] = useState<{ [key: string]: string[] }>({
    status: [],
    category: [],
    subcategory: [],
    dateRange: [],
  });
  const [showFilters, setShowFilters] = useState(false);
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(2022, 0, 20),
    to: addDays(new Date(2022, 0, 20), 20),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const debouncedSearch = useCallback(
    debounce((value) => setSearchTerm(value), 300),
    []
  );

  const filteredTransactions = useMemo(() => {
    return transactions.filter(
      (transaction) =>
        transaction.customer.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (filters.status.length === 0 ||
          filters.status.includes(transaction.status)) &&
        (filters.category.length === 0 ||
          filters.category.includes(transaction.category)) &&
        (filters.subcategory.length === 0 ||
          filters.subcategory.includes(transaction.subcategory)) &&
        (filters.dateRange.length === 0 ||
          (new Date(transaction.date) >= new Date(filters.dateRange[0]) &&
            new Date(transaction.date) <= new Date(filters.dateRange[1])))
    );
  }, [searchTerm, filters]);

  const paginatedTransactions = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredTransactions.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredTransactions, currentPage]);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const table = useReactTable({
    data: paginatedTransactions,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  const handleFilter = (filterType: string, filterValue: string) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterType]: prevFilters[filterType].includes(filterValue)
        ? prevFilters[filterType].filter((f) => f !== filterValue)
        : [...prevFilters[filterType], filterValue],
    }));
  };

  const toggleFilters = () => {
    setShowFilters((prev) => !prev);
  };

  const clearFilters = () => {
    setFilters({
      status: [],
      category: [],
      subcategory: [],
      dateRange: [],
    });
    setDate(undefined);
  };

  const exportToCSV = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Customer,Amount,Phone,Date,Status,Category,Subcategory\n" +
      transactions
        .map(
          (e) =>
            `${e.customer},${e.amount},${e.phone},${e.date},${e.status},${e.category},${e.subcategory}`
        )
        .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "transactions.csv");
  };

  return (
    <Card className="xl:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between">
        <div className="grid gap-2">
          <CardTitle>Transactions</CardTitle>
          <CardDescription>
            Recent transactions from your store.
          </CardDescription>
        </div>
        <Button asChild size="sm" className="gap-1" onClick={exportToCSV}>
          <a>
            Export
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <Input
            type="text"
            placeholder="Search transactions"
            onChange={(e) => debouncedSearch(e.target.value)}
            className="w-full md:w-1/2"
          />
          <Button
            variant="outline"
            size="sm"
            className="ml-2 gap-1"
            onClick={toggleFilters}
          >
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <Card className="p-4">
                <div className="flex flex-wrap gap-4">
                  <div className="w-[40%]">
                    <p className="text-sm font-medium leading-none p-2">Status</p>
                    {["Completed", "Pending", "Cancelled"].map((status) => (
                      <Button
                        style={{ margin: "0.2rem" }}
                        key={status}
                        variant="outline"
                        size="sm"
                        className={`border-dashed ${
                          filters.status.includes(status) ? "border-black" : ""
                        }`}
                        onClick={() => handleFilter("status", status)}
                      >
                        {status}
                        {filters.status.includes(status) && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="w-[40%]">
                    <p className="text-sm font-medium leading-none p-2">Category</p>
                    {["Kids", "Women", "Men"].map((category) => (
                      <Button
                        style={{ margin: "0.2rem" }}
                        key={category}
                        variant="outline"
                        size="sm"
                        className={`border-dashed ${
                          filters.category.includes(category) ? "border-blue-500" : ""
                        }`}
                        onClick={() => handleFilter("category", category)}
                      >
                        {category}
                        {filters.category.includes(category) && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="w-[40%]">
                    <p className="text-sm font-medium leading-none p-2">
                      Subcategory
                    </p>
                    {["Top Wear", "Bottom Wear", "Shoes"].map((subcategory) => (
                      <Button
                        style={{ margin: "0.2rem" }}
                        key={subcategory}
                        variant="outline"
                        size="sm"
                        className={`border-dashed ${
                          filters.subcategory.includes(subcategory)
                            ? "border-blue-500"
                            : ""
                        }`}
                        onClick={() => handleFilter("subcategory", subcategory)}
                      >
                        {subcategory}
                        {filters.subcategory.includes(subcategory) && (
                          <Check className="h-4 w-4 ml-2" />
                        )}
                      </Button>
                    ))}
                  </div>
                  <div className="w-[40%]">
                    <p className="text-sm font-medium leading-none p-2">Date Range</p>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          id="date"
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {date?.from ? (
                            date.to ? (
                              <>
                                {format(date.from, "LLL dd, y")} -{" "}
                                {format(date.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(date.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          initialFocus
                          mode="range"
                          defaultMonth={date?.from}
                          selected={date}
                          onSelect={(date) => {
                            setDate(date);
                            handleFilter("dateRange", [date.from, date.to]);
                          }}
                          numberOfMonths={2}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  className="mt-4"
                  onClick={clearFilters}
                >
                  Clear Filters
                </Button>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ChevronUp className="h-4 w-4" />,
                        desc: <ChevronDown className="h-4 w-4" />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              />
            </PaginationItem>
            {[...Array(totalPages)].map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  onClick={() => setCurrentPage(index + 1)}
                  isActive={currentPage === index + 1}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationItem>
              <PaginationNext
                onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </CardContent>
    </Card>
  );
}