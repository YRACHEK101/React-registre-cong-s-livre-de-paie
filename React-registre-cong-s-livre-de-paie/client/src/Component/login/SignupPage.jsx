import React, { useState } from "react";
import axios from "axios";
import "./SignupPage.css";
import { useEffect } from "react";

const SignupPage = () => {
  const [formData, setFormData] = useState({
    Prenom: "",
    Nom: "",
    CIN: "",
    Password: "",
  });
  function handleChange(e) {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  // Get Data in sheet
  const getData = () => {
    fetch(
      "https://api.sheetbest.com/sheets/c59d21a8-2f86-4b11-bda8-03d2cd592fd3"// API sheet best
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  // run the function getData
  useEffect(() => {
    getData();
  }, []);
  const PostData = (e) => {
    e.preventDefault();
    const data = {...formData};
    // Add one line to the sheet
    fetch(
      "https://api.sheetbest.com/sheets/c59d21a8-2f86-4b11-bda8-03d2cd592fd3",
      {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((r) => r.json())
      .then((data) => {
        // The response comes here
        console.log(data);
      })
      .catch((error) => {
        // Errors are reported there
        console.log(error);
      });
  };

  return (
    <div className="signup-container">
      <form className="signup-form" method="post" onSubmit={PostData}>
        <h2>Inscription</h2>
        <div className="form-group">
          <label htmlFor="Prenom">Prénom :</label>
          <input
            type="text"
            id="Prenom"
            name="Prenom"
            value={formData.Prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Nom">Nom :</label>
          <input
            type="text"
            id="Nom"
            name="Nom"
            value={formData.Nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="CIN">CIN :</label>
          <input
            type="text"
            id="CIN"
            name="CIN"
            value={formData.CIN}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="Password">Mot de passe :</label>
          <input
            type="password"
            id="Password"
            name="Password"
            value={formData.Password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="signup-button">
          Inscription
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
