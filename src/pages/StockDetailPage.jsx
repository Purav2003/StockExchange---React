import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import finhub from "../apis/finhub"
import { StockChart } from "../componenets/StockChart"
import { StockData } from "../componenets/StockData"
import { useNavigate } from "react-router-dom";
import { Loading } from "./Loading"
const formatData = (data) => {
    return data.t.map((el, index) => {
        return {
            x: el * 1000,
            y: data.c[index]
        }
    })
}

export const StockDetailPage = () => {
    const [chartData, setChartData] = useState()
    const [loading,setLoading] = useState()
    const { symbol } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            const date = new Date()
            const currentTime = Math.floor(date.getTime() / 1000)
            let oneDay
            if (date.getDay() === 6) {
                oneDay = currentTime - (2 * 24 * 60 * 60)
            }
            else if (date.getDay() === 7) {
                oneDay = currentTime - (3 * 24 * 60 * 60)
            }
            else {
                oneDay = currentTime - (24 * 60 * 60)
            }
            const oneWeek = currentTime - (7 * 24 * 60 * 60)
            const oneYear = currentTime - (365 * 24 * 60 * 60)
            setLoading(true)
            try {

                const responses = await Promise.all([finhub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: oneDay,
                        to: currentTime,
                        resolution: 30
                    }
                }),
                finhub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: oneWeek,
                        to: currentTime,
                        resolution: 60
                    }
                }),
                finhub.get("/stock/candle", {
                    params: {
                        symbol,
                        from: oneYear,
                        to: currentTime,
                        resolution: "W"
                    }
                })
                ])
                console.log(responses)
                setChartData({
                    day: formatData(responses[0].data),
                    week: formatData(responses[1].data),
                    year: formatData(responses[2].data)
                })
            }
            catch (err) {
                console.log(err)
            }
            setLoading(false)

        }
        fetchData()
    }, [symbol])
    const handleStockSelect = (symbol) =>{
        navigate(`/`)
    }
    if(loading){
        return <Loading ></Loading>

    }
    return <div>
        {chartData && (
            <div>
                <button className="btn btn-primary m-2 back-btn" onClick={() => handleStockSelect()}>Back</button>
                <StockChart chartData={chartData} symbol={symbol}></StockChart>
                <StockData symbol={symbol}/>
            </div>
        )}
    </div>
}
