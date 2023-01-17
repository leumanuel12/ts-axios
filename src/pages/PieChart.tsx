import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Crypto } from '../Types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import CryptoSummary2 from '../components/CryptoSummary2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function PieChart() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto[]>([]);


  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    axios.get(url).then((response) => {
      //console.log(response.data)
      setCryptos(response.data)
    })
  }, [])

  useEffect( () => {
    //console.log(selected)
  }, [selected] )

  return (
    <div className="table-auto mt-5 mx-5">
      <h2>Crypto Calculator</h2><br/>

      <select 
        className='border border-gray-400 rounded-md px-2 mb-3'
        onChange={(e) => {
          //console.log(e.target.value)
          const c = cryptos?.find( (x) => x.id === e.target.value) as Crypto;
          setSelected([...selected, c]);
          //console.log(selected)
        }}
        defaultValue="value"
        >
          <option value="default">Select an option</option>
        {cryptos ? cryptos.map((crypto) => {
          return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
        }) : null}
      </select>


      {selected?.map( (s) => {
        return <CryptoSummary2 crypto={s} />
      } )}


    </div>
  );
}