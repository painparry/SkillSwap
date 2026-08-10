import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

interface SearchState {
  value: string
}

const initialState: SearchState = {
  value: '',
}

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload
    },
    clearSearchValue: (state) => {
      state.value = ''
    },
  },
})

export const { setSearchValue, clearSearchValue } = searchSlice.actions
export default searchSlice.reducer
