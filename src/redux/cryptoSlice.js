import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios from 'axios';

const API_URL = "https://api.coingecko.com/api/v3"

export const fetchAllCoins = createAsyncThunk(
    "crypto/fetchAllCoins",
    async (page) => {
        const response = await axios.get(`${API_URL}/coins/markets`, {
            params: {
                vs_currency : "usd",
                order: "market_cap_desc",
                per_page: 25,
                page
            }
        })
        return response.data
    }
)


export const fetchCoinDetails = createAsyncThunk(
    "crypto/fetchCoinDetails",
    async (id) => {
        const response = await axios.get(`${API_URL}/coins/${id}`)
        return response.data
    }
)

export const fetchCoinHistory = createAsyncThunk(
    "crypto/fetchCoinHistory",
    async({id, days}) => {
        const response = await axios.get(`${API_URL}/coins/${id}/market_chart`,
            {
                params: {vs_currency: "usd", days}
            }
        )
        return response.data
    }
)

const cryptoSlice = createSlice({
    name: "crypto",
    initialState: {
        allCoins: [],
        selectedCoin: null,
        coinHistory: [],
        status: "idle", // "idle(Boşta) Başlangıçta genellikle bu değeri alır." || loading(Yükleniyor) Kullanıcıya "Yükleniyor..." animasyonu veya spinner göstermek için kullanılır. || succeeded  || failed 
        error: null
    },
    reducers:{},
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllCoins.pending, (state) =>{
                // pending = işlem başladı(bekleniyor)
                state.status = "Loading..."
            })
            .addCase(fetchAllCoins.fulfilled, (state, action) => {
                // fulfilled = işlem başarıyla tamamlandı.
                (state.status = "succeeded"), (state.allCoins = action.payload)
            })
            .addCase(fetchAllCoins.rejected, (state, action) => {
                (state.status = "failed"), (state.error = action.error.message)
            })
            .addCase(fetchCoinDetails.fulfilled, (state, action) => {
                state.selectedCoin = action.payload // apiden dönen veri selectedCoin'e atanır
            })
            .addCase(fetchCoinHistory.fulfilled, (state, action) => {
                state.coinHistory = action.payload // apiden dönen veri coinHistory'e atanır
            })
    }
})

export default cryptoSlice.reducer