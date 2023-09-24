import React from 'react'

const AccountDetails = ({ first_name, last_name, email, username, password, address }) => {

  
  return (
    <div>
      <h1>First Name: {first_name} Last Name: {last_name} </h1>
      <p>Email: {email} </p>
      <p>Username: {username}</p>
      <p>Address: {address}</p>

    </div>
  )
}

export default AccountDetails