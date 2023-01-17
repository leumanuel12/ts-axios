import { Crypto } from "../Types";

export type AppProps = {
    crypto: Crypto,
}

export default function CryptoSummary({crypto}: AppProps) : JSX.Element{
    return (<>
        <div key={crypto.id} className="m-3">{crypto.name +' '+ crypto.current_price}</div>
    </>);
}