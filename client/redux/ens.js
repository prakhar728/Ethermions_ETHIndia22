import {
  createSlice,
  createAsyncThunk,
  isRejected,
  isPending,
} from "@reduxjs/toolkit";

export const getEnsName = createAsyncThunk(
  "ens/getEnsName",
  async ({ address, provider }) => {
    try {
      //   const state = thunkAPI.getState()
      //   console.log("signer in ens", state)
      var name = await provider.lookupAddress(address);
      return name;
    } catch (err) {
      console.log("ens error", err);
    }
  }
);

export const ensSlice = createSlice({
  name: "ens",
  initialState: {
    loading: false,
    ensName: null,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEnsName.fulfilled, (state, action) => {
        state.ensName = action.payload;
        state.loading = false;
      })
      .addMatcher(isPending, (state, action) => {
        // global error handle reducer
        state.loading = true;
        state.error = null;
      })
      .addMatcher(isRejected, (state, action) => {
        // global error handle reducer
        state.error = action.payload;
        state.loading = false;
      });
  },
});

// export const { getMyNfts, importNft } = borrowSlice.actions

export default ensSlice.reducer;
