import * as Yup from 'yup'

export const validatCreateeBattle = Yup.object().shape({
  date: Yup.date().required('Fecha es requerida'),
  teamTwo: Yup.string().test(
    'different-teams',
    'Elige dos equipos distintos',
    function (value) {
      const { teamOne } = this.parent
      return !value || !teamOne || value !== teamOne
    },
  ),
})
