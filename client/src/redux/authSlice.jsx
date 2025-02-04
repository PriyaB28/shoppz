import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    userInfo: null,
    IsAuthenticated:false
};
  
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload
            state.IsAuthenticated = true
            if (state.userInfo == null) {
                state.IsAuthenticated = false
            }
        },
        logout : (state,action)=>{
            state.IsAuthenticated = false
            state.userInfo =action.payload
        }
    }
})


export default authSlice.reducer;
export const { setCredentials,logout} = authSlice.actions;