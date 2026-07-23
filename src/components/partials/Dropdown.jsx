import React from "react";

const Dropdown = ({ title, options, func }) => {
  return (
    <div className="w-full sm:w-48 md:w-56">
      <select
        defaultValue="0"
        onChange={func}
        name="format"
        id="format"
        className="w-full px-4 py-2 bg-[#2A2A33] text-white border border-zinc-600 rounded-lg outline-none cursor-pointer focus:border-[#6556cd] focus:ring-2 focus:ring-[#6556cd] transition"
      >
        <option value="0" disabled>
          {title}
        </option>

        {options.map((o, i) => (
          <option key={i} value={o}>
            {o.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
