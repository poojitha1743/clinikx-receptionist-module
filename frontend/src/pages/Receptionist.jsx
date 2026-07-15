import React, { useState } from "react";

import PatientSearch from "../components/PatientSearch";
import PatientRegistration from "../components/PatientRegistration";
import AppointmentBooking from "../components/AppointmentBooking";
import TokenCard from "../components/TokenCard";


function Receptionist() {


  const [patient, setPatient] = useState(null);

  const [showRegister, setShowRegister] = useState(false);

  const [token, setToken] = useState("");



  return (

    <div

    style={{
      minHeight:"100vh",
      background:"#eef4ff",
      padding:"40px",
      fontFamily:"Segoe UI"
    }}

    >


      <div

      style={{
        maxWidth:"900px",
        margin:"auto",
        background:"white",
        padding:"35px",
        borderRadius:"20px",
        boxShadow:"0 8px 25px rgba(0,0,0,0.15)"
      }}

      >


        <h1

        style={{
          textAlign:"center",
          color:"#1E3A8A"
        }}

        >

          🏥 ClinikX Receptionist Dashboard

        </h1>



        <p

        style={{
          textAlign:"center",
          color:"#666"
        }}

        >

          Manage Patients & Appointments

        </p>





        <PatientSearch

        setPatient={setPatient}

        setShowRegister={setShowRegister}

        />







        {
          showRegister &&

          <PatientRegistration

          setPatient={setPatient}

          />

        }







        {
          patient &&

          <>

          <div

          style={{
            marginTop:"25px",
            background:"#dcfce7",
            padding:"20px",
            borderRadius:"15px"
          }}

          >

          <h2>
            Patient Details ✅
          </h2>


          <p>
          <b>Name:</b> {patient.fullName}
          </p>


          <p>
          <b>Age:</b> {patient.age}
          </p>


          <p>
          <b>Gender:</b> {patient.gender}
          </p>


          <p>
          <b>Phone:</b> {patient.phone}
          </p>


          </div>






          <AppointmentBooking

          setToken={setToken}

          />


          </>

        }







        {
          token &&

          <TokenCard

          token={token}

          />

        }




      </div>


    </div>

  );

}


export default Receptionist;