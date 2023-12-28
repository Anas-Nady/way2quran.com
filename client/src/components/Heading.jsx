import React from "react";

const Heading = ({ sectionTitle }) => {
  return (
    <>
      <h1 className="text-center text-3xl font-bold text-orange-500 ">
        {sectionTitle}
      </h1>
      <span className="bg-orange-500 w-[60px] h-[2px] my-3 flex justify-center items-center mx-auto"></span>
    </>
  );
};

export default Heading;
