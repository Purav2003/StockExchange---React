import { StockList } from "../componenets/StockList"
import { AutoComplete } from "../componenets/AutoComplete"

export const StockOverviewPage = () =>{
    return <div>Stock Overview Page
        <AutoComplete />
        <StockList />
    </div>
}