export interface ModalProps{
    title: string,
    message: string,
    clearMessage: () => void
}

export interface ModalState{
    errorMessage: string 
}