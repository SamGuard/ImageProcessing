import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <button onClick = { () => {
        console.log("HI");
      }}>
        Start batch processing
      </button>
    </div>
  );
}

export default App;
