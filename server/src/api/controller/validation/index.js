import * as yup from 'yup'

const validateSchema = {
  signIn: yup.object({
    user_name: yup.string().email().required(),
    password: yup.string().required(),
  }),
  order: yup.object({
    profile: yup.object({
      name: yup.string().required(),
      email: yup.string().required(),
      address: yup.string().required(),
      phoneNumber: yup.string().required(),
      note: yup.string()
    }),
    order: yup.array()
      .of(
        yup.object().shape({
          productId: yup.string().required(),
          quantity: yup.number().required(),
          price: yup.number().required()
        })
      )
  }),
  cancelOrder: yup.object({
      order_id: yup.string().required()
  })
}

export default validateSchema
