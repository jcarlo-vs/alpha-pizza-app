import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getAddress } from '../../services/apiGeocoding'

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject)
  })
}

// async function fetchAddress() {
//   // 1) We get the user's geolocation position
//   const positionObj = await getPosition()
//   const position = {
//     latitude: positionObj.coords.latitude,
//     longitude: positionObj.coords.longitude,
//   }

//   // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
//   const addressObj = await getAddress(position)
//   const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

//   // 3) Then we return an object with the data that we are interested in
//   return { position, address }
// }

export const fetchAddress = createAsyncThunk(
  'user/fetchAddress',
  async function () {
    const positionObj = await getPosition()
    console.log(positionObj, 'positionObj')
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    }

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position)
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`

    // 3) Then we return an object with the data that we are interested in
    return { position, address }
  }
)

const initialState = {
  username: '',
  status: 'idle',
  position: '',
  address: '',
  error: '',
}

const userSlice = createSlice({
  name: 'user',
  initialState: initialState,
  reducers: {
    updateName(state, { payload }) {
      state.username = payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAddress.pending, (state, { payload }) => {
        state.status = 'loading'
      })
      .addCase(fetchAddress.fulfilled, (state, { payload }) => {
        state.status = 'finished'
        state.position = payload.position
        state.address = payload.address
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.error.message
      })
  },

  // {
  //   [fetchAddress.pending]: (state, { payload }) => {
  //     console.log('pending')
  //     state.status = 'pending'
  //   },
  //   [fetchAddress.fulfilled]: (state, { payload }) => {
  //     state.position = payload
  //     state.status = 'finished'
  //   },
  //   [fetchAddress.rejected]: (state, { payload }) => {
  //     state.status = 'failed'
  //   },
  // },
})

export const { updateName } = userSlice.actions
export default userSlice.reducer
