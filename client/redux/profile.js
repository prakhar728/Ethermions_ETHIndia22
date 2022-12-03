import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isPending
} from "@reduxjs/toolkit"
import { setError } from "./error"

import axios from "axios"

export const getListedForLoans = createAsyncThunk(
  "profile/getListedForLoans",
  async (_, thunkAPI) => {
    try {
      const walletAddress = thunkAPI.getState().navbar.walletAddress
      console.log("wallet address: ", walletAddress)
      const response = await axios.get(
        `${process.env.API_DOMAIN}/${walletAddress}/borrownft`
      )
      console.log("response", response)
      return response.data
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const getActiveLoans = createAsyncThunk(
  "profile/getActiveLoans",
  async (_, thunkAPI) => {
    try {
      const walletAddress = thunkAPI.getState().navbar.walletAddress
      console.log("wallet address: ", walletAddress)
      const response = await axios.get(
        `${process.env.API_DOMAIN}/${walletAddress}/myborrowednft`
      )
      console.log("response", response)
      return response.data
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const getMyLendings = createAsyncThunk(
  "profile/getMyLendings",
  async (_, thunkAPI) => {
    try {
      console.log("lendings dispatched")
      const { walletAddress, instances } = thunkAPI.getState().navbar
      // const response = await axios.get(
      //   `${process.env.API_DOMAIN}/${walletAddress}/mylentnft`
      // )
      // console.log("response", response)
      // return response.data
      const bn = await instances.returnCurrentProposalId()
      console.log(bn.toNumber())
      const proposalHolder = []
      for (var i = 1; i <= bn.toNumber(); i++) {
        const currentProposalData = await instances.borrowRequests(i)
        console.log(currentProposalData)
        if (currentProposalData[6] == walletAddress) {
          //add to check status too!
          const data = {
            borrower_address: currentProposalData[0],
            amount: currentProposalData[1].toNumber(),
            roi: currentProposalData[2].toNumber(),
            repay: currentProposalData[3].toNumber(),
            proposalid: currentProposalData[4].toNumber(),
            nftURI: `https://testnets.opensea.io/assets/mumbai/${currentProposalData[8]}/${currentProposalData[9]}`,
            whenBorrowed: currentProposalData[7].toNumber()
          }
          proposalHolder.push(data)
        }
      }
      console.log(proposalHolder)
      return proposalHolder
    } catch (err) {
      thunkAPI.dispatch(setError(err.response?.data?.message))
      console.log(err)
      return thunkAPI.rejectWithValue(err.response?.data?.message)
    }
  }
)

export const profileSlice = createSlice({
  name: "profile",
  initialState: {
    loading: false,
    error: null,
    listedForLoans: null,
    activeLoans: null,
    repayedLoans: null,
    defaultedLoans: null,
    myLendings: null
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
    builder
      .addCase(getListedForLoans.fulfilled, (state, action) => {
        state.listedForLoans = action.payload
        state.loading = false
      })
      .addCase(getActiveLoans.fulfilled, (state, action) => {
        state.activeLoans = action.payload
        state.loading = false
      })
      .addCase(getMyLendings.fulfilled, (state, action) => {
        state.myLendings = action.payload
        state.loading = false
      })

    builder
      .addCase(getListedForLoans.pending, onPending)
      .addCase(getActiveLoans.pending, onPending)
      .addCase(getMyLendings.pending, onPending)
    builder
      .addCase(getListedForLoans.rejected, onRejection)
      .addCase(getActiveLoans.rejected, onRejection)
      .addCase(getMyLendings.rejected, onRejection)
  }
})

// export const { getMyNfts, importNft } = profileSlice.actions

export default profileSlice.reducer
