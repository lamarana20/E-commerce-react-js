import React from 'react'
import ClipLoader from "react-spinners/ClipLoader";
const overSide ={
   display: "block",
   margin: "0 auto",
  
}

const Spinner = () => {
  const loading = true;
  return (
    <div>
        <ClipLoader
         color="#36d7b7"
          loading={loading}
           cssOverride={overSide}
           size={150}
        />
      
    </div>
  )
}

export default Spinner