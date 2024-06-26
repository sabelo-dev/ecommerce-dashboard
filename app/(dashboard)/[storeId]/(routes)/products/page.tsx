import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { formatter } from "@/lib/utils";
import ProductClient from "./components/client";

const ProductsPage = async ({ params }: { params: { storeId: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      category: true,
      sizes: true,
      colors: true
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  const formattedProducts: ProductColumn[] = products.map(item => ({
    id: item.id,
    name: item.name,
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    price: formatter.format(item.price.toNumber()),
    category: item.category.name,
    size: item.sizes.map(size => size.name),
    color: item.colors.map(color => color.value),
    createdAt: format(item.createdAt, "MMMM do,yyyy")
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};
export default ProductsPage;
