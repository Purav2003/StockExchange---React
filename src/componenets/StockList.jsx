import { useState, useEffect, useContext } from "react"
import finhub from "../apis/finhub";
import { useNavigate } from "react-router-dom";
import * as icons from "react-icons/bs"
import * as icon from "react-icons/ri"
import { WatchListContext } from "../context/watchListContext";
import { Loading } from "../pages/Loading"

export const StockList = () => {
    const [stock, setStock] = useState()
    const [loading,setLoading]=useState(false)
    const { watchList, deleteStock } = useContext(WatchListContext)
    const navigate = useNavigate()

    const changeColor = (change) => {
        return change > 0 ? "success2" : "danger2"
    }
    const changeBack = (change) => {
        return change > 0 ? "success1" : "danger1"
    }

    const renderIcon = (change) => {
        return change < 0 ? <icons.BsFillCaretDownFill /> : <icons.BsFillCaretUpFill />
    }
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            setLoading(true)
            try {
                const responses = await Promise.all(watchList.map((stock) => {                
                    return finhub.get("/quote", {
                        params: {
                            symbol: stock
                        }
                    })
                }))
                // console.log(responses)
                const data = responses.map((response) => {
                    return {
                        data: response.data,
                        symbol: response.config.params.symbol
                    }

                })
                // console.log(data)
                if (isMounted) {
                    setStock(data)

                }

            } catch (err) {
                console.log(err)
            }
            setLoading(false)
        }
        fetchData()
        return () => (isMounted = false)
    }, [watchList])

    const handleStockSelect = (symbol) => {
        navigate(`detail/${symbol}`)
    }
    if(loading){
        return <Loading></Loading>
    }
    return <div className="col-md-7 data rounded " style={{ 'margin-left': '200px' }}>
        <table className="table">
            <thead>
                <div className="demo demo-2">
                    <div scope="col" className="fw-bold">Name</div>
                    <div scope="col" className="fw-bold">Last</div>
                    <div scope="col" className="fw-bold">Chg</div>
                    <div scope="col" className="fw-bold">Chg%</div>
                    <div scope="col" className="fw-bold">High</div>
                    <div scope="col" className="fw-bold">Low</div>
                    <div scope="col" className="fw-bold">Open</div>
                    <div scope="col" className="fw-bold">Pclose</div>
                </div>
            </thead>
            <tbody >
                {
                    stock?.map((stockData) => {
                        return (
                            <div className={`${changeBack(stockData.data.d)} demo demo-1 rounded`} onClick={() => handleStockSelect(stockData.symbol)}>
                                <div>{stockData.symbol}</div>
                                <div>{stockData.data.c} </div>
                                <div className={`text-${changeColor(stockData.data.d)} fw-bold`}> {stockData.data.d} {
                                    renderIcon(stockData.data.d)
                                } </div>
                                <div className={`text-${changeColor(stockData.data.d)} fw-bold`}> {stockData.data.dp} {
                                    renderIcon(stockData.data.d)
                                }  </div>
                                <div>{stockData.data.h}</div>
                                <div>{stockData.data.l}</div>
                                <div>{stockData.data.o}</div>
                                <div>{stockData.data.pc}</div>
                                <button onClick={(e) => {
                                    e.stopPropagation()
                                    deleteStock(stockData.symbol)
                                }} className="btn btn-danger btn-del" style={{ fontSize: '15px', color: 'black' }}><icon.RiDeleteBin5Line></icon.RiDeleteBin5Line></button>
                            </div>

                        )
                    })}
            </tbody>

        </table>
    </div>
}