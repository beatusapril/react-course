import React, { useState } from "react";
import { CryptoInputProps } from "./CryptoInputTypes";
import './CryptoInput.css'

export function CryptoInput(props: CryptoInputProps) {
    const [name, setName] = useState('');

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value)
    }

    const add = () => {
        if (name) {
            props.add(name);
            setName('');
        }
    }

    return (<div className="row-input">
        <input className="input_add" onChange={onChange} value={name}></input>
        <button className="add" onClick={add}></button>
    </div>)
}