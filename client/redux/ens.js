import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isPending,
  isAnyOf
} from "@reduxjs/toolkit"

export const getEnsName = createAsyncThunk(
  "ens/getEnsName",
  async ({ address, provider }) => {
    try {
      //   const state = thunkAPI.getState()
      //   console.log("signer in ens", state)
      var name = await provider.lookupAddress(address)
      // 0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045
      var image = await provider.getAvatar(address)
      console.log(image)
      const data = {
        name,
        image
      }
      return data
    } catch (err) {
      console.log("ens error", err)
    }
  }
)

export const ensSlice = createSlice({
  name: "ens",
  initialState: {
    ensName: null,
    ensImg: null,
    loading: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnsName.fulfilled, (state, action) => {
        state.ensName = action.payload?.name
        state.ensImg = action.payload?.image
        state.loading = false
      })
      .addCase(getEnsName.pending, (state) => {
        // global error handle reducer
        state.loading = true
        state.error = null
      })
      .addCase(getEnsName.rejected, (state, action) => {
        // global error handle reducer
        state.loading = false
        state.error = action.payload
      })
    // .addMatcher(isRejected, (state, action) => {
    //   // global error handle reducer
    //   state.error = action.payload
    //   state.loading = false
    // })
  }
})

// export const { getMyNfts, importNft } = borrowSlice.actions

export default ensSlice.reducer
