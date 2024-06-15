const API_BASE_URL = process.env.REACT_APP_BASE_URL;
export const frontEndUrl = process.env.REACT_APP_FRONTEND_URL
export const DNF = 'Data Not Found'

export const API_URLS = {
    register: `${API_BASE_URL}User/Register`,
    login: `${API_BASE_URL}User/Login`,
    AddUpdatefarm: `${API_BASE_URL}Farm/`,
    addFarm: `${API_BASE_URL}Farm/AddFarm`,
    getFarmDetailsByUserId: `${API_BASE_URL}Farm/GetFarmDetailsByUserId`,
    createLoginSession: `${API_BASE_URL}LoginSession/login`,
    getSessionIdByUserName: `${API_BASE_URL}LoginSession/session-id`,
    logoutSession: `${API_BASE_URL}LoginSession/logout`
}