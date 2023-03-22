import './App.css';
import Demo from './components/Demo';
import Header from './components/Header';
import Page from './components/Page';
import { ModeProvider } from './contexts/ModeProvider';

function App() {
  return (
    <ModeProvider>
      <Header />
      
      <Page>
        <Demo />
      </Page>
    </ModeProvider>
  );
}

export default App;
