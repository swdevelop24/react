import logo from './logo.svg';
import './App.css';
import { useState } from 'react'
import CountBox from './component/CountBox';
import counterStore from './stores/counterStore';

function App() {

  //const[count, setCount] = useState(0);
  const { count, increase, decreaseBy1, decreaseByValue } = counterStore();


  return (
    <div className="App">
      <h1>count:{count}</h1>
      <div>
        <div style={{ margin: "20px" }}>
          <button onClick={increase}>increase</button>
        </div>
        <div style={{ margin: "20px" }}>
          <button onClick={decreaseBy1}>decrease by 1</button>
        </div>
        <div style={{ margin: "20px" }}>
          <button onClick={() => decreaseByValue(10)}>decrease by 10</button>
        </div>
        <CountBox count={count} />
      </div>
    </div>
  );
}

export default App;
