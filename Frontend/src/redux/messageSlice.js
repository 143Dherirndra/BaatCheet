import { createSlice } from "@reduxjs/toolkit";
const MessageSlice = createSlice({
  name: "message",
  initialState: {
    message: [],
  },
  reducers: {
    setmessage: (state, action) => {
      state.message = action.payload;
    },
    addMessage: (state, action) => {
      state.message.push(action.payload);
    },
    clearMessage: (state) => {
      state.message = [];
    }
  },
});

export const { setmessage, addMessage, clearMessage } = MessageSlice.actions;

export default MessageSlice.reducer
