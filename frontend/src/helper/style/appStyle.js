export default theme => ({
  container: {
    margin: '10px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 300,
  },
  datePickerContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  datePickerTextField: {
    width: '100%',
  },
  textFieldFormLabel: {
    color: '#919191',
  },
  textFieldInkbar: {
    '&:after': {
      backgroundColor: '#919191',
    },
  },
})
