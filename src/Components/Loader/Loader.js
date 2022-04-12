import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const LoaderWb = () => {
  return (
    <div style={{ width: "100%", height: "98vh",display:'flex',justifyContent:'center',alignItems:'center' }}>
      <ThreeCircles
        color="grey"
        height={110}
        width={110}
        ariaLabel="three-circles-rotating"
      />
    </div>
  );
};

export default LoaderWb;
