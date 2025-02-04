import useAuth from './useAuth';
import { userDetailsApi } from '../api/backendApi';
import { useEffect, useState } from 'react';
import { setCredentials } from '../redux/authSlice';

const useUserDetails = () => {
    const { user,dispatch } = useAuth();
    const [error, setError] = useState("");
    const [loaded, setLoaded] = useState(false);

    const getUserDetails = async () => {
        try {
            const response = await userDetailsApi();
            dispatch(setCredentials(response.data.data));
            setLoaded(true);
        } catch (error) {
            setError(error.message);
        } 
    }
    // useEffect(() => {
    //         getUserDetails()
    // }, []);

    return { error, loaded,setLoaded ,getUserDetails};
}

export default useUserDetails