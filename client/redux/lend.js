import {
  createSlice,
  createAsyncThunk,
  isPending,
  isRejected
} from "@reduxjs/toolkit"
import axios from "axios"
import { setError } from "./error"

export const repayNft = createAsyncThunk(
  "lend/repayNft",
  async ({ contract_address }, thunkAPI) => {
    const walletAddress = thunkAPI.getState().navbar.walletAddress
    const response = await axios.post(
      `${process.env.API_DOMAIN}/${contract_address}/${walletAddress}/repaynft`
    )
    console.log("response", response)
    // return response.data
  }
)

export const lendNft = createAsyncThunk(
  "lend/lendNft",
  async ({ contract_address, wallet_address }, thunkAPI) => {
    try {
      const walletAddress = thunkAPI.getState().navbar.walletAddress
      const response = await axios.post(
        `${process.env.API_DOMAIN}/${contract_address}/${wallet_address}/lendnft`,
        { lender_address: walletAddress }
      )
      console.log("response", response)
      return response.data
    } catch (err) {
      console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.reject(err)
    }
  }
)

export const getBorrowedNfts = createAsyncThunk(
  "lend/getBorrowedNfts",
  async (acc) => {
    try {
      const response = await axios.get(
        `${process.env.API_DOMAIN}/${acc}/lendnft`
      )
      return response.data
    } catch (err) {
      console.log(err)
    }
  }
)

export const lendSlice = createSlice({
  name: "lend",
  initialState: {
    nftList: null,
    nftDetails: null,
    loading: false,
    error: null
  },
  reducers: {
    selectNft: (state, action) => {
      state.nftDetails = action.payload
    }
  },
  //   extraReducers: builder => {
  //     builder
  //       .addCase(getBookmarks.fulfilled, (state, action) => {
  //         state.suggestions = action.payload.data
  //         state.bookmarks = action.payload.bookmarks
  //       })
  //   }
  extraReducers: (builder) => {
    function onPending(state) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    builder
      .addCase(lendNft.fulfilled, (state, action) => {
        state.mynfts = action.payload
        state.loading = false
      })
      .addCase(getBorrowedNfts.fulfilled, (state, action) => {
        state.mynfts = action.payload
        state.loading = false
      })
    builder
      .addCase(lendNft.pending, onPending)
      .addCase(getBorrowedNfts.pending, onPending)
    builder
      .addCase(lendNft.rejected, onRejection)
      .addCase(getBorrowedNfts.rejected, onRejection)
  }
})

export const { selectNft } = lendSlice.actions

export default lendSlice.reducer
