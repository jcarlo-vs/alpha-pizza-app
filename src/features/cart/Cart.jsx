import { Link } from 'react-router-dom'
import LinkButton from '../../ui/LinkButton'
import Button from '../../ui/Button'
import CartItem from './CartItem'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart } from './cartSlice'
import EmptyCart from './EmptyCart'

function Cart() {
  const { username } = useSelector((state) => state.user)
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()

  if (cart.length === 0) return <EmptyCart />

  return (
    <div>
      <LinkButton to={'/menu'}>&larr;BACK TO MENU</LinkButton>
      <h1 className='mt-7 text-xl font-semibold'>Your cart, {username}</h1>

      <ul className='mt-3 divide-y divide-stone-200 border-b'>
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>

      <div className='mt-6 space-x-4'>
        <Button to='/order/new' type='primary'>
          Order pizzas
        </Button>
        <Button type='secondary' onClick={() => dispatch(clearCart())}>
          Clear Cart
        </Button>
      </div>
    </div>
  )
}

export default Cart
