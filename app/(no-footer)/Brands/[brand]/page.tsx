import BrandProductsPage from "@/component/brand";

interface BrandPageProps {
  params: { brand: string };
}

export default function BrandPage({ params }: BrandPageProps) {
  return <BrandProductsPage brand={params.brand} />;
}
