import axios from "axios";
import toastr from "toastr";

const API_BASE_URL = "http://localhost:3001/api/";

export const api = axios.create({
  baseURL: API_BASE_URL,
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    toastr.error("An error occurred while processing your request.");
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

export const API_ENDPOINT = {
    USER: {
        GET_USER_BY_ID: (id: number) => `/users/${id}`,
        CREATE_USER: `/users`,
    },
    AUTH: {
        LOGIN: `/auth/login`,
        RESGISTER: `/auth/register`
    },
};