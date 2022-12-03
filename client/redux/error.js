import { createSlice } from "@reduxjs/toolkit"

// export const sendAddress = createAsyncThunk(
//   "navbar/sendAddress",
//   async (address) => {
//     console.log("in thunk", address)
//     await axios.post("/api/addaddress", { address })
//     return address
//   }
// )

export const errorSlice = createSlice({
  name: "error",
  initialState: {
    message: null
  },
  reducers: {
    setError: (state, action) => {
      state.message = action.payload
    },
    clearError: (state) => {
      state.message = null
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(sendAddress.fulfilled, (state, action) => {
  //     state.walletAddress = action.payload
  //   })
  // }
})

export const { setError, clearError } = errorSlice.actions

export default errorSlice.reducer
