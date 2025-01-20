import * as Yup from "yup";

export const validationTournament = Yup.object().shape({
  name: Yup.string().required("Nombre del torneo requerido"),
  description: Yup.string().required("Descripción requerida"),
  dateStart: Yup.date().required("Fecha de inicio requerida"),
  game: Yup.string().required("Juego requerido"),
});
