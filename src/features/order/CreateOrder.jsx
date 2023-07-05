import store from '../../store'
import { useState } from 'react'
import { Form, redirect, useActionData, useNavigation } from 'react-router-dom'
import { createOrder } from '../../services/apiRestaurant'
import Button from '../../ui/Button'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice'
import EmptyCart from '../cart/EmptyCart'
import { formatCurrency } from '../../utils/helpers'
import { fetchAddress } from '../user/userSlice'

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  )

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false)
  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice)
  const priorityPrice = withPriority ? 0.2 * totalCartPrice : 0
  const totalPrice = totalCartPrice + priorityPrice
  const { username, position, address, status, error } = useSelector(
    (state) => state.user
  )
  const navigation = useNavigation()
  const isSubmitting = navigation.state === 'submitting'
  const isLoadingAddress = status === 'loading'
  const formErrors = useActionData()
  const dispatch = useDispatch()
  console.log(position, address)

  if (!cart.length) return <EmptyCart />

  return (
    <div className='px-4 py-6'>
      <h2 className='mb-8 text-xl font-semibold'>Ready to order? Let's go!</h2>

      <Form method='POST'>
        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>First Name</label>
          <input
            defaultValue={username}
            type='text'
            name='customer'
            required
            className='input grow'
          />
        </div>

        <div className='mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Phone number</label>
          <div className='flex-1'>
            <input type='tel' name='phone' required className='input w-full' />
            {formErrors?.phone && (
              <p className='mt-2 rounded-lg bg-red-100 p-2 text-sm text-red-700'>
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className='relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center'>
          <label className='sm:basis-40'>Address</label>
          <div className='grow'>
            <input
              className='input w-full'
              type='text'
              name='address'
              defaultValue={`${address}`}
              // placeholder={`${address}`}
              disabled={isLoadingAddress}
              required
            />
            {status === 'error' && (
              <p className='mt-2 rounded-lg bg-red-100 p-2 text-sm text-red-700'>
                {error}
              </p>
            )}
          </div>

          {!position.latitude && !position.longitude && (
            <span className='absolute right-[3px] top-[-10px] z-20 md:right-[5px] md:top-[2px]'>
              <Button
                type='small'
                disabled={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault()
                  dispatch(fetchAddress())
                }}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className='mb-12 flex items-center gap-5'>
          <input
            type='checkbox'
            name='priority'
            id='priority'
            className='h-6 w-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2'
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor='priority' className='font-medium'>
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type='hidden' name='cart' value={JSON.stringify(cart)} />
          <input
            type='hidden'
            name='position'
            value={
              position.longitude && position.latitude
                ? `${position.latutitude},${position.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting} type='primary'>
            {isSubmitting
              ? 'Placing order'
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  )
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }
  console.log(order)

  const errors = {}
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number we might need it to contact you .'

  if (Object.keys(errors).length > 0) {
    return errors
  }

  const newOrder = await createOrder(order)
  store.dispatch(clearCart())

  return redirect(`/order/${newOrder.id}`)
  // return null
}

export default CreateOrder
