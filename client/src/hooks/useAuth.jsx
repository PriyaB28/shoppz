import { useSelector,useDispatch } from 'react-redux';
import React from 'react'

const useAuth = () => {
    const user = useSelector(state => state.auth)
    const dispatch = useDispatch()
    return { user, dispatch }
}

export default useAuth