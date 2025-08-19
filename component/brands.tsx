"use client";

import { FC } from "react";
import { useGetBrandsQuery } from "@/store/Features/brands/brand-api";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface Brand {
  _id: string;
  name: string;
  logo?: string;
}

const BrandsPage: FC = () => {
  const { data, isLoading, isError } = useGetBrandsQuery();
  console.log("🔎 Brands query result:", { data, isLoading, isError });

  const brands: Brand[] = data || [];

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="70vh">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Typography color="error" align="center" mt={4}>
        Failed to load brands. Please try again.
      </Typography>
    );
  }

  return (
    <div className="p-6">
      <Typography variant="h4" fontWeight="bold" gutterBottom align="center">
        Our Brands
      </Typography>

      {/* Tailwind Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
        {brands.map((brand) => (
          <Card
            key={brand._id}
            className="w-full max-w-xs rounded-xl shadow-md hover:-translate-y-1 hover:shadow-xl transition-transform duration-300"
          >
            {brand.logo && (
              <CardMedia
                component="img"
                height="140"
                image={brand.logo}
                alt={brand.name}
                className="object-contain p-4"
              />
            )}
            <CardContent className="text-center">
              <Typography variant="h6" fontWeight={600}>
                {brand.name}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default BrandsPage;
