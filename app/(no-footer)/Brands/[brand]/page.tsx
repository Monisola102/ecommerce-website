import BrandProductsPage from "@/component/brand";

interface Props {
  params: { brand: string };
}

export default function BrandServerPage({ params }: Props) {
  const { brand } = params;

  return (
    <div>
      <h1>Brand: {brand}</h1>
      <BrandProductsPage brand={brand} /> {/* client component */}
    </div>
  );
}
