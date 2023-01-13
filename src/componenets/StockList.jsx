import { useState, useEffect ,useContext} from "react"
import finhub from "../apis/finhub";
import { useNavigate } from "react-router-dom";
import * as icons from "react-icons/bs"
import * as icon from "react-icons/ri"
import { WatchListContext } from "../context/watchListContext";
export const StockList = () => {
    const [stock, setStock] = useState()
    const {watchList} = useContext(WatchListContext)
    const navigate = useNavigate()

    const changeColor =(change) => {
        return change>0?"success2":"danger2"
    }
    const changeBack=(change) => {
        return change>0?"success1":"danger1"
    }

    const renderIcon= (change) =>{
        return change<0?<icons.BsFillCaretDownFill/>:<icons.BsFillCaretUpFill/>
    }
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
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

        }
        fetchData()
        return () => (isMounted = false)
    }, [watchList])

    const handleStockSelect = (symbol) =>{
        navigate(`detail/${symbol}`)
    }

    return <div className="col-md-7 data rounded " style={{'margin-left':'200px'}}>
        <table className="table">
            {/* <thead>
                <tr>
                    <th scope="col" className="fw-bold">Name</th>
                    <th scope="col" className="fw-bold">Last</th>
                    <th scope="col" className="fw-bold">Chg</th>
                    <th scope="col" className="fw-bold">Chg%</th>
                    <th scope="col" className="fw-bold">High</th>
                    <th scope="col" className="fw-bold">Low</th>
                    <th scope="col" className="fw-bold">Open</th>
                    <th scope="col" className="fw-bold">Pclose</th>
                </tr>
            </thead>
      */}
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
                        // <tr key={stockData.symbol} className="shadow-5"> 
                        //     <td>{stockData.symbol}</td>
                        //     <td>{stockData.data.c} </td>
                        //     <td className={`text-${changeColor(stockData.data.d)} fw-bold`}> {stockData.data.d} {
                        //         renderIcon(stockData.data.d)
                        //     } </td>
                        //     <td className={`text-${changeColor(stockData.data.d)} fw-bold`}> {stockData.data.dp} {
                        //         renderIcon(stockData.data.d)
                        //     }  </td>
                        //     <td>{stockData.data.h}</td>
                        //     <td>{stockData.data.l}</td>
                        //     <td>{stockData.data.o}</td>
                        //     <td>{stockData.data.pc}</td>                            
                        //     </tr>
                        <div  className={`${changeBack(stockData.data.d)} demo demo-1 rounded`} onClick={() => handleStockSelect(stockData.symbol)}>
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
                                                   </div>
                    )
                })}
            </tbody>

        </table>
    </div>
}