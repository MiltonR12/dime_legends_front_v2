import * as Yup from 'yup'

export const validatCreateeBattle = Yup.object().shape({
  date: Yup.date().required('Fecha es requerida'),
})