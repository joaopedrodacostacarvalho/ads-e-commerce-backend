"use client";

import { Box, Typography } from "@mui/material";
import Image from "next/image";
import type { CartItem } from "../../context/_CartContext";

// import { CartItem as CartItemType } from "@/app/context/_CartContext";

type Props = {
  item: CartItem;
};

export default function CartItem({ item }: Props) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: 2,
        mb: 2,
        alignItems: "center",
      }}
    >
      {/* IMAGEM */}
      <Image
        src={`/products/${item.productId}.jpg`} // ajuste se necessário
        alt={item.name}
        width={64}
        height={64}
        style={{ borderRadius: 8, objectFit: "cover" }}
      />

      {/* INFO */}
      <Box sx={{ flex: 1 }}>
        <Typography fontWeight="bold">{item.name}</Typography>
        <Typography variant="body2">
          Quantidade: {item.quantity}
        </Typography>
        <Typography variant="body2">
          R$ {item.price}
        </Typography>
      </Box>
    </Box>
  );
}
