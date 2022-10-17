import React, {useState } from 'react'
import CircleLoader from "react-spinners/CircleLoader";



function Loader() {
    
    let [loading, setLoading] = useState(true);
   
      
  return (
    <div >
        <div >
             <CircleLoader color='#000' loading={loading}  size={80}  className="sweet-loading"/>
        </div>
    </div>
  )
}

export default Loader
