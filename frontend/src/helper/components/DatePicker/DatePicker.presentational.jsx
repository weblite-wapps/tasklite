import React from "react";
import PropTypes from "prop-types";
import { DatePicker as PersianDatePicker } from "react-persian-datepicker";
import "react-persian-calendar-date-picker/lib/DatePicker.css";
// helpers
import scssClasses from "./DatePicker.scss";

const DatePicker = ({ isError, value, onChange }) => (
  <div className={scssClasses.textField}>
    <PersianDatePicker
      value={value}
      onChange={onChange}
      // required
      // error={isError}
      inputPlaceholder="Deadline"
      // isDayRange
      // inputClassName={scssClasses.responsiveCalendar}
      // disabledDays={disabledDays}
    />
  </div>
);

DatePicker.propTypes = {
  isError: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default DatePicker;
