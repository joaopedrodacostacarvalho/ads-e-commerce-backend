
"use client";

import {
  Drawer,
  Box,
  Typography,
  Divider,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { useCart } from "../../context/_CartContext";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function CartDrawer({ open, onClose }: Props) {
  const { cart } = useCart();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Drawer
      anchor={isMobile ? "bottom" : "right"}
      open={open}
      onClose={onClose}
      variant="temporary"
      slotProps={{
        paper: {
          sx: {
            width: isMobile ? "100%" : 380,
            height: isMobile ? "60vh" : "100%",
            borderTopLeftRadius: isMobile ? 16 : 0,
            borderTopRightRadius: isMobile ? 16 : 0,
          },
        },
      }}
    >
      <Box sx={{ display: "flex", flexDirection: "column", height: "100%" }}>
        {/* HEADER */}
        <Box sx={{ p: 2 }}>
          <Typography variant="h6">Meu carrinho</Typography>
        </Box>

        <Divider />

        {/* LISTA */}
        <Box sx={{ flex: 1, overflowY: "auto", p: 2 }}>
          {cart?.items.length ? (
            cart.items.map((item) => {
              // 🔍 LOGS IMPORTANTES
              console.log("ITEM DO CARRINHO:", item);
              console.log("IMAGE URL:", item.imageUrl);

              return (
                <Box
                  key={item.id}
                  sx={{
                    display: "flex",
                    gap: 2,
                    mb: 2,
                    alignItems: "center",
                  }}
                >
                  {/* 🖼️ IMAGEM */}
                  <Box
                    component="img"
                    src={item.imageUrl || "/placeholder.png"}
                    alt={item.name}
                    sx={{
                      width: 64,
                      height: 64,
                      objectFit: "cover",
                      borderRadius: 1,
                      backgroundColor: "#f5f5f5",
                    }}
                  />

                  {/* 📦 INFO */}
                  <Box sx={{ flex: 1 }}>
                    <Typography fontWeight="bold">
                      {item.name}
                    </Typography>

                    <Typography variant="body2">
                      Qtd: {item.quantity}
                    </Typography>

                    <Typography variant="body2">
                      R$ {item.price}
                    </Typography>
                  </Box>
                </Box>
              );
            })
          ) : (
            <Typography variant="body2">
              Carrinho vazio
            </Typography>
          )}
        </Box>
      </Box>
    </Drawer>
  );
}
