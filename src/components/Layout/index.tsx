import { ReactNode } from "react";
import Box from "./Box";
import Navigation from "@components/Navigation";

type LayoutProps = {
  children: ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box
      css={{
        w: "100vw",
        h: "100vh",
      }}
    >
      <Navigation />
      <Box
        css={{
          p: "2rem",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
