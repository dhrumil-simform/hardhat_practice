import "./App.css";

import Allowance from "./components/Allowance";
import Approve from "./components/Approve";
import SendCoins from "./components/SendCoins";
import SendCoinsFrom from "./components/SendCoinsFrom";

const DemoTokenAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>Send Coins</p>
        <SendCoins />
        <br />
        <p>Approve</p>
        <Approve />
        <br />
        <p>Check Allowance</p>
        <Allowance />
        <br />
        <p>Send Coins from Other Account</p>
        <SendCoinsFrom />
      </header>
    </div>
  );
}

export default App;