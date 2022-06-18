import { CryptoCurrency } from "../Currency/Currency";
import { CryptoListProps } from "./CryptoListTypes";
import './CryptoList.css'


export function CryptoList(props: CryptoListProps) {

    return <table>
        <thead>
            <tr className="rowHeader">
                <th className="cryptoHeader">Crypto</th>
                <th className="usdHeader">USD</th>
                <th className="statusHeader">Status</th>
                <th className="removeHeader"></th>
            </tr>
        </thead>
        <tbody>
            {props.cryptoCurrensies.map((crypto, index) => <CryptoCurrency key={index} 
            cryptoName={crypto} 
            removeCurrency={props.removeCurrency} />)}
        </tbody>
    </table>
}