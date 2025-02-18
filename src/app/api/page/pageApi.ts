import axios from '@/lib/axios';

export const createPageApi = async (data: any) => {
  const response = await axios.post('/page', data);
  return response.data;
}

export const addNetworkPageApi = async (url: string) => {
  try {
    const res = await axios.post("/page/add-network", { url });

    const body = res.data;

    if (res.status === 200) {
      return {
        success: true,
        message: body.message,
        status: body.status,
        data: body.data.user,
      }
    } else {
      return {
        success: false,
        message: body.message,
        status: body.status,
        data: null,
      }
    }
  } catch (err: any) {
    if (err.response) {
      return {
        success: false,
        message: err.response.data.message,
        status: err.response.data.status,
        data: null,
      }
    } else {
      return{
        success: false,
        message: err.message || "Opps! Algo salió mal, intente más tarde.",
        status: "error",
        data: null,
      }
    }
  }
}