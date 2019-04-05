import axios from 'axios';

let axiosInstance = axios.create({
    // baseURL: API_ROOT,
    headers: {
        'Content-Type': 'application/json',
        // 'Authorization': ACCESS_TOKEN if any
    }
});

axiosInstance.interceptors.request.use(
    //To Add Interceptor
);

export async function get(url: string) {
    try {
        const response = await axiosInstance.get(url);
        if (response.data) {
            return response;
        }
        throw new Error(response.data);
    } catch (error) {
        throw error;
    }
}
export async function post(url: string, data: {}) {
    try {
        const response = await axiosInstance.post(url, data);
        if (response.data) {
            return response;
        }
        throw new Error(JSON.stringify(response.data));
    } catch (error) {
        throw error;
    }
}

export async function put(url: string, data: {}) {
    try {
        const response = await axiosInstance.put(url, data);
        if (response.data) {
            return response;
        }
        throw new Error(response.data);
    } catch (error) {
        throw error;
    }
}

export async function del(url: string, data: {}) {
    try {
        const response = await axiosInstance.delete(url, data);
        if (response.data) {
            return response;
        }
        throw new Error(response.data);
    } catch (error) {
        throw error;
    }
}
