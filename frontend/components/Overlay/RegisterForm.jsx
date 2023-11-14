import styles from "../../styles/heading.module.css";

import Form from "./Form";

import clsx from "clsx";
import { useState } from "react";

export default function RegisterForm({ onRelease, onAltRelease }) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  // create new user account
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(name, username, password, address, phone);
    fetch("http://localhost:8080/users/save", {
      method: "POST",
      body: {
        email: "e@gmail.com",
        firstName: name,
        lastname: username,
        password,
      },
    })
      .then((response) => {
        console.log(response);
      })
      .catch(console.error);
  };

  const formatPhoneNumber = (value) => {
    value = value.replace(/\D/g, "");

    let npa = value.slice(0, 3); // number planning area (area code)
    let nxx = value.slice(3, 6); // exchange/central office code
    let sln = value.slice(6, 10); // subscriber line number (last 4 digits)

    return (
      npa +
      (nxx.length > 0 ? "-" : "") +
      nxx +
      (sln.length > 0 ? "-" : "") +
      sln
    );
  };

  const formInputs = [
    <input
      type="text"
      placeholder="Name"
      required
      onChange={(event) => {
        setName(event.target.value);
      }}
    />,
    <input
      type="text"
      placeholder="Username"
      required
      onChange={(event) => {
        setUsername(event.target.value);
      }}
    />,
    <input
      type="password"
      placeholder="Password"
      required
      onChange={(event) => {
        setPassword(event.target.value);
      }}
    />,
    <input
      type="text"
      placeholder="Address"
      required
      onChange={(event) => {
        setAddress(event.target.value);
      }}
    />,
    <input
      type="tel"
      placeholder="Phone Number"
      required
      onChange={(event) => {
        const formattedNumber = formatPhoneNumber(event.target.value);
        event.target.value = formattedNumber;
        setPhone(formattedNumber);
      }}
    />,
  ];

  return (
    <Form
      formType={"Register"}
      formInputs={formInputs}
      onSubmit={handleSubmit}
      onRelease={onRelease}
    >
      <button
        type="submit"
        className={clsx(styles.formSubmit, styles.loginButton)}
      >
        Register
      </button>
      <div className={clsx("my-2", styles.formRegister)}>
        <span>
          Already have an account?{" "}
          <a
            href="#"
            onClick={(event) => {
              onRelease(event);
              onAltRelease(event);
            }}
          >
            Login
          </a>
        </span>
      </div>
    </Form>
  );
}
