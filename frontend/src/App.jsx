import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Home from './pages/Home';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Home />
      </Router>
    </ChakraProvider>
  );
}

export default App;
