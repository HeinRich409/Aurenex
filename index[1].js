
import { useState, useEffect } from "react";

export default function Home() {
  const [prices, setPrices] = useState({});
  const [balance, setBalance] = useState(10000);
  const [portfolio, setPortfolio] = useState({});

  useEffect(() => {
    fetch("https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=usd")
      .then(res => res.json())
      .then(data => setPrices(data));
  }, []);

  const buyCoin = (coin) => {
    const price = prices[coin]?.usd;
    if (!price) return;
    if (balance >= price) {
      setBalance(balance - price);
      setPortfolio({
        ...portfolio,
        [coin]: (portfolio[coin] || 0) + 1,
      });
    }
  };

  return (
    <div>
      <h1>Trading Plattform (Demo)</h1>
      <p>Guthaben: ${balance.toFixed(2)} USDT</p>
      <div>
        {Object.entries(prices).map(([coin, data]) => (
          <div key={coin}>
            <h2>{coin.toUpperCase()}</h2>
            <p>${data.usd}</p>
            <button onClick={() => buyCoin(coin)}>Kaufen</button>
          </div>
        ))}
      </div>
      <div>
        <h2>Dein Portfolio</h2>
        <ul>
          {Object.entries(portfolio).map(([coin, amount]) => (
            <li key={coin}>{coin.toUpperCase()}: {amount} Stück</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
