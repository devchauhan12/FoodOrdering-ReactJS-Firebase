import { getAuth } from 'firebase/auth'
import React, { useEffect } from 'react'
import { app } from '../redux/firebase'

const Dashboard = () => {
    let auth = getAuth(app)
  useEffect(() => {
    getData()
  }, [])
  const getData = () => {
    console.log(auth.currentUser)
  }
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard