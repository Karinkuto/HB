// components/CategoriesComponent.jsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

export default function CategoriesComponent({ categories }) {
  return (
    <div className="mb-12 w-full flex flex-col">
      <h2 className="text-2xl font-bold my-8 text-center">Categories</h2>
      <div className="flex gap-[5em]">
        {categories.map((category) => (
          <Card
            key={category.id}
            className="h-28 w-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: "url(/product.jpg)" }}
          >
            <CardHeader className="bg-white opacity-90 rounded-t-lg">
              <CardTitle className="text-black">{category.name}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
}