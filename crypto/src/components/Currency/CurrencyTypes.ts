export enum CryptoEnum{
    UP = "UP",
    DOWN = "DOWN",
    EQUAL = "EQUAL",
    NONE = 'NONE'
}

export interface CryptoCurrencyProps {
    cryptoName: string,
    removeCurrency: (cryptoName: string) => void
}