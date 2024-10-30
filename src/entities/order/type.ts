import { Ingredient } from 'entities/ingredient';

type OrderStatus = 'created' | 'inprogress' | 'done'

export interface Order {
  id: number
  name?: string
  ingredients: Ingredient[]
  status: OrderStatus
  date: Date
  total: number
}
