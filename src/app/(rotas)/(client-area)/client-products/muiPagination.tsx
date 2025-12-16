import { Pagination, Stack } from "@mui/material";
import { useProducts } from "./_NewProductContext";


export function ProductPagination() {
  const { meta, page, setPage } = useProducts();

  if (!meta) return null;

  return (
    <Stack alignItems="center" mt={4}>
      <Pagination
        count={meta.totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
      />
    </Stack>
  );
}
