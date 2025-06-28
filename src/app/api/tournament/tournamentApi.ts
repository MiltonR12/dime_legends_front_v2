import axios from "@/lib/axios";
import {
  PTournament,
  PUpdateTournament,
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
    formData.append("name", tournament.name ?? "");
    formData.append("description", tournament.description);
    formData.append("game", tournament.game);
    formData.append("dateStart", tournament.dateStart);
    formData.append("formUrl", tournament.formUrl);
    tournament.award.forEach((item) => {
      formData.append("award", item);
    });

    tournament.rules.forEach((item) => {
      formData.append("rules", item);
    });
    formData.append("image", tournament.image);

    // COnfiguration

    formData.append("maxPlayers", tournament.config.maxPlayers.toString());
    formData.append("maxTeams", tournament.config.maxTeams.toString());
    formData.append("minPlayers", tournament.config.minPlayers.toString());
    formData.append(
      "registrationEnd",
      tournament.config.registrationEnd.toString()
    );
    formData.append("tipo", tournament.config.tipo);

    // Payment

    if (tournament.payment && tournament.payment.qrImage) {
      formData.append("qr", tournament.payment.qrImage);
      formData.append("account", tournament.payment.account);
      formData.append("amount", tournament.payment.amount.toString());
    }

    const res = await axios.post("/tournament", formData, {
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

export const updateTournamentApi = async (tournament: PUpdateTournament) => {
  try {
    const formData = new FormData();
    if (tournament.name) formData.append("name", tournament.name);
    if (tournament.description)
      formData.append("description", tournament.description);
    if (tournament.game) formData.append("game", tournament.game);
    if (tournament.dateStart)
      formData.append("dateStart", tournament.dateStart);
    if (tournament.formUrl) formData.append("formUrl", tournament.formUrl);

    if (tournament.status !== undefined) {
      formData.append("status", tournament.status.toString());
    }
    if (tournament.award) {
      tournament.award.forEach((item) => {
        formData.append("award", item);
      });
    }

    if (tournament.rules) {
      tournament.rules.forEach((item) => {
        formData.append("rules", item);
      });
    }

    if (tournament.image) {
      formData.append("image", tournament.image);
    }

    // COnfiguration

    if (tournament?.config?.maxPlayers) {
      formData.append("maxPlayers", tournament.config.maxPlayers.toString());
    }
    if (tournament?.config?.maxTeams) {
      formData.append("maxTeams", tournament.config.maxTeams.toString());
    }

    if (tournament?.config?.minPlayers) {
      formData.append("minPlayers", tournament.config.minPlayers.toString());
    }

    if (tournament?.config?.registrationEnd) {
      formData.append(
        "registrationEnd",
        tournament.config.registrationEnd.toString()
      );
    }

    if (tournament?.config?.tipo) {
      formData.append("tipo", tournament.config.tipo);
    }

    if (tournament.payment && tournament.payment.qrImage) {
      formData.append("qr", tournament.payment.qrImage);
      formData.append("account", tournament.payment.account);
      formData.append("amount", tournament.payment.amount.toString());
    }

    const res = await axios.put(`/tournament/${tournament._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    const body = res.data;

    console.log(body.data);
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
