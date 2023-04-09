import './App.css';
import Demo from './components/demo/Demo';
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
