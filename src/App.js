import './App.css';
import Header from './components/Header';
import Page from './components/Page';
import { ModeProvider } from './contexts/ModeProvider';

function App() {
  return (
    <ModeProvider>
      <Header />
      <Page />
    </ModeProvider>
  );
}

export default App;
