import axios, { AxiosRequestHeaders, Method } from "axios";
import { toastService } from "@/lib/toast";

export interface Params {
  [x: string]: any;
}

export interface IAppServiceParams {
  method: Method;
  url: string;
  params?: Params;
  logOutOn401?: boolean;
  headerCred?: {
    authorization?: string;
    contentType?: string;
    b_id?: number;
  };
  data?: object;
  showSuccessMsg?: boolean;
  showErrorMsg?: boolean;
  showCustomMsg?: boolean;
  header?: boolean;
  showFieldsError?: boolean;
  [x: string]: any;
}

const setHeaders = (headerCred?: {
  authorization?: string;
  contentType?: string;
  b_id?: number;
}): AxiosRequestHeaders => {
  const headers: AxiosRequestHeaders = {
    'Content-Type': headerCred?.contentType || 'application/json',
  };

  if (headerCred?.authorization) {
    headers['Authorization'] = headerCred.authorization;
  }

  if (headerCred?.b_id) {
    headers['b_id'] = headerCred.b_id.toString();
  }

  return headers;
};

const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_URL || 'https://sbvx0z24-3005.inc1.devtunnels.ms/api/v1',
});

const appService = async (axiosParams: IAppServiceParams) => {
  const {
    method,
    url,
    headerCred,
    data,
    params,
    showFieldsError = false,
    showSuccessMsg,
    showErrorMsg = true,
    showCustomMsg,
    header = false,
    ...axiosOptions
  } = axiosParams;

  try {
    const headers: AxiosRequestHeaders = setHeaders(headerCred);

    const response = await appAxios({
      method,
      url,
      params,
      headers,
      data,
      ...axiosOptions,
    });

    if (showSuccessMsg) {
      toastService.success(response.data?.message || 'Success');
    }

    return response.data;
  } catch (e: any) {
    console.log("🚀 ~ appService error:", { e });

    if (showErrorMsg) {
      const errorMessage = e?.response?.data?.message || e?.message || 'An error occurred';
      toastService.error(errorMessage);
    }
    
    if (showCustomMsg) {
      const errorMessage = e?.response?.data?.message || e?.message || 'An error occurred';
      toastService.error(errorMessage);
    }
    
    if (showFieldsError) {
      console.log({ e });
      const fieldErrorMessage = e?.response?.data?.data?.length
        ? e?.response?.data?.data[0]?.issue
        : e?.response?.data?.message || 'Field validation error';
      toastService.error(fieldErrorMessage);
    }
    
    throw e;
  }
};

export default appService;