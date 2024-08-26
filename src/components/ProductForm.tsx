// src/components/ProductForm.tsx
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";
import { PlusCircle, Upload, Trash2 } from "lucide-react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDropzone } from "react-dropzone";
import { useTranslation } from "react-i18next";

interface Product {
  id: number;
  name: string;
  description: string;
  status: string;
  price: number;
  stock: number;
  category: string;
  subcategory: string;
  size: string;
  color: string;
  brand: string;
  variants: { sku: string; stock: number; price: number; size: string; color: string }[];
  image: string;
}

interface ProductFormProps {
  product: Product | null;
  onSave: (product: Product) => void;
  onClose: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSave, onClose }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<Product>(
    product || {
      id: 0,
      name: "",
      description: "",
      status: "in stock",
      price: 0,
      stock: 0,
      category: "",
      subcategory: "",
      size: "",
      color: "",
      brand: "",
      variants: [],
      image: "",
    }
  );
  const [brandSearch, setBrandSearch] = useState<string>("");

  useEffect(() => {
    if (product) {
      setFormData(product);
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleVariantChange = (index: number, field: string, value: string | number) => {
    const variants = [...formData.variants];
    variants[index][field] = value;
    setFormData({ ...formData, variants });
  };

  const addVariant = (e: React.MouseEvent) => {
    e.preventDefault();
    setFormData({
      ...formData,
      variants: [...formData.variants, { sku: `GGPC-00${formData.variants.length + 1}`, stock: 0, price: 0, size: "", color: "" }],
    });
  };

  const removeVariant = (index: number) => {
    const variants = [...formData.variants];
    variants.splice(index, 1);
    setFormData({ ...formData, variants });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const isOutOfStock = formData.status === "out of stock";
  const isArchived = formData.status === "archived";

  const handleImageUpload = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      setFormData({ ...formData, image: reader.result as string });
    };
    reader.readAsDataURL(file);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop: handleImageUpload });

  const categories = {
    "Men's Clothing": ["Tops", "Bottoms", "Outerwear", "Activewear", "Formal Wear"],
    "Women's Clothing": ["Tops", "Bottoms", "Dresses", "Outerwear", "Activewear", "Formal Wear"],
    "Children's Clothing": ["Tops", "Bottoms", "Dresses", "Outerwear", "School Uniforms"],
    "Footwear": ["Men's Footwear", "Women's Footwear", "Children's Footwear"],
    "Accessories": ["Bags", "Jewelry", "Hats", "Scarves and Gloves"],
    "Undergarments": ["Men's", "Women's", "Children's"]
  };

  const brands = {
    "Men's Clothing": {
      "Popular": ["Uniqlo", "H&M", "Ralph Lauren", "Levi's", "Dockers", "The North Face", "Patagonia", "Nike", "Adidas", "Hugo Boss", "Armani"],
      "Less Popular": ["Abercrombie & Fitch", "Banana Republic", "J.Crew", "Diesel", "True Religion", "Bonobos", "Barbour", "Carhartt", "Arc'teryx", "Puma", "Reebok", "New Balance", "Ted Baker", "Paul Smith", "Canali"]
    },
    "Women's Clothing": {
      "Popular": ["Zara", "H&M", "Free People", "Levi's", "Lululemon", "Diane von Fürstenberg", "Reformation", "Burberry", "Canada Goose", "Lululemon", "Athleta", "Chanel", "Dior"],
      "Less Popular": ["Everlane", "J.Crew", "Topshop", "AG Jeans", "Paige", "7 For All Mankind", "Alice + Olivia", "Self-Portrait", "Zimmermann", "Mackage", "AllSaints", "Acne Studios", "Sweaty Betty", "Outdoor Voices", "Beyond Yoga", "Elie Saab", "Marchesa", "Oscar de la Renta"]
    },
    "Children's Clothing": {
      "Popular": ["Gap Kids", "Carter's", "Old Navy", "H&M Kids", "Janie and Jack", "Tea Collection", "Columbia", "Patagonia", "Lands' End", "French Toast"],
      "Less Popular": ["Mini Boden", "Hanna Andersson", "The Children's Place", "Cat & Jack", "Gymboree", "Mini Rodini", "Ralph Lauren Kids", "Monsoon", "Petit Bateau", "Joules", "Hatley", "Mini A Ture", "Marks & Spencer", "School Uniform Shop", "John Lewis"]
    },
    "Footwear": {
      "Popular": ["Clarks", "Timberland", "Jimmy Choo", "Steve Madden", "Stride Rite", "Skechers"],
      "Less Popular": ["Allen Edmonds", "Johnston & Murphy", "Ecco", "Stuart Weitzman", "Sam Edelman", "Tory Burch", "Geox", "Native Shoes", "Merrell"]
    },
    "Accessories": {
      "Popular": ["Michael Kors", "Coach", "Tiffany & Co.", "Pandora", "New Era", "Stetson", "Burberry", "Hermès"],
      "Less Popular": ["Longchamp", "Tumi", "Fossil", "Cartier", "Bvlgari", "David Yurman", "Brixton", "Bailey", "Goorin Bros.", "Johnstons of Elgin", "Echo", "Falke"]
    },
    "Undergarments": {
      "Popular": ["Calvin Klein", "Hanes", "Victoria's Secret", "Aerie", "Hanes", "Fruit of the Loom"],
      "Less Popular": ["Tommy John", "SAXX", "MeUndies", "ThirdLove", "Spanx", "Hanky Panky", "Gap Kids", "Petit Bateau", "Boden"]
    }
  };

  const filteredBrands = formData.category ? [...brands[formData.category]["Popular"], ...brands[formData.category]["Less Popular"]].filter(brand => brand.toLowerCase().includes(brandSearch.toLowerCase())) : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{t("productDetails")}</CardTitle>
          <CardDescription>{t("enterDetails")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="name">{t("name")}</Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">{t("description")}</Label>
            <ReactQuill
              value={formData.description}
              onChange={(value) => setFormData({ ...formData, description: value })}
              theme="snow"
              className="mt-2 rounded-md border"
            />
          </div>
          <div>
            <Label htmlFor="image">{t("image")}</Label>
            <div className="flex items-center mt-5 space-x-4 h-[10em]">
              {formData.image && (
                <img
                  alt="Product image"
                  className="aspect-square w-48 rounded-md object-cover"
                  src={formData.image}
                />
              )}
              <div {...getRootProps()} className="flex aspect-square h-[12em] w-[100%] items-center justify-center rounded-md border border-dashed cursor-pointer">
                <input {...getInputProps()} />
                <Upload className="h-4 w-4 text-muted-foreground" />
                <span className="sr-only">Upload</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle>{t("status")}</CardTitle>
          <CardDescription>{t("selectStatus")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            {["in stock", "out of stock", "archived"].map((status) => (
              <Button
                key={status}
                variant={formData.status === status ? "default" : "outline"}
                onClick={() => handleSelectChange("status", status)}
              >
                {status}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {!isOutOfStock && !isArchived && (
        <>
          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t("categorySubcategory")}</CardTitle>
              <CardDescription>{t("selectCategorySubcategory")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="category">{t("category")}</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => handleSelectChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectCategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.keys(categories).map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="subcategory">{t("subcategory")}</Label>
                <Select
                  value={formData.subcategory}
                  onValueChange={(value) => handleSelectChange("subcategory", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t("selectSubcategory")} />
                  </SelectTrigger>
                  <SelectContent>
                    {formData.category && categories[formData.category].map((subcategory) => (
                      <SelectItem key={subcategory} value={subcategory}>
                        {subcategory}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t("stockPrice")}</CardTitle>
              <CardDescription>{t("enterStockPrice")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="stock">{t("stock")}</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  value={formData.stock}
                  onChange={handleChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">{t("price")}</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  value={formData.price}
                  onChange={handleChange}
                  required
                  disabled={isOutOfStock || isArchived}
                />
              </div>
              <div>
                <Label htmlFor="brand">{t("brand")}</Label>
                <Input
                  id="brandSearch"
                  type="text"
                  value={brandSearch}
                  onChange={(e) => setBrandSearch(e.target.value)}
                  placeholder="Search brands"
                />
                <div className="flex flex-wrap gap-2 space-y-2">
                  {filteredBrands.map((brand) => (
                    <Button
                      key={brand}
                      variant={formData.brand === brand ? "default" : "outline"}
                      onClick={() => handleSelectChange("brand", brand)}
                    >
                      {brand}
                    </Button>
                  ))}
                </div>
                <Button
                  variant="outline"
                  onClick={() => handleSelectChange("brand", "")}
                >
                  No Brand
                </Button>
              </div>
              <div>
                <Label htmlFor="color">{t("color")}</Label>
                <Input
                  id="color"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card className="mt-4">
            <CardHeader>
              <CardTitle>{t("variants")}</CardTitle>
              <CardDescription>{t("addVariants")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">{t("sku")}</TableHead>
                    <TableHead>{t("stock")}</TableHead>
                    <TableHead>{t("price")}</TableHead>
                    <TableHead className="w-[100px]">{t("size")}</TableHead>
                    <TableHead className="w-[100px]">{t("color")}</TableHead>
                    <TableHead className="w-[100px]">{t("actions")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {formData.variants.map((variant, index) => (
                    <TableRow key={index}>
                      <TableCell className="font-semibold">{variant.sku}</TableCell>
                      <TableCell>
                        <Label htmlFor={`stock-${index}`} className="sr-only">
                          {t("stock")}
                        </Label>
                        <Input
                          id={`stock-${index}`}
                          type="number"
                          value={variant.stock}
                          onChange={(e) => handleVariantChange(index, "stock", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor={`price-${index}`} className="sr-only">
                          {t("price")}
                        </Label>
                        <Input
                          id={`price-${index}`}
                          type="number"
                          value={variant.price}
                          onChange={(e) => handleVariantChange(index, "price", e.target.value)}
                          disabled={isOutOfStock || isArchived}
                        />
                      </TableCell>
                      <TableCell>
                        <ToggleGroup type="single" defaultValue={variant.size} variant="outline">
                          <ToggleGroupItem value="S" onClick={() => handleVariantChange(index, "size", "S")}>S</ToggleGroupItem>
                          <ToggleGroupItem value="M" onClick={() => handleVariantChange(index, "size", "M")}>M</ToggleGroupItem>
                          <ToggleGroupItem value="L" onClick={() => handleVariantChange(index, "size", "L")}>L</ToggleGroupItem>
                          <ToggleGroupItem value="XL" onClick={() => handleVariantChange(index, "size", "XL")}>XL</ToggleGroupItem>
                        </ToggleGroup>
                      </TableCell>
                      <TableCell>
                        <Input
                          id={`color-${index}`}
                          type="text"
                          value={variant.color}
                          onChange={(e) => handleVariantChange(index, "color", e.target.value)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" onClick={() => removeVariant(index)}>
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-center border-t p-4">
              <Button size="sm" variant="ghost" className="gap-1" onClick={addVariant}>
                <PlusCircle className="h-3.5 w-3.5" />
                {t("addVariant")}
              </Button>
            </CardFooter>
          </Card>
        </>
      )}

      <Button type="submit" className="mt-4">
        {product ? t("updateProduct") : t("addProduct")}
      </Button>
      <Button variant="ghost" onClick={onClose} className="ml-4 mt-4">
        {t("cancel")}
      </Button>
    </form>
  );
};

export default ProductForm;