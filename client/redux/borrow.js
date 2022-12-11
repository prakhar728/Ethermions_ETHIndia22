import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isPending
} from "@reduxjs/toolkit"
import { setError } from "./error"

import axios from "axios"

export const getMyNfts = createAsyncThunk("borrow/getMyNfts", async (acc) => {
  try {
    console.log(process.env.API_DOMAIN);
    const response = await axios.get(`${process.env.API_DOMAIN}/${acc}/getnft`)
    return response.data
  } catch (err) {
    console.log(err)
  }
})

export const importNft = createAsyncThunk(
  "borrow/importNft",
  async ({ contractAddress, tokenId }, thunkAPI) => {
    try {
      const walletAddress = thunkAPI.getState().navbar.walletAddress
      const response = await axios.post(
        `${process.env.API_DOMAIN}/${contractAddress}/${walletAddress}/importnft`,
        { token_id: tokenId }
      )
      console.log("response", response)
      return response.data
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const mintNft = createAsyncThunk(
  "borrow/mintNft",
  async (data, thunkAPI) => {
    try {
      const walletAddress = thunkAPI.getState().navbar.walletAddress
      const response = await axios.post(
        `${process.env.API_DOMAIN}/${walletAddress}/mintnft`,
        data
      )
      console.log("response", response)
      return response.data
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const borrowNft = createAsyncThunk(
  "borrow/borrowNft",
  async (data, thunkAPI) => {
    try {
      const walletAddress = thunkAPI.getState().navbar.walletAddress
      const response = await axios.post(
        `${process.env.API_DOMAIN}/${data.contract_address}/${walletAddress}/borrownft`,
        data
      )
      console.log("response", response)
      return response.data
    } catch (err) {
      // console.log(err)
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const borrowSlice = createSlice({
  name: "borrow",
  initialState: {
    loading: false,
    mynfts: null,
    error: null
  },
  reducers: {
    // selectNft: (state, action) => {
    //   state.nftDetails = action.payload
    // }
  },
  extraReducers: (builder) => {
    function onPending(state, action) {
      state.loading = true
      state.error = null
    }
    function onRejection(state, action) {
      state.loading = false
      state.error = action.payload
    }
    builder.addCase(getMyNfts.fulfilled, (state, action) => {
      state.mynfts = action.payload
      state.loading = false
    })
    builder.addCase(importNft.fulfilled, (state, action) => {
      state.mynfts = action.payload
      state.loading = false
    })
    builder.addCase(mintNft.fulfilled, (state, action) => {
      state.mynfts = action.payload
      state.loading = false
    })
    builder.addCase(borrowNft.fulfilled, (state, action) => {
      state.mynfts = action.payload
      state.loading = false
    })

    builder
      .addCase(borrowNft.pending, onPending)
      .addCase(importNft.pending, onPending)
      .addCase(mintNft.pending, onPending)
      .addCase(getMyNfts.pending, onPending)
    builder
      .addCase(borrowNft.rejected, onRejection)
      .addCase(importNft.rejected, onRejection)
      .addCase(mintNft.rejected, onRejection)
      .addCase(getMyNfts.rejected, onRejection)
  }
})

// export const { getMyNfts, importNft } = borrowSlice.actions

export default borrowSlice.reducer
