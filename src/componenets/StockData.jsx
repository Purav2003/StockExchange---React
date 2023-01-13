import { useState, useEffect } from "react"
import finhub from "../apis/finhub"

export const StockData = ({ symbol }) => {
    const [stockData, setStockData] = useState()
    useEffect(() => {
        let isMounted = true;
        const fetchData = async () => {
            try {
                const response = await finhub.get("/stock/profile2", {
                    params: {
                        symbol
                    }
                })
                if (isMounted) {
                    setStockData(response.data)
                }
            }

            catch (err) {

            }
        }
        fetchData()
        return () => (isMounted = false);
    }, [symbol])
    return <div><br></br><br></br>
        {stockData && (
            <div className="row m-4">
                <div className="col">
                    <div className="pt-2">
                        <span className="fw-bold">Name:&nbsp;</span>
                        {stockData.name}
                    </div>
                    <div className="pt-2">
                        <span className="fw-bold">Country:&nbsp;</span>
                        {stockData.country}

                    </div>
                    <div className="pt-2">
                        <span className="fw-bold">Ticker:&nbsp;</span>
                        {stockData.ticker}

                    </div>
                </div>
                <div className="col">
                    <div className="pt-2">
                        <span className="fw-bold">Exchange:&nbsp;</span>
                        {stockData.exchange}

                    </div>
                    <div className="pt-2">
                        <span className="fw-bold">Industry:&nbsp;</span>
                        {stockData.finnhubIndustry}

                    </div>
                    <div className="pt-2">
                        <span className="fw-bold">IPO:&nbsp;</span>
                        {stockData.ipo}

                    </div>
                </div>
                <div className="col">
                    <div className="pt-2">
                        <span className="fw-bold">MarketCap:&nbsp;</span>
                        {stockData.marketCapitalization}

                    </div>
                    <div className="pt-2">
                        <span className="fw-bold">Shares Outstanding:&nbsp;</span>
                        {stockData.shareOutstanding}
                    </div>
                    <div className="pt-2">
                        <span className="fw-bold">URL:&nbsp;</span>
                        <a href={stockData.weburl}>Company URL</a>
                    </div>
                </div>
            </div>
        )}
    </div>
}