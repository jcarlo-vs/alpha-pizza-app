import { useSelector } from 'react-redux'
import CreateUser from '../features/user/CreateUser'
import Button from './Button'

function Home() {
  const { username } = useSelector((state) => state.user)

  return (
    <div className='mb-10 mt-10 text-center sm:my-16'>
      <h1 className='mb-8  px-4 text-center text-xl font-semibold text-stone-700 md:text-3xl'>
        The best pizza.
        <br />
        <span className='text-yellow-500'>
          Straight out of the oven, straight to you.
        </span>
      </h1>
      {username === '' ? (
        <CreateUser />
      ) : (
        <Button type='primary' to='/menu'>
          Continue Ordering, {username}
        </Button>
      )}
    </div>
  )
}

export default Home
