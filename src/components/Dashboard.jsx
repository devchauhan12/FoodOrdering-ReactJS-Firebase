import React, { useEffect, useState } from 'react'
import { db } from '../redux/firebase';
import { doc, getDoc } from 'firebase/firestore';

const Dashboard = () => {
  const [name, setName] = useState()
  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const userRef = doc(db, `LoggedIn/pYqMp57QYmsXBFST9RrL`);
    let user = (await getDoc(userRef)).data().user;
    setName(user.displayName)
  }
  return (
    <div>Welcome {name}</div>
  )
}

export default Dashboard