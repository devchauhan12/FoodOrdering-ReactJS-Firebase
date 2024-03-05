import React, { useContext, useEffect, useState } from 'react'
import { db } from '../redux/firebase';
import { doc, getDoc } from 'firebase/firestore';
import { authentication } from '../App';

const Dashboard = () => {
  const { logedUser, setLogedUser } = useContext(authentication)
  return (
    <div>Welcome {logedUser.displayName}</div>
  )
}

export default Dashboard