import { createSlice } from "@reduxjs/toolkit"

// export const sendAddress = createAsyncThunk(
//   "navbar/sendAddress",
//   async (address) => {
//     console.log("in thunk", address)
//     await axios.post("/api/addaddress", { address })
//     return address
//   }
// )

export const successSlice = createSlice({
  name: "success",
  initialState: {
    message: null
  },
  reducers: {
    setSuccess: (state, action) => {
      state.message = action.payload
    },
    clearSuccess: (state) => {
      state.message = null
    }
  }
  // extraReducers: (builder) => {
  //   builder.addCase(sendAddress.fulfilled, (state, action) => {
  //     state.walletAddress = action.payload
  //   })
  // }
})

export const { setSuccess, clearSuccess } = successSlice.actions

export default successSlice.reducer
