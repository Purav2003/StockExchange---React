import Chart from "react-apexcharts"

export const StockChart = ({ chartData, symbol }) => {
    const { day, week, year } = chartData
    const options = {
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
        theme: {            
            palette: 'palette5' // upto palette10
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
        data: year
    }]

    return <div className={"mt-5 p-4 shadow-sm bg-white"}>
        <Chart options={options} series={series} type="area" width="100%" className="col-md-7"></Chart>
    </div>

}