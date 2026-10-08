import * as Yup from "yup";

const identidad = {
  name: Yup.string().trim().required("Nombre del torneo requerido"),
  game: Yup.string().required("Juego requerido"),
  dateStart: Yup.date().required("Fecha de inicio requerida"),
  bannerSlots: Yup.array().min(1, "Sube al menos una imagen del banner"),
};

const juego = {
  description: Yup.string().trim().required("Descripción requerida"),
};

const cupos = {
  minPlayers: Yup.number()
    .min(1, "Mínimo 1 jugador")
    .required("Mínimo de jugadores requerido"),
  maxPlayers: Yup.number()
    .min(1, "Mínimo 1 jugador")
    .required("Máximo de jugadores requerido")
    .test(
      "min-max",
      "Debe ser mayor o igual al mínimo",
      function (value) {
        const min = this.parent.minPlayers;
        const minimum = typeof min === "number" ? min : undefined;
        return value == null || minimum == null || value >= minimum;
      }
    ),
  maxTeams: Yup.number()
    .min(1, "Mínimo 1 equipo")
    .required("Máximo de equipos requerido"),
  chargeFee: Yup.boolean(),
  amount: Yup.number().when("chargeFee", {
    is: true,
    then: (schema) => schema.min(1, "Indica el costo").required("Indica el costo"),
    otherwise: (schema) => schema.notRequired(),
  }),
  qrImage: Yup.mixed()
    .nullable()
    .when("chargeFee", {
      is: true,
      then: (schema) => schema.required("Sube el QR de pago"),
      otherwise: (schema) => schema.notRequired(),
    }),
};

export const stepFields = {
  identidad: ["name", "game", "dateStart", "bannerSlots"] as const,
  juego: ["description"] as const,
  cupos: ["minPlayers", "maxPlayers", "maxTeams", "amount", "qrImage"] as const,
};

export const validationTournament = Yup.object().shape({
  ...identidad,
  ...juego,
  ...cupos,
});
