import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Correo invalido").required("Email requerido"),
  password: Yup.string()
    .min(6, "Debe de ser mas de 6 caracteres")
    .required("Contraseña requerida"),
});

export const registerValidation = Yup.object().shape({
  firstName: Yup.string().required("Nombre requerido"),
  lastName: Yup.string().required("Apellido requerido"),
  email: Yup.string().email("Correo invalido").required("Email requerido"),
  password: Yup.string()
    .min(6, "Debe de ser mas de 6 caracteres")
    .required("Contraseña requerida"),
  contact: Yup.number().required("Contacto requerido"),
});

export const createPageValidation = Yup.object().shape({
  pageName: Yup.string().required("Nombre de la página requerido"),
  description: Yup.string().required("Descripción requerida"),
});

export const createTournoValidation = Yup.object().shape({
  name: Yup.string().required("Nombre del torneo requerido"),
  description: Yup.string().required("Descripción requerida"),
  dateStart: Yup.date().required("Fecha de inicio requerida"),
  game: Yup.string().required("Juego requerido"),
  modality: Yup.array().required("Modalidad requerida"),
  requirements: Yup.array().required("Requisitos requeridos"),
  rules: Yup.array().required("Reglas requeridas"),
});