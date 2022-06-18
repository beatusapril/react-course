import { useEffect, useRef, useState } from "react";
import { API_KEY } from "../Crypto/CryptoConsts";
import { CryptoCurrencyProps, CryptoEnum } from "./CurrencyTypes";
import './Currency.css'

function usePrevious(value: Number | null) {
    const ref = useRef<Number | null>(null);
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function CryptoCurrency(props: CryptoCurrencyProps) {
    const _fixNumber = 5;
    const [usd, setUsd] = useState<Number | null>(null);
    const [statusClassname, setStatusClassname] = useState('');
    const [timerId, setTimerId] = useState<number | undefined>(undefined);
    const [timerPauseId, setTimerPauseId] = useState<number | undefined>(undefined);
    const prevUsd = usePrevious(usd);

    useEffect(() => {
        fetchData();
        return () => {
            window.clearTimeout(timerId);
            window.clearTimeout(timerPauseId);
        }
    }, []) 

     const fetchData = () => {
        fetch(`https://min-api.cryptocompare.com/data/price?fsym=${props.cryptoName}&tsyms=USD&api_key=${API_KEY}`, { mode: 'cors' })
            .then(res => res.json())
            .then(
                (result) => {
                    let number = Number(result.USD);
                    setUsd(number);
                    let timerId = window.setTimeout(() => fetchData(), 10000);
                    setTimerId(timerId)
                },
                (error) => {
                    console.log(error);
                    let timerId = window.setTimeout(() => fetchData(), 10000);
                    setTimerId(timerId);
                }
            )
    }
 
    const remove = () => {
        props.removeCurrency(props.cryptoName);
    }

    useEffect(() => {
        if (prevUsd && usd != null && prevUsd.toFixed(_fixNumber) !== usd.toFixed(_fixNumber)) {
            if (prevUsd.toFixed(_fixNumber) > usd.toFixed(_fixNumber)) {
                setStatusAndChangeClass(CryptoEnum.DOWN);
                return;
            }
            if (prevUsd.toFixed(_fixNumber) < usd.toFixed(_fixNumber)) {
                setStatusAndChangeClass(CryptoEnum.UP);
                return;
            }
        }
        if (prevUsd === usd ) {
           let timerPauseId = window.setTimeout( () => setStatusAndChangeClass(CryptoEnum.EQUAL), 3000);
           setTimerPauseId(timerPauseId);
       } 
    }, [usd, timerId, prevUsd])

    const setStatusAndChangeClass = (status: CryptoEnum) => {
            setClassStatus(status);
    }

    function setClassStatus(status: CryptoEnum) {
        switch (status) {
            case CryptoEnum.DOWN: { setStatusClassname(String('crypto-status_down')); };
                break;
            case CryptoEnum.EQUAL: { setStatusClassname(String('crypto-status_eq')); };
                break;
            case CryptoEnum.UP: { setStatusClassname(String('crypto-status_up')); };
                break;
            default: setStatusClassname('');
        }
    }

    return <tr className="row">
        <td className="cryptoName">{props.cryptoName}</td>
        <td className="usd">{usd}</td>
        <td className='grow'><div className={"crypto-status " + statusClassname}></div></td>
        <td><button onClick={remove} className="remove"></button></td>
    </tr>
}