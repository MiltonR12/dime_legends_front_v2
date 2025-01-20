import axios from "@/lib/axios";
import {
  PTournament,
  RGetMyTournament,
  RGetTournamentById,
} from "./tournament";

export const getTournamentByIdApi = async (id: string) => {
  try {
    const res = await axios.get<RGetTournamentById>(`/tournament/${id}`);
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

export const getListTournamentApi = async () => {
  try {
    const res = await axios.get("/tournament/list");
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

export const getMyTournamentApi = async () => {
  try {
    const res = await axios.get<RGetMyTournament>("/tournament/mis-torneos");
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

export const createTournamentApi = async (tournament: PTournament) => {
  try {
    const formData = new FormData();
    formData.append("name", tournament.name);
    formData.append("description", tournament.description);
    formData.append("game", tournament.game);
    formData.append("dateStart", tournament.dateStart);
    formData.append("formUrl", tournament.formUrl);
    formData.append("award", JSON.stringify(tournament.award));
    formData.append("modality", JSON.stringify(tournament.modality));
    formData.append("requirements", JSON.stringify(tournament.requirements));
    formData.append("rules", JSON.stringify(tournament.rules));
    formData.append("image", tournament.image);

    // COnfiguration

    formData.append("maxPlayers", tournament.config.maxPlayers.toString());
    formData.append("maxTeams", tournament.config.maxTeams.toString());
    formData.append("minPlayers", tournament.config.minPlayers.toString());
    formData.append("registrationEnd", tournament.config.registrationEnd.toString());
    formData.append("tipo", tournament.config.tipo);

    // Payment

    if (tournament.payment && tournament.payment.qrImage) {
      formData.append("qrImage", tournament.payment.qrImage);
      formData.append("account", tournament.payment.account);
      formData.append("amount", tournament.payment.amount.toString());
    }

    const res = await axios.post("/tournament", tournament, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

export const deleteTournamentApi = async (id: string) => {
  try {
    const res = await axios.delete(`/tournament/${id}`);
    const body = res.data;

    if (res.status === 200) {
      return {
        success: true,
        message: body.message,
        status: body.status,
        data: null,
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
