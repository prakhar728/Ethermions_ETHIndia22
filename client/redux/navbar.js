import { createSlice } from "@reduxjs/toolkit";

// export const sendAddress = createAsyncThunk(
//   "navbar/sendAddress",
//   async (address) => {
//     console.log("in thunk", address)
//     await axios.post("/api/addaddress", { address })
//     return address
//   }
// )

export const navbarSlice = createSlice({
  name: "navbar",
  initialState: {
    navbarMobile: false,
    walletAddress: null,
    signer: null,
    instances: null,
    LB_contract_address: null,
    nft_contract_address: null
  },
  reducers: {
    changeNavbarState: (state) => {
      state.navbarMobile = !state.navbarMobile;
    },
    saveAddressAndSigner: (state, action) => {
      state.walletAddress = action.payload.address;
      state.signer = action.payload.signer;
      state.instances = action.payload.instances;
    },
    addContractAddresses: (state, action) => {
      state.LB_contract_address = action.payload.LB_contract_address
      state.nft_contract_address = action.payload.nft_contract_address
    }
  },
  // extraReducers: (builder) => {
  //   builder.addCase(sendAddress.fulfilled, (state, action) => {
  //     state.walletAddress = action.payload
  //   })
  // }
});

export const { changeNavbarState, saveAddressAndSigner, addContractAddresses } = navbarSlice.actions;

export default navbarSlice.reducer;
