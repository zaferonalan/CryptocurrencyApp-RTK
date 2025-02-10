import { useParams } from "react-router-dom";
import "./CoinChart.css"
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCoinDetails, fetchCoinHistory } from "../../redux/cryptoSlice";
import { IoIosStarOutline } from "react-icons/io";
import { MdIosShare, MdOutlineFileDownload } from "react-icons/md";
import { Line } from 'react-chartjs-2'
import {
    Chart as ChartJs,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
}from "chart.js"

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)


const CoinChart = () => {
    
    const days = 10;
    const {id} = useParams();
    
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCoinHistory({id, days}))
    },[dispatch,id, days])

    useEffect(() => {
        dispatch(fetchCoinDetails(id))
    },[dispatch,id])

    const { coinHistory } = useSelector((state) => state.crypto)
    const { selectedCoin } = useSelector((state) => state.crypto)

    const data = {
        // X eksen,
        labels: coinHistory?.prices?.map((item) => new Date(item[0]).toLocaleDateString()) || [],
        // Y ekseni
        datasets: [
            {
                label: "Price (USD)",
                data: coinHistory?.prices?.map((item) => item[1]) || [],
                fill: false,
                borderColor: "#66fcf1",
                tension: 0.1
            }
        ]
    }

    const formatNumber = (number) => {
        if (number >= 1_000_000_000) {
            return( number / 1_000_000_000).toFixed(2) + "B"
        }
        else if(number >= 1_000_000) {
            return(number / 1_000_000).toFixed(2) + "M"
        }else{
            return number
        }
    }

  return (
    <div className="chart-container">
        <div className="coin-info">
            <div className="coin-heading">
                <img src={selectedCoin?.image?.small} alt="" className="coin-image"/>
                <span className="coin-text">{selectedCoin?.name} <span>{selectedCoin?.symbol}</span> </span>
            </div>

            <div className="coin-items">
                <div className="coin-item">
                    <IoIosStarOutline size={32}/>
                    <span>Add To Watchlist</span>
                </div>
                <div className="coin-item">
                    <MdIosShare size={32}/>
                    <span>Share</span>
                </div>
                <div className="coin-item">
                    <MdOutlineFileDownload size={32}/>
                    <span>Download</span>
                </div>
            </div>
        </div>

        <div className="chart-details">
            <div className="chart">
                <div className="chart-wrapper">
                    <Line data={data} options={{responsive: true}}/>
                </div>
            </div>
        </div>

        <div className="stats">
            <div className="stat-item">
                <span>Price</span>
                <span>${formatNumber(selectedCoin?.market_data.current_price.usd)}</span>
            </div>
            <div className="stat-item">
                <span>Volume</span>
                <span>${formatNumber(selectedCoin?.market_data.total_volume.usd)}</span>
            </div>
            <div className="stat-item">
                <span>Market Cap</span>
                <span>${formatNumber(selectedCoin?.market_data.market_cap.usd)}</span>
            </div>
            <div className="stat-item">
                <span>Total Supply</span>
                <span>${formatNumber(selectedCoin?.market_data.total_supply)}</span>
            </div>
        </div>
    </div>
  )
}

export default CoinChart