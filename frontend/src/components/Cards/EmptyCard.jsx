import React from "react";

const EmptyCard = ({ message }) => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <img
        src="./assets/images/empty_data_icon_149938.png"
        alt="No Notes"
        className="w-60 h-50 text-gray-300"
      />
      <p className="w-1/2 text-sm font-medium text-slate-700 text-center leading-7 mt-5">
        {message}
      </p>
    </div>
  );
};

export default EmptyCard;
