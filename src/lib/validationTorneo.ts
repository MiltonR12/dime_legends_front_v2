import * as Yup from "yup";

export const validationBasicTorneo = Yup.object().shape({
  name: Yup.string().required("Nombre del torneo requerido"),
  description: Yup.string().required("Descripción requerida"),
  dateStart: Yup.date().required("Fecha de inicio requerida"),
});
