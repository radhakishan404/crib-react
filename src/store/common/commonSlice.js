import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api_cribs_add, api_cribs_get, api_cribs_get_list, api_cribs_update } from "./commonApi";
import { parser_cribs_get, parser_cribs_get_list } from "./commonParser";

const initialState = {
  snackbar: {
    open: false,
    message: "",
    severity: "info",
  },
  cribs_data_loading: false,
  add_loading: false,
  cribs_data: [],
  cribs_meta: {
    page: 0,
    perPage: 10,
    sortBy: "DESC",
    sortField: "createdAt",
    search: ""
  },
  cribs_data_count: 0,
  unique_cribs_data: null
};

export const cribsGetList = createAsyncThunk(
  "cribsGetList",
  async (payload) => {
    try {
      const { params } = payload;
      const response = await api_cribs_get_list(params);
      const data = parser_cribs_get_list(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const cribsAdd = createAsyncThunk(
  "cribsAdd",
  async (payload) => {
    try {
      const response = await api_cribs_add(payload);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const cribsUpdate = createAsyncThunk(
  "cribsUpdate",
  async (payload) => {
    try {
      const response = await api_cribs_update(payload);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getUniqueCribs = createAsyncThunk(
  "getUniqueCribs",
  async (payload) => {
    try {
      const response = await api_cribs_get(payload);
      const data = parser_cribs_get(response);
      return data;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const common = createSlice({
  name: "common",
  initialState,
  reducers: {
    setSnackBar: (state, action) => {
      state.snackbar = action.payload;
    },
    setCribsMeta: (state, action) => {
      const { meta } = action.payload;
      state.cribs_meta = {
        ...state.cribs_meta,
        ...meta,
      }
    },
  },
  extraReducers: {
    [cribsGetList.pending]: (state, action) => {
      state.cribs_data_loading = true;
    },
    [cribsGetList.fulfilled]: (state, action) => {
      const { count, data } = action.payload;
      state.cribs_data_loading = false;
      state.cribs_data = data;
      state.cribs_data_count = count;
    },
    [cribsGetList.rejected]: (state, action) => {
      state.cribs_data_loading = false;
    },
    // Add cribs
    [cribsAdd.pending]: (state, action) => {
      state.add_loading = true;
    },
    [cribsAdd.fulfilled]: (state, action) => {
      state.add_loading = false;
    },
    [cribsAdd.rejected]: (state, action) => {
      state.add_loading = false;
    },
    // Update cribs
    [cribsUpdate.pending]: (state, action) => {
      state.add_loading = true;
    },
    [cribsUpdate.fulfilled]: (state, action) => {
      state.add_loading = false;
      state.unique_cribs_data = null
    },
    [cribsUpdate.rejected]: (state, action) => {
      state.add_loading = false;
    },
    // Get cribs
    [getUniqueCribs.pending]: (state, action) => {
      state.cribs_data_loading = true;
    },
    [getUniqueCribs.fulfilled]: (state, action) => {
      state.cribs_data_loading = false;
      state.unique_cribs_data = action.payload
    },
    [getUniqueCribs.rejected]: (state, action) => {
      state.cribs_data_loading = false;
    },

  }
});

// Action creators are generated for each case reducer function
export const {
  setSnackBar,
  setCribsMeta,
  setUniqueCribsData,
} = common.actions;

export default common.reducer;
