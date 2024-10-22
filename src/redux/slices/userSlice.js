import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: undefined,
};
const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state, action)=>{
            state.user = action.payload;
        },
        clearUser:(state)=>{
            state.user = undefined;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions
export default userSlice.reducer;