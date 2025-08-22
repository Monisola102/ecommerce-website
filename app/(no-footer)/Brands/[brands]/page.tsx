import BrandProductsPage from "@/component/brand";

interface BrandPageProps {
  params: { brand: string };
}

export default async function BrandServerPage({ params }: BrandPageProps) {
  const { brand } = params;

  return (
    <div>
      <BrandProductsPage brand={brand} /> {/* Client component */}
    </div>
  );
}