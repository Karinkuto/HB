"use client";

import React, { useState } from "react";
import { Container } from "@mui/material";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import ProductForm from "../components/ProductForm"; // Import the ProductForm component
import { ScrollArea } from "@/components/ui/scroll-area"; // Import the ScrollArea component
import useProductStore from "./ProductStore";

const ProductsList: React.FC = () => {
  const { products, setProducts, addProduct } = useProductStore();
  const [filter, setFilter] = useState<string>("all");
  const [search, setSearch] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const productsPerPage = 5;

  const filteredProducts = products.filter((product) => {
    if (filter !== "all" && product.status !== filter) return false;
    if (
      search &&
      !Object.values(product).some((value) =>
        value.toString().toLowerCase().includes(search.toLowerCase())
      )
    )
      return false;
    return true;
  });

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const visibleProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleOpenDialog = (product: Product | null) => {
    setEditingProduct(product);
    setDialogOpen(true);
  };

  const handleSaveProduct = (product: Product) => {
    if (product.id) {
      setProducts(products.map((p) => (p.id === product.id ? product : p)));
    } else {
      addProduct({ ...product, id: products.length + 1 });
    }
    setDialogOpen(false);
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const handleArchiveProduct = (id: number) => {
    setProducts((prev: any[]) =>
      prev.map((p: { id: number; }) => (p.id === id ? { ...p, status: "archived" } : p))
    );
  };

  const getBadgeColor = (status: string) => {
    switch (status) {
      case "in stock":
        return { backgroundColor: "green", color: "white" };
      case "sold out":
        return { backgroundColor: "red", color: "white" };
      case "archived":
        return { backgroundColor: "gray", color: "white" };
      default:
        return {};
    }
  };

  return (
    <Container>
      <div className="mb-4 flex justify-between">
        <Input
          value={search}
          placeholder="Search products"
          onChange={(e) => setSearch(e.target.value)}
          className="mr-4"
        />
        <Button variant="default" onClick={() => handleOpenDialog(null)}>
          Add Product
        </Button>
      </div>
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value)}
        className="w-full my-4"
      >
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="in stock">In Stock</TabsTrigger>
          <TabsTrigger value="sold out">Sold Out</TabsTrigger>
          <TabsTrigger value="archived">Archived</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <ProductTable
            products={visibleProducts}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteProduct}
            onArchive={handleArchiveProduct}
            getBadgeColor={getBadgeColor}
          />
        </TabsContent>
        <TabsContent value="in stock">
          <ProductTable
            products={visibleProducts}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteProduct}
            onArchive={handleArchiveProduct}
            getBadgeColor={getBadgeColor}
          />
        </TabsContent>
        <TabsContent value="sold out">
          <ProductTable
            products={visibleProducts}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteProduct}
            onArchive={handleArchiveProduct}
            getBadgeColor={getBadgeColor}
          />
        </TabsContent>
        <TabsContent value="archived">
          <ProductTable
            products={visibleProducts}
            onEdit={handleOpenDialog}
            onDelete={handleDeleteProduct}
            onArchive={handleArchiveProduct}
            getBadgeColor={getBadgeColor}
          />
        </TabsContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{visibleProducts.length}</strong> of{" "}
            <strong>{filteredProducts.length}</strong> products
          </div>
          <Pagination>
            <PaginationContent>
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => prev - 1);
                    }}
                  />
                </PaginationItem>
              )}
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage(index + 1);
                    }}
                    className={currentPage === index + 1 ? "active" : ""}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      setCurrentPage((prev) => prev + 1);
                    }}
                  />
                </PaginationItem>
              )}
            </PaginationContent>
          </Pagination>
        </CardFooter>
      </Tabs>

      {dialogOpen && (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent style={{ maxWidth: "80dvw" }} className=" h-4/5 overflow-hidden">
            <DialogTitle>
              {editingProduct ? "Edit Product" : "Add Product"}
            </DialogTitle>
            <ScrollArea className="h-[calc(100%-60px)] p-4">
              <ProductForm
                product={editingProduct}
                onSave={handleSaveProduct}
                onClose={() => setDialogOpen(false)}
              />
            </ScrollArea>
          </DialogContent>
        </Dialog>
      )}
    </Container>
  );
};

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
  onArchive: (id: number) => void;
  getBadgeColor: (status: string) => React.CSSProperties;
}

const ProductTable: React.FC<ProductTableProps> = ({ products, onEdit, onDelete, onArchive, getBadgeColor }) => (
  <Card>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell">Stock</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="hidden md:table-cell">Subcategory</TableHead>
            <TableHead className="hidden md:table-cell">Size</TableHead>
            <TableHead className="hidden md:table-cell">Color</TableHead>
            <TableHead className="hidden md:table-cell">Brand</TableHead>
            <TableHead className="sr-only">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="hidden sm:table-cell">
                <img
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.image || "/product.jpg"}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant="outline" style={getBadgeColor(product.status)} className="badge-translucent">
                  {product.status}
                </Badge>
              </TableCell>
              <TableCell className="hidden md:table-cell">
                {product.variants.length > 0 ? (
                  <div className="flex flex-col space-y-2">
                    {product.variants.map((variant, index) => (
                      <div key={index} className="border p-2 rounded">
                        {variant.price}
                      </div>
                    ))}
                  </div>
                ) : (
                  product.price
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">{product.stock}</TableCell>
              <TableCell className="hidden md:table-cell">{product.category}</TableCell>
              <TableCell className="hidden md:table-cell">{product.subcategory}</TableCell>
              <TableCell className="hidden md:table-cell">
                {product.variants.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant, index) => (
                      <div key={index} className="border p-2 rounded">
                        {variant.size}
                      </div>
                    ))}
                  </div>
                ) : (
                  product.size
                )}
              </TableCell>
              <TableCell className="hidden md:table-cell">{product.color}</TableCell>
              <TableCell className="hidden md:table-cell">{product.brand}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="outline">
                      <MoreHorizontal />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => onEdit(product)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onDelete(product.id)}>
                      Delete
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onArchive(product.id)}>
                      Archive
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default ProductsList;