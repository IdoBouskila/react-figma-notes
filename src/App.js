import './App.css';
import Demo from './components/Demo';
import SwitchModeButton from './components/SwitchModeButton';
import Page from './components/Page';

function App() {
  return (
    <>
      <SwitchModeButton />
      
      <Page>
        <Demo />
      </Page>
    </>
  );
}

export default App;
