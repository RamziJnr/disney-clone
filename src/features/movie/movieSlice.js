import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    recommends: [],
    newDisney: [],
    originals: [],
    trending: [],
  },
  reducers: {
    setMovies: (state, action) => {
      console.log('Action payload in setMovies:', action.payload); // Log the payload data
      const { recommends, newDisney, originals, trending } = action.payload;

      // Check if the payload contains expected data
      if (!recommends || !newDisney || !originals || !trending) {
        console.error('Missing movie data in payload:', action.payload);
        return;
      }

      state.recommends = recommends;
      state.newDisney = newDisney;
      state.originals = originals;
      state.trending = trending;
      
      // Log the updated state to ensure it's stored properly
      console.log('Updated state:', state);
    },
  },
});
export const { setMovies } = movieSlice.actions;

export const selectRecommend = (state) => state.movie.recommends;
export const selectNewDisney = (state) => state.movie.newDisney;
export const selectOriginal = (state) => state.movie.originals;
export const selectTrending = (state) => state.movie.trending;

export default movieSlice.reducer;