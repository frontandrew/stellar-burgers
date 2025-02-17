import { OrdersResponse } from 'features/orders'

export const isOrdersResponse = (value: unknown): value is OrdersResponse =>
  typeof value === 'object'
  && value !== null
  && 'success' in value
  && typeof value.success === 'boolean'
  && 'orders' in value
  && Array.isArray(value.orders)
  && 'total' in value
  && typeof value.total === 'number'
  && 'totalToday' in value
  && typeof value.totalToday === 'number'
