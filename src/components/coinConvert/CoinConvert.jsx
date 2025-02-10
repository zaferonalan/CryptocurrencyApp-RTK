import { useEffect, useState } from "react"
import "./CoinConvert.css"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCoinDetails } from "../../redux/cryptoSlice"
import { TbArrowsDownUp } from "react-icons/tb"
import usd from "../../assets/usd.png"

const CoinConvert = () => {
    const [amount, setAmount] = useState(1)
    const dispatch = useDispatch()
    const {id} = useParams()

    useEffect(() => {
        dispatch(fetchCoinDetails(id))
    },[dispatch, id])

    const {selectedCoin} = useSelector((state) => state.crypto)

  return (
    <div className="currency-container">
        <div className="currency-converter">
            <h3>Currency Convertor</h3>

            <div className="converter-item">
                <div className="converter-coin">
                    <div className="icon-container">
                        <img src={selectedCoin?.image.small} alt="" className="icon-image"/>
                    </div>
                    <p>{selectedCoin?.symbol}</p>
                </div>
                <div className="input-section">
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="amount-input" min={0} />
                </div>
            </div>

            <div className="converter-icon">
                <TbArrowsDownUp/>
            </div>

            <div className="converter-item">
                <div className="converter-coin">
                    <div className="icon-container">
                        <img src={usd} alt="" className="icon-image"/>
                    </div>
                    <p>USD</p>
                </div>
                <div className="input-section">
                    <input type="number" value={amount * selectedCoin?.market_data?.current_price?.usd} className="amount-input" />
                </div>
            </div>

            <div className="converter-rate">
                <span>
                    1 {selectedCoin?.symbol} = {" "} {selectedCoin?.market_data.current_price.usd} USD
                </span>
            </div>
        </div>
    </div>
  )
}

export default CoinConvert