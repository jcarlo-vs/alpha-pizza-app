import React from 'react'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import {
  decreaseItemQuantity,
  getCurrentQuantityById,
  increaseItemQuantity,
} from './cartSlice'

const UpdateItemQuantity = ({ pizzaId }) => {
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))
  const dispatch = useDispatch()

  return (
    <div className='flex items-center gap-2 md:gap-3'>
      <Button
        type='round'
        onClick={() => dispatch(decreaseItemQuantity(pizzaId))}
      >
        -
      </Button>
      {currentQuantity}
      <Button
        type='round'
        onClick={() => {
          dispatch(increaseItemQuantity(pizzaId))
        }}
      >
        +
      </Button>
    </div>
  )
}

export default UpdateItemQuantity
