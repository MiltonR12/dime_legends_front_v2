import * as Yup from 'yup'

export const validatCreateeBattle = Yup.object().shape({
  hour: Yup.string().required('Hora es requerida'),
  date: Yup.date().required('Fecha es requerida'),
})