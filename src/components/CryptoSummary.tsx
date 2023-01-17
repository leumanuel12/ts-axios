import { Crypto } from "../Types";

export type AppProps = {
    crypto: Crypto,
}

export default function CryptoSummary({crypto}: AppProps) : JSX.Element{
    return (<>
        <p key={crypto.id}>{crypto.name +' '+ crypto.current_price}</p>
    </>);
}