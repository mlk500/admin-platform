import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const URL = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: URL,
});


// class GenericAPI {
//   get = async <T>(
//     url: string,
//     params?: AxiosRequestConfig["params"],
//     headers?: AxiosRequestConfig["headers"],
//     options: AxiosRequestConfig = {}
//   ): Promise<AxiosResponse<T>> => {
//     return axiosInstance.get<T>(`${URL}${url}/getAll`, { ...options, headers, params: params });
//   };

//   get2 = async <T>(
//     url: string,
//     params?: AxiosRequestConfig["params"],
//     headers?: AxiosRequestConfig["headers"],
//     options: AxiosRequestConfig = {}
//   ): Promise<AxiosResponse<T>> => {
//     return axiosInstance.get<T>(`${URL}${url}`, { ...options, headers, params: params });
//   };

//   post = async <T>(
//     url: string,
//     data: unknown,
//     headers?: AxiosRequestConfig["headers"],
//     options: AxiosRequestConfig = {}
//   ): Promise<AxiosResponse<T>> => {
//     return axiosInstance.post<T>(`${URL}${url}/create`, data, { ...options, headers });
//   };

//   put = async <T>(
//     url: string,
//     data: unknown,
//     headers?: AxiosRequestConfig["headers"],
//     options: AxiosRequestConfig = {}
//   ): Promise<AxiosResponse<T>> => {
//     return axiosInstance.put<T>(`${URL}${url}/update`, data, { ...options, headers });
//   };

//   delete = async <T>(url: string, headers?: AxiosRequestConfig["headers"], options: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
//     return axiosInstance.delete<T>(`${URL}${url}`, { ...options, headers });
//   };

// }

// export const genericAPI = new GenericAPI();



class GenericAPI {
  get = async <T>(
    url: string,
    params?: AxiosRequestConfig['params'],
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.get<T>(url, { ...options, headers, params });
  };

  post = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.post<T>(url, data, { ...options, headers });
  };

  postFormData = async <T>(
    url: string,
    formData: FormData,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
): Promise<AxiosResponse<T>> => {
    const config = {
        ...options,
        headers: {
            ...headers,
            'Content-Type': 'multipart/form-data',
        },
    };
    return axiosInstance.post<T>(url, formData, config);
};

//   postFormData = async <T>(
//     url: string,
//     formData: FormData,
//     headers?: AxiosRequestConfig['headers'],
//     options: AxiosRequestConfig = {}
// ): Promise<AxiosResponse<T>> => {
//     const config = {
//         ...options,
//         headers: {
//             ...headers,
//         },
//     };
//     return axiosInstance.post<T>(url, formData, config);
// };

  put = async <T>(
    url: string,
    data: unknown,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.put<T>(url, data, { ...options, headers });
  };

  putFormData = async <T>(
    url: string,
    formData: FormData,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    // const config = {
    //     ...options,
    //     headers: {
    //         ...headers,
    //         'Content-Type': 'multipart/form-data',
    //     },
    // };
    return axiosInstance.put<T>(url, formData, { ...options, headers });
  };

  delete = async <T>(
    url: string,
    headers?: AxiosRequestConfig['headers'],
    options: AxiosRequestConfig = {}
  ): Promise<AxiosResponse<T>> => {
    return axiosInstance.delete<T>(url, { ...options, headers });
  };
}

export const genericAPI = new GenericAPI();
