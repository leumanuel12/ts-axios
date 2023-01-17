import '../App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import CryptoSummary from '../components/CryptoSummary';
import { Crypto } from '../Types';
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

export default function PieChart() {
  const [cryptos, setCryptos] = useState<Crypto[] | null>(null);
  const [selected, setSelected] = useState<Crypto | null>();
  const [data, setData] = useState<ChartData<'line'>>();
  const [options, setOptions] = useState<ChartOptions<'line'>>({
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        display: false,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  });

  const [days, setDays] = useState<number>(29);


  useEffect( () => {
    if(!selected) return;
      //note: for 'days' state, I noticed that if days state is a string, the chart will not render properply if in string format.
      //making it a number format and parsing the set days state in the url fixed this issue (make sure that the value day=1).
      //in this implementation however, I declared the variable as a number also the days value in the dropdown sa int.
      const url = `https://api.coingecko.com/api/v3/coins/${selected?.id}/market_chart?vs_currency=usd&days=${days}&interval=${days === 1 ? 'hourly' : 'daily'}`
      axios.get(url)
      .then( (response) => {
        //console.log(response.data)
        const priceLabel = response.data.prices.map( (price: number[]) => {
          return moment.unix(price[0] / 1000).format(days === 1 ? 'HH:MM' : 'MM-DD-YYYY')
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

      setOptions({
        responsive: true,
        plugins: {
          legend: {
            position: 'top' as const,
            display: false,
          },
          title: {
            display: true,
            text: selected?.name+' Prices over the past ' + (days===1 ? '' : (days+1)) + (days===1 ? 'hours' : ' days'),
          },
        },
      })
  },[selected, days] )


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
          //console.log(c)
        }}
        defaultValue="value"
        >
          <option value="default">Select an option</option>
        {cryptos ? cryptos.map((crypto) => {
          return <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
        }) : null}
      </select>

      <select 
        className='border border-gray-400 rounded-md px-2 mx-2'
        onChange={(e) => {
          //console.log(selectedCurrency)
          setDays(parseInt(e.target.value))
        }}
        >
        <option value={29}>30 days</option>
        <option value={14}>15 days</option>
        <option value={6}>7 days</option>
        <option value={1}>1 day</option>
      </select>

      {selected ? <CryptoSummary crypto={selected} /> : null}

      {data ? <div className="max-w-2xl"><Line options={options} data={data} /></div> : null}

    </div>
  );
}