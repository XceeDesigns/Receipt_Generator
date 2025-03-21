import React from 'react'
import { useSelector, useDispatch} from 'react-redux'
import { increment, decrement, incrementByAmount } from '../redux/reducers/demo'
import axiosInstance from '../api/axiosInstance'

const Test = () => {
    const count = useSelector(state => state.count.value)
    const dispatch = useDispatch()

  return (
<>
    <h1>{count}</h1>
    <button onClick={() => dispatch(increment())}>Increment</button>
    <button onClick={() => dispatch(decrement())}>Decrement</button>
    <button onClick={() => dispatch(incrementByAmount(5))}>Increment by 5</button>
</>
  )
}

export default Test