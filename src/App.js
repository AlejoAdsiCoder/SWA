import logo from './logo.svg';
import './App.css';
import { List } from './components/Characters/List';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <List />
      </header>
    </div>
  );
}

export default App;
