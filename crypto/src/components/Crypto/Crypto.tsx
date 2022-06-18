import { useState } from "react";
import { CryptoInput } from "../CryptoInput/CryptoInput";
import { CryptoList } from "../CryptoList/CryptoList";
import { API_KEY } from "./CryptoConsts";
import './Crypto.css'
import { Modal } from "../Modal/Modal";

export function Crypto() {
    const [cryptoCurriensies, setCryptoCurriensies] = useState<string[]>(['LUNA', 'BNB', 'XRP', 'BTC']);
    const [error, setError] = useState('');

    function removeCurrency(cryptoName: string) {
        let filteredCoins = cryptoCurriensies.filter(coin => coin !== cryptoName)
        setCryptoCurriensies(filteredCoins);
    }

    const add = (name: string) => {
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${name}&tsyms=USD&api_key=${API_KEY}`, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.Response === 'Error') {
                        addError(name, result.Message);
                        return;
                    }
                    addNameToState(name);
                },
                (error) => {
                    addError(name, error);
                }
            )
    }

    function addNameToState(name: string) {
        let filteredCoins = cryptoCurriensies.filter(coin => coin == name);
        if (filteredCoins.length > 0) {
            return;
        }
        let coins = [...cryptoCurriensies, name];
        setCryptoCurriensies(coins);
    }

    function addError(name: string, error: string) {
        setError(`Error occurred: not found crypto with name = ${name} in base ` + error)
    }

    function clearMessage() {
        setError('');
    }

    return <div className="crypto">
        <h1 className="header">CryptoMoney</h1>
        <CryptoList cryptoCurrensies={cryptoCurriensies} removeCurrency={removeCurrency} />
        <CryptoInput add={add} />
        <Modal message={error} title={'Error'} clearMessage={clearMessage} />
    </div>
}
