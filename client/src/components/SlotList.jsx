import React from "react";

const SlotList = ({ slots, onSelect }) => {
  console.log('slot booked hai ki nhi : ',slots[0]?.booked,slots[1]?.booked);
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {slots.map((slot) => (
        <button
          key={slot._id}
          disabled={slot.booked}
          onClick={() => onSelect(slot)}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition 
            ${slot.booked 
              ? "bg-gray-200 text-gray-500 cursor-not-allowed" 
              : "bg-gradient-to-r from-indigo-500 to-purple-600 text-white hover:opacity-90"}`}
        >
          {slot.time}
        </button>
      ))}
    </div>
  );
};

export default SlotList;
