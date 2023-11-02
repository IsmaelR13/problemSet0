import logo from './logo.svg';
import './App.css';
import Greeting from './greeting';

function App() {
  return (
    <div>
      This is my greeting application
      <Greeting name= "Bob"></Greeting>
      <Greeting />
    </div>
  );
}

export default App;
