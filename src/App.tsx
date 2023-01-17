import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CryptoSummary from './components/CryptoSummary';
import { Crypto } from './Types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Line } from "react-chartjs-2";
import type { ChartData, ChartOptions } from 'chart.js';
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();
  const [data, setData] = useState<ChartData<'line'>>();
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  });

  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    axios.get(url).then((response) => {
      //console.log(response.data)
      setCryptos(response.data)
    })
  }, [])

  return (
    <div className="table-auto mt-5 mx-5">
      <h2>Crypto Currencies</h2><br/>

      <select 
        className='border border-gray-400 rounded-md px-2'
        onChange={(e) => {
          //console.log(e.target.value)
          const c = cryptos?.find( (x) => x.id === e.target.value );
          setSelected(c);
          //console.log(c);

          axios.get(`https://api.coingecko.com/api/v3/coins/${c?.id}/market_chart?vs_currency=usd&days=30&interval=daily`)
          .then( (response) => {
            //console.log(response.data)
            const priceLabel = response.data.prices.map( (price: number[]) => {
               return moment.unix(price[0] / 1000).format('MM-DD-YYYY')
              } );
            const priceData = response.data.prices.map( (price: number[]) => { return price[1] } );
            //console.log(label)
            setData({
              labels: priceLabel,
              datasets: [
                {
                  label: 'Dataset 1',
                  data: priceData,
                  borderColor: 'rgb(255, 99, 132)',
                  backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }
              ],
            })
          } )
        }}
        defaultValue="value"
        >
          <option value="default">Select an option</option>
        {cryptos ? cryptos.map((crypto) => {
          return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
        }) : null}
      </select>

      {selected ? <CryptoSummary crypto={selected} /> : null}

      {data ? <div className="max-w-2xl"><Line options={options} data={data} /></div> : null}

    </div>
  );
}