import React from "react";

const DefaultTextarea = ({ value, onChange, label }) => {
  return (
    <div>
      <label className="text-gray-500">{label}</label>
      <textarea
        type="text"
        rows={3}
        className="w-full p-2 rounded-md border border-gray-300 outline-none bg-transparent"
        value={value}
        autoComplete="off"
        onChange={onChange}
      />
    </div>
  );
};

export default DefaultTextarea;
