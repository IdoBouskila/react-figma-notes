import './App.css';
import Header from './components/Header';
import Page from './components/Page';
import { SettingsProvider } from './contexts/SettingsProvider';

function App() {
  return (
    <SettingsProvider>
      <Header />
      <Page />
    </SettingsProvider>
  );
}

export default App;
