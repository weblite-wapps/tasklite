// modules
import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import Typography from 'material-ui/Typography'
import Radio from 'material-ui/Radio'
import RadioButtonUncheckedIcon from 'material-ui-icons/RadioButtonUnchecked'
import RadioButtonCheckedIcon from 'material-ui-icons/RadioButtonChecked'
// scssClasses
import scssClasses from './Sort.scss'
import styles from './Sort.style'


const RadioGroup = ({ classes, label, checked, onChange }) => (
  <div className={scssClasses.radioGroupContainer}>
    <Typography variant="caption" style={{ marginBottom: '10px' }}>
      {label}: {checked}
    </Typography>
    <Radio
      checked={checked === 'descending'}
      onChange={e => onChange(e.target.value)}
      value="descending"
      className={classes.size}
      classes={{ checked: classes.checked }}
      icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
      checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
    />
    <Radio
      checked={checked === 'ascending'}
      onChange={e => onChange(e.target.value)}
      value="ascending"
      className={classes.size}
      classes={{ checked: classes.checked }}
      icon={<RadioButtonUncheckedIcon className={classes.sizeIcon} />}
      checkedIcon={<RadioButtonCheckedIcon className={classes.sizeIcon} />}
    />
  </div>
)

RadioGroup.propTypes = {
  classes: PropTypes.shape({}).isRequired,
  label: PropTypes.string.isRequired,
  checked: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default withStyles(styles)(RadioGroup)

// export const nothing = null
