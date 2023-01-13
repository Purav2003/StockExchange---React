import { useState, useEffect, useContext } from "react"
import finhub from "../apis/finhub"
import { WatchListContext } from "../context/watchListContext"
import no from "./no-res.png"

export const AutoComplete = () => {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])
    const {addStock} = useContext(WatchListContext)
    const renderDropdown = () => {
        const dropdown = search ? "show" : " "
        let count = 0
        if (results.length === 0) {
            count = 1
        }
        else {
            count = 0
        }
        if (count === 0) {
            return (
                <ul className={`dropdown-menu ${dropdown}`} style={{ height: '300px', overflowY: 'scroll', overflowX: 'hidden', cursor: 'pointer' }}>
                    {results?.map((result) => {
                        return (
                            <li onClick={() => {addStock(result.symbol)
                            setSearch("")}} className="dropdown-item">{result.description}&nbsp;({result.symbol})&nbsp;</li>
                        )
                    })}
                </ul>
            )
        }
        if (count === 1) {
            return (
                <ul className={`dropdown-menu ${dropdown}`} style={{ padding: '30px 10px 30px 10px', 'text-align': 'center' }}>
                    <li> <img src={no} /></li>
                </ul>
            )
        }
    }
    useEffect(() => {
        let isMounted = true
        const fetchData = async () => {
            try {
                const response = await finhub.get("/search", {
                    params: {
                        q: search
                    }
                })
                if (isMounted) {
                    setResults(response.data.result)
                }
            }
            catch (err) {

            }
        }
        if (search.length > 0) {
            fetchData()
        }
        else {
            setResults([])
        }
        return () => (isMounted = false)
    }, [search])
    return <div className="col-md-4 p-5 mx-auto">
        <div className="form-floating dropdown shadow-5 " >
        
            <input className="form-control" id="search" placeholder="search" value={search} onChange={(e) => setSearch(e.target.value)} autoComplete='off'></input>
            <label htmlFor="search">Search</label>
            {renderDropdown()}
        </div>
    </div>
}
 