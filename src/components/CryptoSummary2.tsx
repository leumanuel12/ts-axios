import { Crypto } from "../Types";
import { useState, useEffect } from 'react';

export type AppProps = {
    crypto: Crypto,
    updateOwned: (crypto: Crypto, amount: number) => void
}

export default function CryptoSummary2({ crypto, updateOwned }: AppProps): JSX.Element {
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        //console.log(amount)
    })

    return (<>
        <div key={crypto.id} className="mx-3 py-3 flex items-center">
            <span className="px-2 w-1/2">{crypto.name} : <b>${crypto.current_price}</b> <span className="float-right pr-3">x</span></span>
            <input
                type="number"
                style={{ width: 100 }}
                className='block border border-gray-400 rounded-md px-2 flex-shrink min-w-0'
                onChange={(e) => {
                    setAmount(parseFloat(e.target.value))
                    updateOwned(crypto, parseFloat(e.target.value))
                }}
                value={amount} />
            <span className="px-2 font-medium w-1/3"> = ${amount ? (amount * crypto.current_price).toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2 }) : '0.00' }</span>
        </div>
    </>);
}