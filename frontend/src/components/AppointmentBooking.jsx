import React, { useState } from "react";


function AppointmentBooking({ setToken }) {


  const [appointment, setAppointment] = useState({

    doctor:"",
    date:"",
    time:"",
    problem:""

  });



  const doctors = [

    {
      name:"Dr. Priya",
      department:"Cardiology"
    },

    {
      name:"Dr. Rajesh",
      department:"Dermatology"
    },

    {
      name:"Dr. Arjun",
      department:"Neurology"
    }

  ];





  const bookAppointment = () => {


    if(
      appointment.doctor === "" ||
      appointment.date === "" ||
      appointment.time === ""
    ){

      alert("Please fill appointment details");
      return;

    }



    const generatedToken =
      "T" + Math.floor(Math.random()*900 + 100);



    setToken(generatedToken);


  };




  return (

    <div

    style={{
      marginTop:"30px",
      background:"#eff6ff",
      padding:"25px",
      borderRadius:"15px"
    }}

    >


      <h2 style={{color:"#1d4ed8"}}>
        Book Appointment
      </h2>




      <label>
        Select Doctor
      </label>


      <select

      style={inputStyle}

      onChange={(e)=>
        setAppointment({
          ...appointment,
          doctor:e.target.value
        })
      }

      >

        <option>
          Select Doctor
        </option>


        {
          doctors.map((doc,index)=>(

            <option key={index}>

              {doc.name} - {doc.department}

            </option>

          ))
        }


      </select>






      <label>
        Appointment Date
      </label>


      <input

      type="date"

      style={inputStyle}

      onChange={(e)=>
        setAppointment({
          ...appointment,
          date:e.target.value
        })
      }

      />







      <label>
        Time Slot
      </label>


      <select

      style={inputStyle}

      onChange={(e)=>
        setAppointment({
          ...appointment,
          time:e.target.value
        })
      }

      >

        <option>
          Select Time
        </option>

        <option>
          10:00 AM
        </option>

        <option>
          11:00 AM
        </option>

        <option>
          2:00 PM
        </option>

        <option>
          4:00 PM
        </option>


      </select>






      <textarea

      placeholder="Problem Description"

      style={inputStyle}

      onChange={(e)=>
        setAppointment({
          ...appointment,
          problem:e.target.value
        })
      }

      />







      <button

      onClick={bookAppointment}

      style={{
        background:"#2563EB",
        color:"white",
        padding:"12px 25px",
        border:"none",
        borderRadius:"8px",
        cursor:"pointer"
      }}

      >

      📅 Book Appointment

      </button>



    </div>

  );

}




const inputStyle={

  width:"100%",
  padding:"12px",
  margin:"10px 0",
  borderRadius:"8px",
  border:"1px solid #ccc"

};



export default AppointmentBooking;