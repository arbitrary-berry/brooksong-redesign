import React, { useEffect, useContext } from "react";
import Header from "./Header";
import AccountDetails from "./AccountDetails";
import { useParams } from "react-router-dom";
import { CustomerAuthContext } from "../context/CustomerAuthProvider";

const Profile = () => {
  const { customer, setCustomer } = useContext(CustomerAuthContext); 
  const { id } = useParams(); 

  useEffect(() => {
    fetch(`/customers/${id}`)
      .then(response => response.json())
      .then(customer => setCustomer(customer))
      .catch(error => {
        console.error("Error fetching user:", error);
      });
  }, [id, setCustomer]);

  return (
    <div>
      <Header />
      {customer && (
        <AccountDetails
          first_name={customer.first_name}
          last_name={customer.last_name}
          email={customer.email}
          username={customer.username}
          address={customer.address}
        />
      )}
    </div>
  );
};

export default Profile;