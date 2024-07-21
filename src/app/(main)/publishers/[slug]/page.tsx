import Head from "next/head";
import { Box, Container } from "@mui/material";

export default function Publisher() {
  return (
    <>
      <Head>
        <title>Store</title>
      </Head>
      <Box
        sx={{
          backgroundColor: "background.default",
          py: 5,
        }}
      >
        <Container maxWidth="lg">Publisher</Container>
      </Box>
    </>
  );
};
