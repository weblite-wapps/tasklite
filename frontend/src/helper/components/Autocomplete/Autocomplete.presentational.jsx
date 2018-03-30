import React from 'react'
import PropTypes from 'prop-types'
import Autocomplete from 'react-autocomplete'
// scssClasses
import scssClasses from './Autocomplete.scss'


const CustomizedAutocomplete = ({
  isError, label, suggestions, mode, inputValue, onInputValueChange, onSelect, onAdd,
}) => (
  <Autocomplete
    getItemValue={item => mode === 'user' ? item.name : item.label}
    items={suggestions}
    renderItem={(item, isHighlighted) => (
      <div style={{ background: isHighlighted ? 'lightgray' : 'white' }} key={item._id}>
        {mode === 'user' ? item.name : item.label}
      </div>
    )}
    renderInput={
      kind => (
        <div className={scssClasses.group}>
          <input
            {...kind}
            type="text"
            required
            className={isError ? scssClasses.error : null}
            onKeyPress={(ev) => {
              if (ev.key === 'Enter') {
                onAdd()
                ev.preventDefault()
              }
            }}
          />
          <span className={scssClasses.highlight} />
          <span className={scssClasses.bar} />
          <span className={scssClasses.label}>{label}</span>
        </div>
      )
    }
    wrapperStyle={{ zIndex: '1', width: '100%' }}
    value={inputValue}
    onChange={onInputValueChange}
    onSelect={onSelect}
  />
)

CustomizedAutocomplete.propTypes = {
  isError: PropTypes.bool,
  label: PropTypes.string.isRequired,
  mode: PropTypes.string,
  inputValue: PropTypes.string.isRequired,
  suggestions: PropTypes.arrayOf(PropTypes.object).isRequired,
  onInputValueChange: PropTypes.func.isRequired,
  onSelect: PropTypes.func.isRequired,
  onAdd: PropTypes.func.isRequired,
}

CustomizedAutocomplete.defaultProps = {
  isError: false,
  mode: 'tag',
}

export default CustomizedAutocomplete
