import Chart from "react-apexcharts"
import { useState } from "react"
export const StockChart = ({ chartData, symbol }) => {
    const [dateFormat,setDateFormat] = useState("24h")
    const { day, week, year } = chartData
    const determineTimeFormat = () => {
        switch(dateFormat){
            case "24h":
                return day
            
            case "1w":
                return week

            case "1y":
                return year
            
            default:
                return day
        }
    }    
    const color =  determineTimeFormat()[determineTimeFormat().length-1].y - determineTimeFormat()[0].y > 0 ? "#28c281" : "#ed3419" 
    const options = {   
        colors:[color] ,
        title: {
            text: symbol,
            align: "center",
            style: {
                fontSize: "20px",
                fontFamily: "SF Pro Display",
                fontWeight: 700
            }
        },
        chart: {
            id: "Stock Data",
            animations: {
                speed: 1300
            }
        },        
        xaxis: {
            type: "datetime",
            labels:{
                datetimeUTC: false
            }
        },
        tooltip:{
            x:{
                fomat:"MMM dd HH:MM"
            }
        }

    }

    const series = [{
        name: symbol,
        data: determineTimeFormat()
    }]

    const renderButtonSelect = (button) => {
        const classes= "btn "
        if(button === dateFormat){
            return classes + "btn-primary"
        }
        else{
            return classes + "btn-outline-primary"
        }
    }

    return <center>
         <div className={"mt-5 p-4 shadow-sm bg-white"}>
        <Chart options={options} series={series} type="area" width="100%" className="col-md-8"></Chart>
        <div>
          
            <button className={renderButtonSelect("24h")} onClick={() => setDateFormat("24h")}>24 Hours</button>&nbsp;&nbsp;
            <button className={renderButtonSelect("1w")} onClick={() => setDateFormat("1w")}>1 Week</button>&nbsp;&nbsp;
            <button className={renderButtonSelect("1y")} onClick={() => setDateFormat("1y")}>1 Year</button>

        </div>
    </div></center>

}