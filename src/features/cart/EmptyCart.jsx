import { Link } from 'react-router-dom'
import Button from '../../ui/Button'

function EmptyCart() {
  return (
    <div>
      <Link to='/menu'>&larr; Back to menu</Link>

      <p>Your cart is still empty. Start adding some pizzas :)</p>
      <Button type='primary' to='/menu'>
        ADD ORDER
      </Button>
    </div>
  )
}

export default EmptyCart
