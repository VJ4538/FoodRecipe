import { createSlice} from "@reduxjs/toolkit";

const initialState={
    navbarPosition:0,
}

const slice =createSlice({
    name:'navbar',
    initialState,
    reducers:{
        setNavPosition(oldState, action){
            oldState.navbarPosition=action.payload
        }
    },
})

export const reducer =slice.reducer

export const setNavPosition = (position) => (dispatch) => {
    dispatch(slice.actions.setNavPosition(position))
}
export default slice