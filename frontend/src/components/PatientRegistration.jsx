import React, { useState } from "react";

function PatientRegistration({ setPatient }) {

  const [patientData, setPatientData] = useState({
    fullName: "",
    age: "",
    gender: "",
    phone: "",
    address: ""
  });


  const savePatient = () => {

    if(
      patientData.fullName === "" ||
      patientData.age === "" ||
      patientData.gender === ""
    ){

      alert("Please fill all required details");
      return;

    }


    // Temporary saving
    // Later we will replace this with backend API

    setPatient(patientData);

    alert("Patient registered successfully");

  };



  return (

    <div

    style={{
      marginTop:"30px",
      background:"#fff7ed",
      padding:"25px",
      borderRadius:"15px"
    }}

    >

      <h2 style={{color:"#ea580c"}}>
        Register New Patient
      </h2>



      <input

      placeholder="Full Name"

      onChange={(e)=>
        setPatientData({
          ...patientData,
          fullName:e.target.value
        })
      }

      style={inputStyle}

      />



      <input

      placeholder="Age"

      type="number"

      onChange={(e)=>
        setPatientData({
          ...patientData,
          age:e.target.value
        })
      }

      style={inputStyle}

      />



      <select

      onChange={(e)=>
        setPatientData({
          ...patientData,
          gender:e.target.value
        })
      }

      style={inputStyle}

      >

        <option>
          Select Gender
        </option>

        <option>
          Male
        </option>

        <option>
          Female
        </option>

      </select>




      <input

      placeholder="Phone Number"

      onChange={(e)=>
        setPatientData({
          ...patientData,
          phone:e.target.value
        })
      }

      style={inputStyle}

      />




      <input

      placeholder="Address"

      onChange={(e)=>
        setPatientData({
          ...patientData,
          address:e.target.value
        })
      }

      style={inputStyle}

      />





      <button

      onClick={savePatient}

      style={{
        background:"#ea580c",
        color:"white",
        padding:"12px 20px",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer"
      }}

      >

      💾 Save Patient

      </button>



    </div>

  );

}


const inputStyle = {

  width:"100%",
  padding:"12px",
  margin:"8px 0",
  borderRadius:"8px",
  border:"1px solid #ccc"

};


export default PatientRegistration;