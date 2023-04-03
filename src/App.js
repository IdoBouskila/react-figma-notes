import './App.css';
import Demo from './components/Demo';
import Header from './components/Header';
import Page from './components/Page';

function App() {
  return (
    <>
      <Header />
      
      <Page>
        <Demo />
      </Page>
    </>
  );
}

export default App;
