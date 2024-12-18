/* eslint-disable @typescript-eslint/no-explicit-any */
import { IngredientTypes } from 'entities/ingredient'
import { OrderIngredientItem } from 'entities/order'

export type AddIngredientIntoOrder = (items: OrderIngredientItem[], item: OrderIngredientItem, targ?: string) => OrderIngredientItem[]
export type RemoveIngredientFromOrder = (items: OrderIngredientItem[], index: string) => OrderIngredientItem[]
export type CalcOrderTotal = (items: { [x: string]: any, price: number, type: IngredientTypes }[]) => number
export type ChangeIngredientPosition = (items: OrderIngredientItem[], curr: string, targ: string) => OrderIngredientItem[]
export type CheckOrderIsReady = (items: OrderIngredientItem[], length: number) => boolean
