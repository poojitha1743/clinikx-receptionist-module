import React from "react";


function TokenCard({ token }) {


  return (

    <div

    style={{
      marginTop:"30px",
      background:"#dcfce7",
      padding:"25px",
      borderRadius:"15px",
      textAlign:"center",
      border:"2px solid #16a34a"
    }}

    >

      <h2 style={{color:"#166534"}}>
        Appointment Confirmed ✅
      </h2>


      <h1 style={{color:"#15803d"}}>
        Token Number : {token}
      </h1>


      <p>
        Please wait for your turn.
      </p>


    </div>

  );

}


export default TokenCard;