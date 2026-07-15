import React, { useState } from "react";
import axios from "axios";

function PatientSearch({ setPatient, setShowRegister }) {

  const [phone, setPhone] = useState("");

  const checkPatient = async () => {

    if(phone.trim() === ""){
      alert("Please enter phone number");
      return;
    }


    try {

      const res = await axios.post(
        "http://localhost:5000/api/patients/check",
        {
          phone
        }
      );


      if(res.data.exists){

        setPatient(res.data.patient);
        setShowRegister(false);

      }
      else{

        setPatient(null);
        setShowRegister(true);

      }


    }
    catch(error){

      console.log(error);

      // Temporary testing until backend is connected
      setShowRegister(true);

    }

  };



  return (

    <div
    style={{
      marginTop:"30px",
      background:"#f8fafc",
      padding:"25px",
      borderRadius:"15px"
    }}
    >

      <h2 style={{color:"#1E40AF"}}>
        Search Patient
      </h2>


      <input

      type="text"

      placeholder="Enter Phone Number"

      value={phone}

      onChange={(e)=>setPhone(e.target.value)}

      style={{
        width:"100%",
        padding:"12px",
        marginBottom:"15px",
        borderRadius:"8px",
        border:"1px solid #ccc"
      }}

      />


      <button

      onClick={checkPatient}

      style={{
        width:"100%",
        padding:"12px",
        background:"#16A34A",
        color:"white",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer"
      }}

      >

      🔍 Check Patient

      </button>


    </div>

  );

}


export default PatientSearch;