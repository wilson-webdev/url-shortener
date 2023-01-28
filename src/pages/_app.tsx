import type { AppType } from "next/app";
import { trpc } from "@/utils/trpc";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { PageProps } from "@/types/page-props";

const MyApp: AppType<PageProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Box
        as="main"
        w="100vw"
        display="flex"
        justifyContent="center"
        p="5"
        sx={{
          "& > *": {
            w: "100%",
            maxW: "20rem",
          },
        }}
      >
        <Component {...pageProps} />
      </Box>
    </ChakraProvider>
  );
};

export default trpc.withTRPC(MyApp);
