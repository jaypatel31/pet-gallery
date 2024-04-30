import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface ImageData {
  url: string;
  title: string;
  description: string;
  created: string;
}

interface PdfUploadState {
  status: "idle" | "loading" | "succeeded" | "failed";
  info: ImageData[] | null;
  error: any | null;
}

const initialState: PdfUploadState = {
  status: "idle",
  info: null,
  error: null,
};

export const getPets = createAsyncThunk<any>(
  "pdf/getpdf",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`https://eulerity-hackathon.appspot.com/pets`);
      return data;
    } catch (err: any) {
      return rejectWithValue(err.response?.data ?? "An error occurred");
    }
  }
);

export const petsSlice = createSlice({
  name: "pdf",
  initialState,
  reducers: {
    reset(state) {
      state.error = null;
      state.info = null;
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPets.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getPets.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.error = null;
        state.info = action.payload;
      })
      .addCase(getPets.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { reset } = petsSlice.actions;
export default petsSlice.reducer;
