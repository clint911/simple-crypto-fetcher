import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [search, setSearch] = useState("");
  const [crypto, setCrypto] = useState([]);

  const fetchCoinData = async () => {
    const res = await fetch(`https://api.coinstats.app/public/v1/coins?skip=0&limit=200&currency=USD`);
    const data = await res.json();
    setCrypto(data.coins);
  }

  useEffect(() => {
    fetchCoinData();
  }, []);

  return (
    <div className="App">
      <h1 className='title'>CryptoCurrency Finder</h1>
      <input
        type='text'
        placeholder='search in lowercase'
        onChange={(e) => {
          setSearch(e.target.value)
        }}
      />
      <table>
        <thead>
          <tr>
            <td>Rank</td>
            <td>Name</td>
            <td>Symbol</td>
            <td>Market Cap</td>
            <td>Price</td>
            <td>Available Supply</td>
          </tr>
        </thead>
        <tbody>
          {crypto.filter((val) => {
            return val.name.toLowerCase().includes(search)
          })
            .map((val, id) => {
              return (
                <tr key={id}>
                  <td className='rank'>{val.rank} </td>
                  <td className='logo'>
                    <a href={val.websiteUrl}>
                      <img src={val.icon} alt='logo' width='30px' />
                    </a>
                    <p>{val.name}</p>
                  </td>
                  <td className='symbol'>{val.symbol}</td>
                  <td>${Math.round(val.marketCap)}</td>
                  <td>${Math.round(val.price)}</td>
                  <td>${val.availableSupply}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default App;
