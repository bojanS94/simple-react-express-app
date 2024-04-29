import { ChakraProvider } from '@chakra-ui/react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Layout from './Layout';
import Profile from './components/Profile';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Layout>
          <Routes>
            <Route
              path="/"
              element={
                <Profile
                  username="JohnDoe"
                  images={[]}
                  comments={[]}
                  onImageUpload={function (file: File): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              }
            />
          </Routes>
        </Layout>
      </Router>
    </ChakraProvider>
  );
}

export default App;
