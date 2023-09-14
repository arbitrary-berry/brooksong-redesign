import React, { useEffect } from "react";
import Header from "./Header";
import AccountDetails from "./AccountDetails";
import { useParams } from "react-router-dom"; // Import useParams to get user ID
import { useCustomerAuth } from "../context/CustomerAuthProvider";

const Profile = () => {
  const { customer, setCustomer } = useCustomerAuth(); 
  const { id } = useParams(); 

  useEffect(() => {
    fetch(`/customers/${id}`) // Use the 'id' from useParams
      .then(response => response.json())
      .then(customer => setCustomer(customer))
      .catch(error => {
        // Handle error, e.g., setUser(null) or show an error message
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