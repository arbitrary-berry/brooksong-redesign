import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { CustomerAuthContext } from "../context/CustomerAuthProvider";
import Visibility from "@mui/icons-material/Visibility";

function Signup({onSignup}) {
  const { signUp, handleAuthSubmit, handleClick, error } = useContext(CustomerAuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const history = useHistory();

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <h2>Please Sign Up!</h2>
      <p>
        Already have an account? <span onClick={handleClick}>Log In!</span>
      </p>
      <Formik
        initialValues={{
            first_name:"",
            last_name:"",
            email: "",
            username: "",
            password: "",
            address: "",
        }}
        validationSchema={Yup.object({
            first_name: Yup.string().required("First name is required"),
            last_name: Yup.string().required("Last name is required"),
            email: signUp
            ? Yup.string()
                .email("Invalid email address")
                .required("Email is required")
            : Yup.string(),
            username: Yup.string().required("Username is required"),
            password: Yup.string()
            .required("Password is required")
            .min(6, "Password must be at least 6 characters long.")
            .matches(/[A-Z]/, "Password must contain at least one uppercase letter.")
            .matches(/[0-9]/, "Password must contain at least one digit.")
            .matches(/[!@#$%^&*()_\-+=<>?/~.]/, "Password must contain at least one special character."),
            confirmPassword: signUp
                ? Yup.string()
                    .oneOf([Yup.ref("password"), null], "Passwords must match")
                    .required("Confirm Password is required")
                : Yup.string(),
          address: Yup.string().required("Address is required"),
        })}
        onSubmit={(values, actions) => {
          handleAuthSubmit(values, actions, "signup");
          history.push("/profile/:id");     
       
          onSignup();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
                <label htmlFor="first_name">First Name</label>
                <Field type="text" id="first_name" name="first_name" />
                <ErrorMessage name="first_name" />
            </div>
            <div>
                <label htmlFor="last_name">Last Name</label>
                <Field type="text" id="last_name" name="last_name" />
                <ErrorMessage name="last_name" />
            </div>
            {signUp && (
              <div>
                <label htmlFor="email">Email</label>
                <Field type="text" id="email" name="email" />
                <ErrorMessage name="email" />
              </div>
            )}
            <div>
              <label htmlFor="address">Address</label>
              <Field type="text" id="address" name="address" />
              <ErrorMessage name="address" />
            </div>
            <div>
              <label htmlFor="username">Username</label>
              <Field type="text" id="username" name="username" />
              <ErrorMessage name="username" />
            </div>
            <div>
              <label htmlFor="password">Password</label>
              <Field
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                autoComplete="current-password"
              />
              <Visibility
                onClick={() => setShowPassword(!showPassword)}
                style={{ cursor: "pointer" }}
              />
              <ErrorMessage name="password" />
            </div>
            <div>
              <label htmlFor="confirmPassword">Confirm Password</label>
              <Field
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                autoComplete="current-password"
              />
              <Visibility
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{ cursor: "pointer" }}
              />
              <ErrorMessage name="confirmPassword" />
            </div>
            <div>
            <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Loading..." : "Sign Up"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Signup;