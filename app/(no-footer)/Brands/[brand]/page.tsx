// app/(no-footer)/Brands/[brand]/page.tsx
import BrandProductsPage from "@/component/brand";
import { FC } from "react";

interface PageProps {
  params: { brand: string };
}

// Mark it as an async arrow function to satisfy Next.js PageProps constraint
const BrandServerPage: FC<PageProps> = async ({ params }) => {
  const { brand } = params;

  return (
    <div>
      <BrandProductsPage brand={brand} />
    </div>
  );
};

export default BrandServerPage;
