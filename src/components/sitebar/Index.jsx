import React from 'react'
import { Navigate, NavLink } from 'react-router-dom'

const Sitebar = () => {
    // const navigate = Navigate();
    // const logOut = () => {
    //     localStorage.removeItem('token');
    //     navigate('/')
    // }
  return (
    <section>
        <main>
            <img src="" alt="" />
            <NavLink to={'/statictics'}>Statictics</NavLink>
            <div>Natijalar</div>
            <div>Kategoriyalar</div>
            <div>Testlar</div>
            <div>Darslar</div>
            <div>Reklamalar</div>
            <div>Viloyatlar</div>
            <div>Chiqish</div>
        </main>
    </section>
  )
}

export default Sitebar