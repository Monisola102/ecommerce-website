import BrandProductsPage from "@/component/brand";

type Params = { brand: string };

export default function BrandPage({ params }: { params: Params }) {
  return <BrandProductsPage brand={params.brand} />;
}
