import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const TextFieldGroup = ({ name,value, label, error, type, onChange,checkLocationExists,checkIfExists}) => {
    return (
        <div className="form-group row">
            <label className="col-sm-3 col-form-label" >{label}</label>
            <div className="col-sm-9">
                <input type={type} name={name}
                       className={classnames("form-control form-control-sm", {"is-invalid": error})}
                       value={value}
                       onChange={onChange}
                       onKeyUp={checkLocationExists}
                       onBlur={checkIfExists}
                />
                {error && <div className="invalid-feedback">{error}</div>}
            </div>
        </div>
    )
}
TextFieldGroup.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    error: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    checkIfExits: PropTypes.func,
    checkLocationExists: PropTypes.func

}
TextFieldGroup.defaultTypes = {
    type: 'text'
}
export default TextFieldGroup