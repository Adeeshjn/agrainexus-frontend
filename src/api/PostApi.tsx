import axios from 'axios';

export default async function postApi(body: any,setLoading: (loading: boolean) => void) {
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
        // 👇️ const data: CreateUserResponse
        setLoading(true);
        const response = await axios.post(
            body.Url,
            body.body,
            {
                headers: body.isAuth ? headersWithAuth : headers
            },
        )
        return response;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    } finally {
        setLoading(false); // Hide loader
      }
  
}