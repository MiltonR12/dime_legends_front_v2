import axios from "@/lib/axios";
import { PCreateTeam, PUpdateStatusTeam, PUpdateTeam } from "./team";

export const getTeamByTournamentApi = async (id: string) => {
  try {
    const res = await axios.get(`/team/tournament/${id}`);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const createTeamApi = async (data: PCreateTeam) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("captain", data.captain);
    if (data.image) {
      formData.append("image", data.image);
    }
    data.players.forEach((player) => {
      formData.append("players", player);
    });

    const res = await axios.post(`/team/${data.id}`, formData, {
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

export const updateTeamApi = async (data: PUpdateTeam) => {
  try {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("captain", data.captain);
    if (data.image) {
      formData.append("image", data.image);
    }
    data.players.forEach((player) => {
      formData.append("players", player);
    });

    const res = await axios.put(`/team/${data.id}`, formData, {
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const updateStatusTeamApi = async (data: PUpdateStatusTeam) => {
  try {
    const res = await axios.put(`/team/update-status/${data.id}`, data);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
}

export const deleteTeamApi = async (id: string) => {
  try {
    const res = await axios.delete(`/team/${id}`);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
