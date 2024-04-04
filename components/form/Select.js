import React from 'react'

const Select = ({ children, onChange, error, label, noLabel, name, value, setValue, disabled, placeholder, className='', groupClassName='', identifier, ...rest }) => {

    value = value ? value : "";
    placeholder = placeholder ? placeholder : name ? `Select a ${name.toLowerCase()}` : 'Make a selection';
    onChange = onChange ? onChange : setValue ? (e) => setValue(e.target.value) : console.warn("Select: no onChange handler was specified")

    return (
        <div className={`form__group ${error ? 'invalid' : ''} ${groupClassName}`} {...rest}>
            {!noLabel && label && <label className='form__group-label' htmlFor={name}>{label}</label>}

            <select className={`${className} + form__group-input form__group-select`} value={value} onChange={onChange} name={name} id={name} disabled={disabled} {...rest}>
                <option value="" defaultValue disabled>{placeholder}</option>
                {children}
            </select>

            <div className="form__group-feedback">{error}</div>
        </div>
    )
}

export const Option = ({ children, value, disabled }) => {
    return (
        <option disabled={disabled} value={value ? value : children}>{children}</option>
    )
}

export default Select;
