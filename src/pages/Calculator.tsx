import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Crypto } from '../Types';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import CryptoSummary2 from '../components/CryptoSummary2';
import type { ChartData, ChartOptions } from 'chart.js';
import { Pie } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function Calculator() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto[]>([]);
  const [data, setData] = useState<ChartData<'pie'>>();

  useEffect(() => {
    const url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
    axios.get(url).then((response) => {
      //console.log(response.data)
      setCryptos(response.data)
    })
  }, [])

  function updateOwned(crypto: Crypto, amount: number): void {
    //console.log(crypto, amount)
    let temp = [...selected]
    //console.log(temp)
    let tempObject = temp.find((c) => c.id === crypto.id)
    if (tempObject) {
      //console.log(tempObject)
      tempObject.owned = amount
      //console.log(tempObject.owned)
      setSelected(temp)
    }
  }


  useEffect(() => {
    //console.log(selected)
    setData({
      labels: selected.map( (x) => x.name ),
      datasets: [
        {
          label: 'Amount in USD',
          data: selected.map( (x) => (x.owned * x.current_price) ),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    })
  }, [selected])

  return (
    <div className="table-auto mt-5 mx-3 md:flex">
      <div className='w-1/2'>
      <h3>Crypto Calculator</h3><br />
        <select
          className='border border-gray-400 rounded-md px-2 mb-3'
          onChange={(e) => {
            //console.log(e.target.value)
            const c = cryptos?.find((x) => x.id === e.target.value) as Crypto;
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

        {selected?.map((s) => {
          return <CryptoSummary2 crypto={s} updateOwned={updateOwned} />
        })}

        {selected ? (
            <div className='m-3 px-3 py-2 border-2 border-gray-400 rounded'>

              <span>Grand Total : </span>

              <span className='font-bold px-3'>${selected.map((s) => {
                if(isNaN(s.owned)){
                    return 0;
                }
                return s.current_price * s.owned
              }).reduce((prev, curr) => {
                return prev + curr
              }, 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>

          </div>
        ) : null}
        </div>

        <div className='md:w-1/2'>{data ? <Pie data={data} /> : null }</div>

    </div>
  );
}