import { StockList } from "../componenets/StockList"
import { AutoComplete } from "../componenets/AutoComplete"
import logo from "./logo.png"

export const StockOverviewPage = () =>{
    return <div>
        <div className="d-flex" style={{marginLeft:'450px'}}>
            <div style={{height:'50px'}}><img src={logo} className="text-center"></img></div>
            <div style={{height:'50px',marginTop:'75px',marginLeft:'-60px',fontFamily:'Raleway'}}><h3>Stock Search</h3></div></div>
        <AutoComplete />
        <StockList />
    </div>
}