import BrandProductsPage from "@/component/brand";

export default function BrandPage({ params }: { params: { brand: string } }) {
  return <BrandProductsPage brand={params.brand} />;
}