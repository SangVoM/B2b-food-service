export const AUTH_ENDPOINT = {
  LOGIN: '/auth/sign-in',
  LIST_USER: '/auth/list-user',
}

export const COMMON_ENDPOINT = {
  LIST_CATEGORY: '/product-category/list-category',
  LIST_PRODUCT: (page, limit, category_id) => `/product-category/list-product?page=${page}&limit=${limit}&category_id=${category_id}`,
  ADD_TO_CARD: '/order/add-to-card',
  CANCEL_ORDER: '/order/cancel-order'
}
