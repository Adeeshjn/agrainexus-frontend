import axios from 'axios'
import React from 'react'
import toaster from '../shared/toaster'

export default async function putApi (body: any,setLoading :(loading:boolean) => void) {
    let headersWithAuth = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Authorization': body.isAuth ? localStorage.getItem('token') : ''
    }
    let headers = {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    }

    try {
        setLoading(true)
        const response = await axios.put(
            body.Url,
            body.body,
            {
                headers: body.isAuth ? headersWithAuth : headers
            },
        )
        return response;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            toaster(error.message)
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
    finally{
        setLoading(false)
    }
}