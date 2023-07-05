import { useDispatch } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import { deleteItem } from './cartSlice'
import DeleteItem from './DeleteItem'
import UpdateItemQuantity from './UpdateItemQuantity'

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item
  const dispatch = useDispatch()

  const handleDelete = (id) => {
    dispatch(deleteItem(id))
  }

  return (
    <li className='py-3 font-semibold sm:flex sm:items-center sm:justify-between'>
      <p className='mb-1 sm:mb-0'>
        {quantity}&times; {name}
      </p>
      <div className='flex items-center justify-between sm:gap-6'>
        <p className='text-sm font-semibold'>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <DeleteItem onClick={() => handleDelete(pizzaId)} />
      </div>
    </li>
  )
}

export default CartItem
