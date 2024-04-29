import { Box } from '@chakra-ui/react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <Box width="full" minH="100vh">
      {children}
    </Box>
  );
};

export default Layout;
