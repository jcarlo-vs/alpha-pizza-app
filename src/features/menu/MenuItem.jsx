import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { addItem, getCurrentQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

function MenuItem({ pizza }) {
  const cart = useSelector((state) => state.cart)
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza
  const dispatch = useDispatch()
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: 1 * unitPrice,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className='flex gap-4 py-2'>
      <img
        src={imageUrl}
        className={`${soldOut ? 'h-24 opacity-70 grayscale' : ' h-24'}`}
        alt={name}
      />
      <div className='flex flex-1 flex-col pt-0.5'>
        <p className='font-medium'>{name}</p>
        <p className='text-sm capitalize italic text-stone-500'>
          {ingredients.join(', ')}
        </p>
        <div className='mt-auto flex items-center justify-between'>
          {!soldOut ? (
            <p className='text-sm'>{formatCurrency(unitPrice)}</p>
          ) : (
            <p className='text-sm font-medium uppercase text-stone-500'>
              Sold out
            </p>
          )}

          {isInCart && (
            <div className='flex items-center gap-3 sm:gap-8'>
              <UpdateItemQuantity pizzaId={id} />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!isInCart && !soldOut && (
            <div>
              <Button type='small' onClick={handleAddToCart}>
                ADD TO CART
              </Button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}

export default MenuItem
