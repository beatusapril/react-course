export interface CryptoListProps{
    cryptoCurrensies: string[];
    removeCurrency: (cryptoName: string) => void
}