import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IUser } from "../Interfaces/IUser";
import axios from "axios";
import { type } from "@testing-library/user-event/dist/type";
import { IGame } from "../Interfaces/IGame";

export interface GameState {
  loading: boolean;
  error: boolean;
  game: IGame;
}

const initialGameState: GameState = {
  loading: false,
  error: false,
  game : {
      id : 0,
      player1: "",
      player2: "",
      counter1: 0,
      counter2: 0,
      create: false
  }
};
export type register = {
  username: string;
  password: string;
};


export const capGame = createAsyncThunk(
    "game/capGame",
    async (x: number|undefined, thunkAPI) => {
      try {
        console.log(x);
        return x;
      } catch (e) {
        console.log(e);
      }
    }
  );

export const GameSlice = createSlice({
  name: "game",
  initialState: initialGameState,
  reducers: {
    toggleError: (state) => {
      state.error = !state.error;
    },
    clearGame: (state) => {
      state.game = initialGameState.game;
    },
    createGame: (state) => {
        state.game.create = true;
    },
    increment1: (state) => {
        state.game.counter1++;
    },
    increment2: (state) => {
        state.game.counter2++;
    }


  },
  extraReducers: (builder) => {
    //cap game
    builder.addCase(capGame.pending, (state, action)=>{
        state.loading = true;
    });
    builder.addCase(capGame.fulfilled, (state, action)=> {
        state.game.cap = action.payload;
        state.error = false;
        state.loading = false;
    })
    builder.addCase(capGame.rejected,(state,action)=> {
        state.error = true;
        state.loading = false;
    })
  },
});

export const { toggleError, createGame, increment1, increment2 } = GameSlice.actions;
export default GameSlice.reducer;
