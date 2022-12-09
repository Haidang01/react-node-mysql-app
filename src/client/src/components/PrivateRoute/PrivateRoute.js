import React from 'react'
import { useSelector } from 'react-redux'
import LoadingToRedirect from './LoadingToRedirect'

const PrivateRoute = ({ children }) => {
  const { dataUser } = useSelector(state => ({ ...state.auth }))

  return dataUser.id ? children : <LoadingToRedirect />
}

export default PrivateRoute