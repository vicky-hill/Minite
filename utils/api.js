import axios from "axios"
import error from "./error";

const instance = axios.create({
    baseURL: `${process.env.BASE_URL}`,
    // baseURL: "http://localhost:4000/api/reqdoc",
    headers: { 'Content-Type': 'application/json' }
});

instance.interceptors.request.use((config) => {
    const token = typeof window !== "undefined" && localStorage.getItem('token');
    config.headers['x-auth-token'] = token ? token : ''
    return config;
});

export const api = {
    get: async (url, body) => {
        const promise = (resolve, reject) => {
            instance.get(url, body)
                .then(res => resolve(res.data))
                .catch(err => {
                    error(err);
                    reject(err);
                })
        }

        return new Promise(promise);
    },
    post: async (url, body) => {
        const promise = (resolve, reject) => {
            instance.post(url, body)
                .then(res => resolve(res.data))
                .catch(err => {
                    error(err);
                    reject(err);
                })
        }

        return new Promise(promise);
    },
    put: async (url, body) => {
        const promise = (resolve, reject) => {
            instance.put(url, body)
                .then(res => resolve(res.data))
                .catch(err => reject(error(err)))
        }

        return new Promise(promise);
    },
    delete: async (url, body) => {
        const promise = (resolve, reject) => {
            instance.delete(url, body)
                .then(res => resolve(res.data))
                .catch(err => {
                    error(err);
                    reject(err);
                })
        }

        return new Promise(promise);
    }
}

export default api;