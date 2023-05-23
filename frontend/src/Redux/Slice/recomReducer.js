import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const findMovies = createAsyncThunk(
  "findMovies",
  async (body, thunkAPI) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=59a588a99f49d72dc769ddbe02e0b175&query=${body}`
      );

      const found = response.data.results;
      const newresp = {
        found,
      };
      console.log(newresp);
      return newresp;
    } catch (e) {
      console.log(e);
    }
  }
);


export const getMovies = createAsyncThunk(
  "getMovies",
  async (body, thunkAPI) => {
    try {
      // console.log(body,'id at getDetails');
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${body}?api_key=59a588a99f49d72dc769ddbe02e0b175&language=en-US`
      );
      // console.log(response,`response at get details for id ${body}`);

      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);
export const getDetails = createAsyncThunk(
  "getDetails",
  async (body, thunkAPI) => {
    try {
      // console.log(body,'id at getDetails');
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${body}?api_key=59a588a99f49d72dc769ddbe02e0b175&language=en-US`
      );
      // console.log(response,`response at get details for id ${body}`);
      return response.data;
    } catch (e) {
      console.log(e);
    }
  }
);

export const getRecommendedMovies = createAsyncThunk(
  "getRecommendedMovies",
  async (body, thunkAPI) => {
    try {
      console.log(body.movie);
      if (body.movie !== null) {
        const searchList = [...body.movie];
        console.log(searchList);
        for (let i in searchList) {
          console.log(searchList[i]);
          const response = await axios.post("http://127.0.0.1:8000/recommend", {
            movie: searchList[i],
          });
          // console.log(response.data.recommended_Movies_Id);
          thunkAPI.dispatch(setMoviesUpdate(true));
          const ids = [...response.data.recommended_Movies_Id];
          ids.reverse();
          console.log(ids);
          // console.log(ids);
          for (let i in ids) {
            thunkAPI.dispatch(getMovies(ids[i]));
          }
          // console.log(response,'response from ML api');
        }
      } else {
        thunkAPI.dispatch(setMoviesUpdate(false));
      }
    } catch (e) {
      thunkAPI.dispatch(updateSearchList(e.config.data));
    }
  }
);

const recomSlice = createSlice({
  name: "recomSlice",
  initialState: {
    movies: [],

    moviesUpdated: false,
    movieDetails: {},
    foundMovies: [],
  },
  reducers: {
    updateSearchList: (state, action) => {
      let movie = action.payload;
      movie = movie.slice(10, movie.length - 2);
      // console.log( movie);

      if (movie !== undefined) {
        const storage = JSON.parse(localStorage.getItem("history"));
        const index = storage.indexOf(movie);
        if (index !== -1) {
          console.log(index);
          storage.splice(index, 1);

          console.log(storage);
          localStorage.setItem("history", JSON.stringify(storage));
          state.moviesUpdated = false;
        }
      }
    },
    setMoviesUpdate: (state, action) => {
      console.log(action.payload);
      state.moviesUpdated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action) => {
        const allMovies = state.movies;
        if (allMovies !== undefined) {
          const recomendedMovie = action.payload;
          const movieName = allMovies.find(
            (movie) => movie.id === recomendedMovie.id
          );
          // console.log(movieName,'already recomended movie');
          if (movieName === undefined) {
            state.movies.unshift(recomendedMovie);
          }
        } else {
          state.movies.push(action.payload);
        }

        // console.log(state.movies);
      })
      .addCase(getDetails.fulfilled, (state, action) => {
        state.movieDetails = action.payload;
        // console.log(state.movieDetails);
      })
      .addCase(findMovies.fulfilled, (state, action) => {
        state.foundMovies = action.payload.found;
        if (action.payload.found[0] !== undefined) {
          const title = action.payload.found[0].title;
          let storage = JSON.parse(localStorage.getItem("history"));
          console.log(storage);
          const movieName = action.payload.found[0]?.title;
          if (storage) {
            const index = storage.indexOf(title);
            if (index === -1) {
              storage.push(movieName);
              // state.searchList.push(movieName)
              localStorage.setItem("history", JSON.stringify(storage));
            }
          } else {
            storage = [];
            storage.push(movieName);
            localStorage.setItem("history", JSON.stringify(storage));
          }
        }
      });
  },
});

export default recomSlice.reducer;

export const { updateSearchList, setMoviesUpdate } = recomSlice.actions;
