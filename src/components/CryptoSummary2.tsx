import { Crypto } from "../Types";
import { useState, useEffect } from 'react';

export type AppProps = {
    crypto: Crypto,
}

export default function CryptoSummary2({ crypto }: AppProps): JSX.Element {
    const [amount, setAmount] = useState<string>('0');

    useEffect(() => {
        //console.log(amount)
    })

    return (<>
        <div key={crypto.id} className="mx-3 border-b border-gray-200 py-3">
            <span className="px-2">{crypto.name} : <span className="font-medium">${crypto.current_price}</span> x</span>
            <input
                type="number"
                style={{ width: 100 }}
                className='border border-gray-400 rounded-md px-2'
                onChange={(e) => {
                    setAmount(e.target.value)
                }}
                value={amount} /> = 
            <span className="px-2 font-medium">${amount ? (parseFloat(amount) * crypto.current_price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2 }) : null }</span>
        </div>
    </>);
}