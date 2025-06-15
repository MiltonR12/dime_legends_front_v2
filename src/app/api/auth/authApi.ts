import axios from "@/lib/axios";
import { PCreatePage, PLogin, PRegister } from "./auth";

export const authLoginGoogleApi = async (token: string) => {
  try {
    const res = await axios.post("/google", { token });

    const body = res.data;

    if (res.status === 200) {
      localStorage.setItem("token", body.data.token);
      return {
        success: true,
        message: body.message,
        status: body.status,
        data: body.data.user,
      };
    } else {
      return {
        success: false,
        message: body.message,
        status: body.status,
        data: null,
      };
    }
  } catch (err: any) {
    if (err.response) {
      return {
        success: false,
        message: err.response.data.message,
        status: err.response.data.status,
        data: null,
      };
    } else {
      return {
        success: false,
        message: err.message || "Opps! Algo salió mal, intente más tarde.",
        status: "error",
        data: null,
      };
    }
  }
};

export const authLoginApi = async ({ email, password }: PLogin) => {
  try {
    const res = await axios.post("/login", {
      email,
      password,
    });

    const body = res.data;

    if (res.status === 200) {
      localStorage.setItem("token", body.data.token);
      return {
        futuresyo: {
          success: true,
          code: body.code,
          message: body.message,
          status: body.status,
          data: body.data.user,
        },
      };
    } else {
      return {
        futuresyo: {
          success: false,
          code: body.code,
          message: body.message,
          status: body.status,
          data: null,
        },
      };
    }
  } catch (err: any) {
    if (err.response) {
      return {
        futuresyo: {
          success: false,
          code: err.response.data.code,
          message: err.response.data.message,
          status: err.response.data.status,
          data: null,
        },
      };
    } else {
      return {
        futuresyo: {
          success: false,
          code: 500,
          message: err.message || "Opps! Algo salió mal, intente más tarde.",
          status: "error",
          data: null,
        },
      };
    }
  }
};

export const authRegisterApi = async (data: PRegister) => {
  try {
    const res = await axios.post("/register", data);
    const body = res.data;

    if (res.status === 200) {
      return {
        futuresyo: {
          success: true,
          code: body.code,
          message: body.message,
          status: body.status,
          data: body.data.user,
        },
      };
    } else {
      return {
        futuresyo: {
          success: false,
          code: body.code,
          message: body.message,
          status: body.status,
          data: null,
        },
      };
    }
  } catch (err: any) {
    if (err.response) {
      return {
        futuresyo: {
          success: false,
          code: err.response.data.code,
          message: err.response.data.message,
          status: err.response.data.status,
          data: null,
        },
      };
    } else {
      return {
        futuresyo: {
          success: false,
          code: 500,
          message: err.message || "Opps! Algo salió mal, intente más tarde.",
          status: "error",
          data: null,
        },
      };
    }
  }
};

export const validateTokenApi = async () => {
  try {
    const res = await axios.get("/validate-token");
    const body = res.data;
    if (res.status === 200) {
      localStorage.setItem("token", body.data.token);
      return {
        success: true,
        message: body.message,
        status: body.status,
        data: body.data.user,
      };
    } else {
      return {
        success: false,
        message: body.message,
        status: body.status,
        data: null,
      };
    }
  } catch (err: any) {
    if (err.response) {
      return {
        success: false,
        message: err.response.data.message,
        status: err.response.data.status,
        data: null,
      };
    } else {
      return {
        success: false,
        message: err.message || "Opps! Algo salió mal, intente más tarde.",
        status: "error",
        data: null,
      };
    }
  }
};

export const createPageApi = async (data: PCreatePage) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("image", data.image);

    const res = await axios.post("/page", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const body = res.data;

    if (res.status === 200) {
      return {
        success: true,
        message: body.message,
        status: body.status,
        data: body.data,
      };
    } else {
      return {
        success: false,
        message: body.message,
        status: body.status,
        data: null,
      };
    }
  } catch (err: any) {
    if (err.response) {
      return {
        success: false,
        message: err.response.data.message,
        status: err.response.data.status,
        data: null,
      };
    } else {
      return {
        success: false,
        message: err.message || "Opps! Algo salió mal, intente más tarde.",
        status: "error",
        data: null,
      };
    }
  }
};
