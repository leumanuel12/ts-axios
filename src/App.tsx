import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

export type Crypto = {
  "id": string,
  "symbol": string,
  "name": string,
  "current_price": number,
  "high_24h": number,
  "low_24h": number,
  "ath": number,
  "atl": number
}

export default function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>();

  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    axios.get(url).then((response) => {
      //console.log(response.data)
      setCryptos(response.data)
    })
  }, [])

  return (
    <div className="table-auto mt-5 mx-5">

      <h2>Crypto Currencies</h2>

      <table className="mt-4">
        <thead>
          <tr>
            <td className='border border-gray-400 px-2'>ID</td>
            <td className='border border-gray-400 px-2'>Symbol</td>
            <td className='border border-gray-400 px-2'>Name</td>
            <td className='border border-gray-400 px-2'>Current Price</td>
            <td className='border border-gray-400 px-2'>High 24H</td>
            <td className='border border-gray-400 px-2'>Low 24H</td>
            <td className='border border-gray-400 px-2'>ATH</td>
            <td className='border border-gray-400 px-2'>ATL</td>
            </tr>
        </thead>
        <tbody>

      {cryptos ? cryptos.map( (crypto) => {
        return (
          <tr key={crypto.id}>
            <td className='border border-gray-400 px-2'>{crypto.id}</td>
            <td className='border border-gray-400 px-2'>{crypto.symbol}</td>
            <td className='border border-gray-400 px-2'>{crypto.name}</td>
            <td className='border border-gray-400 px-2'>{crypto.current_price}</td>
            <td className='border border-gray-400 px-2'>{crypto.high_24h}</td>
            <td className='border border-gray-400 px-2'>{crypto.low_24h}</td>
            <td className='border border-gray-400 px-2'>{crypto.ath}</td>
            <td className='border border-gray-400 px-2'>{crypto.atl}</td>
          </tr>
        )
      } ) : null}
      </tbody>
      </table>
    </div>
  );
}