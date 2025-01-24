import { RemoveIngredient } from './type'

export const removeIngredient: RemoveIngredient = (items, index) => {
  const removedIndex = items.findIndex(({ inBurgerConstructorIndex: id }) => index === id)
  if (removedIndex >= 0) items.splice(removedIndex, 1)

  return [...items]
}
