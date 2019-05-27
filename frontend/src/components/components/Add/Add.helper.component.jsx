// modules
import React from "react";
import PropTypes from "prop-types";
// components
import CustomizedTextField from "../../../helper/components/TextField/TextField.presentational";
import CustomizedSelectField from "../../../helper/components/SelectField/SelectField.presentational";
import CustomizedDatePicker from "../../../helper/components/DatePicker/DatePicker.presentational";
import CustomizedButton from "../../../helper/components/Button/Button.presentational";
// styles
import scssClasses from "./Add.scss";

export const TextField = ({ isError, title, onTitleChange }) => (
  <CustomizedTextField
    label="Title"
    value={title}
    onChange={e => onTitleChange(e.target.value)}
    isError={isError}
  />
);

TextField.propTypes = {
  isError: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  onTitleChange: PropTypes.func.isRequired
};

export const SelectField = ({ priority, onPriorityChange }) => (
  <CustomizedSelectField
    label="Priority"
    value={priority}
    onChange={e => onPriorityChange(e.target.value)}
  />
);

SelectField.propTypes = {
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  onPriorityChange: PropTypes.func.isRequired
};

export const DatePicker = ({ isError, deadline, onDeadlineChange }) => (
  <CustomizedDatePicker
    value={deadline}
    onChange={e => onDeadlineChange(e.target.value)}
    isError={isError}
  />
);

DatePicker.propTypes = {
  isError: PropTypes.bool.isRequired,
  deadline: PropTypes.string.isRequired,
  onDeadlineChange: PropTypes.func.isRequired
};

export const Button = ({
  title,
  selectedUser,
  selectedTags,
  priority,
  deadline,
  label,
  handleAddTask
}) => (
  <div className={scssClasses.button}>
    <CustomizedButton
      label={label}
      componentName="Add"
      onClick={() =>
        handleAddTask(
          title,
          selectedUser,
          selectedTags,
          priority,
          deadline ? new Date(deadline) : ""
        )
      }
    />
  </div>
);

Button.propTypes = {
  title: PropTypes.string.isRequired,
  selectedUser: PropTypes.shape({}).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  priority: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  deadline: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleAddTask: PropTypes.func.isRequired
};
