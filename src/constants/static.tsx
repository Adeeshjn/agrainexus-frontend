const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const frontEndUrl = process.env.REACT_APP_FRONTEND_URL

export const API_URLS = {
    register: `${API_BASE_URL}User/Register`,
    login: `${API_BASE_URL}User/Login`,
    addFarm: `${API_BASE_URL}Farm/AddFarm`
}