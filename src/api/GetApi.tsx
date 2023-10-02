import React from 'react'
import axios from 'axios'
import toaster from '../shared/toaster'
import { useNavigate } from 'react-router';

const GetApi = async (url: string,setLoading?: (loading: boolean) => void) => {
    
    let headersWithAuth = {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: localStorage.getItem('token')
    }
    
    try {
        setLoading && setLoading(true);
        const response = await axios.get(
            url,
            {
                headers: headersWithAuth
            }
        )
        return response
    }
    catch(error) {
        
        if(axios.isAxiosError(error)) {
            if(error.response?.status == 401){
                toaster('Session Expired');
                localStorage.setItem('token','');
                window.location.href = '/login'
            }else{
                toaster(error.message)
                console.log("Get Api Error", error.message);
                return error.message
            }
           
        } else {
            console.log("Unexpected error: ", error);
            return "An unexpected error occured"
        }
    }finally{
        setLoading && setLoading(false);
    }
}

export default GetApi
