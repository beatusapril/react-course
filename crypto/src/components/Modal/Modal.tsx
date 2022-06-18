import React, { useEffect, useState } from "react";
import { ModalProps, ModalState } from "./ModalTypes";
import './Modal.css'

export function Modal(props: ModalProps) {
    /* constructor(props: ModalProps) {
        super(props);
        this.onClose = this.onClose.bind(this);
        this.state = {errorMessage: ''}
    } */
    const [errorMessage, setErrorMessage] = useState('');

    const onClose = () => {
        //this.setState({errorMessage: ''});
        setErrorMessage('');
        props.clearMessage();
    }

    /* componentDidUpdate(prevProps: ModalProps){
        if (prevProps.message !== this.props.message){
            this.setState({errorMessage: this.props.message})
        }
    } */
    useEffect(() => {
        setErrorMessage(props.message)
    }, [props.message]);

    if (!errorMessage) return null

    return (
        <div className='modal' onClick={onClose}>
            <div className='modal-dialog' onClick={e => e.stopPropagation()}>
                <div className='modal-header'>
                    <h3 className='modal-title'>{props.title}</h3>
                </div>
                <div className='modal-body'>
                    <div className='modal-content'>{props.message}</div>
                </div>
                <div className='modal-footer'>
                    <button className="button-close" onClick={onClose}></button>
                </div>
            </div>
        </div>
    )
}