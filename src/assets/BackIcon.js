import React from 'react';

export const BackIcon = ({forceleft, toggleAction}) => (
  <p style={{ marginLeft: forceleft ? '0px' :'6px', display:'flex', justifyContent: forceleft ? "start" :'center', alignItems: 'center', cursor: "pointer" }}
    onClick={()=>toggleAction()}
  >
    <svg viewBox="0 0 64 64" width="28" height="28" fill='none' style={{display:"flex", justifyContent:"center", alignItems:"center", margin:"5px 0px 0px 0px"}} xmlns='http://www.w3.org/2000/svg'>
        <path d="M38,52a2,2,0,0,1-1.41-.59l-24-24a2,2,0,0,1,0-2.82l24-24a2,2,0,0,1,2.82,0,2,2,0,0,1,0,2.82L16.83,26,39.41,48.59A2,2,0,0,1,38,52Z"fill="#005fff"/>
    </svg>
  </p>
);
