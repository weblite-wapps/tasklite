import React from 'react'
import PropTypes from 'prop-types' 
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import "react-persian-calendar-date-picker/lib/DatePicker.css";
import { Calendar } from "react-persian-calendar-date-picker";
// helpers
import './DatePicker.scss'
import styles from '../Avatar/Avatar.style'

const DatePicker = ({ classes, value, onChange }) => (
  <div className="c--datePicker_textField">
    <Typography variant="body2" className={classes.text}>
      Deadline
    </Typography>

    <Calendar
      selectedDay={value}
      onChange={onChange}
      colorPrimary="#4caf50"
      calendarClassName="c--datePicker_calendar"
      calendarTodayClassName="c--datePicker_calendar-today"
    />
  </div>
);

DatePicker.propTypes = {
  value: PropTypes.shape({}).isRequired,
  onChange: PropTypes.func.isRequired
};

export default withStyles(styles)(DatePicker)
