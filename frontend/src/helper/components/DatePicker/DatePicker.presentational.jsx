import React from 'react'
import PropTypes from 'prop-types'
import jMoment from 'moment-jalaali'
import JalaliUtils from '@date-io/jalaali'
import {
  DatePicker as MuiDatePicker,
  MuiPickersUtilsProvider,
} from 'material-ui-pickers'
// helpers
import './DatePicker.scss'

jMoment.loadPersian({ dialect: 'persian-modern', usePersianDigits: true })

const DatePicker = ({ value, onChange }) => (
  <div className="c--datePicker_textField">
    <MuiPickersUtilsProvider utils={JalaliUtils} locale="fa">
      <MuiDatePicker
        autoOk
        label="Deadline"
        disablePast
        labelFunc={date => (date ? date.format('jYYYY/jM/jD') : '')}
        value={value}
        onChange={onChange}
        animateYearScrolling={false}
      />
    </MuiPickersUtilsProvider>
  </div>
)

DatePicker.propTypes = {
  value: PropTypes.shape({}),
  onChange: PropTypes.func.isRequired,
}

DatePicker.defaultProps = {
  value: null,
}

export default DatePicker
