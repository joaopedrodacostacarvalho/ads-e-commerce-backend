"use client";


import { Box, Card, CardMedia, Container, styled, Typography } from "@mui/material";
import { useProducts } from "../../../context/_NewProductContext";
import { ProductPagination } from "./muiPagination";
import AddToCartButton from "../../../components/cartComponents/addToCartButton";
// import AddToCartButton from "../../../components/cartComponents/addToCartButton";


// import { MovieContainer, MovieCard, ContainerButn } from "./styles";
// import { ProductPagination } from "./ProductPagination";


export const MovieContainer = styled(Container)(({ theme }) => ({
  display: 'grid',
  maxWidth: 1300,
  // maxHeight: 1100,
  paddingTop: 10,
  overflow: 'auto',
  gap: 20,
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',

  marginTop: 20,
  marginBottom: 0,
  xs: '1fr',
  sm: 'repeat(2, 1fr)',
  md: 'repeat(3, 1fr)',
  lg: 'repeat(4, 1fr)',

  [theme.breakpoints.down('sm')]: {
    maxHeight: 500,
    maxWidth: 300,
    // margin: 0,
    paddinf: 0,
    margin: 'auto',
    mt: 10
  }

}))

export const MovieCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',

  marginBottom: 5,
  justifyContent: 'space-between'

}))

export const ContainerButn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '2px'

}))


export default function Products() {
  const { products, loading } = useProducts();

  if (loading) return <p>Carregando...</p>;

  return (
    <>
      <MovieContainer sx={{mt:8}} >
        {loading ? "CARREGANDO..." : loading}
        {products.map((item) => (
          <MovieCard key={item.id}>
            <CardMedia
              component="img"
              src={item.imageUrl}
              alt={item.name}
              height="315"
              sx={{
                width: "100%",
                height: 200,
                objectFit: "cover",
                backgroundColor: "#f5f5f5",
              }}
            />

            <Typography fontWeight="bold">{item.name}</Typography>
            <Typography variant="body2">{item.description}</Typography>
            <Typography variant="caption">
              Categoria: {item.categoryId}
            </Typography>

            <ContainerButn />
            <AddToCartButton productId={item.id} />
             {/* <NewAddCartButton productId={item.id} /> */}
             {/* <AddToCartButtont productId={item.id} /> */}
          </MovieCard>
        ))}
      </MovieContainer>

      <ProductPagination />
    </>
  );
}