import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Time.css"; // Import the CSS for neon styles

const TimerangeSelect = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  return (
    <div className="timerange-container">
      <label className="timerange-label">Select Time Range</label>
      <div className="timerange-inputs">
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="timerange-input"
        />
        <span className="to-text">to</span>
        <DatePicker
          selected={endDate}
          onChange={(date) => setEndDate(date)}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="timerange-input"
        />
      </div>
    </div>
  );
};

export default TimerangeSelect;
