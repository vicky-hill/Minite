import React from 'react'


const Radio = ({ children, onChange, name, selectedValue, value, setValue, values, stacked, checked, disabled, className='', identifier, ...rest }) => {

    value = value ? value : children;
    checked = checked ? checked : (typeof(values) === 'object' && values !== null) ? values[name] === value : values ? values === value : selectedValue ? selectedValue === value : false;
    onChange = onChange ? onChange : setValue ? (e) => setValue(e.target.checked) : () => console.warn('No on change handler specified on checkbox');


    /* ===================================
       Radio Component
    =================================== */
    let radio = (
        <label htmlFor={value} className="form__group-radio">
            <input className={"form__group-radio-input " + className} disabled={disabled} checked={checked} value={value} onChange={onChange} type="radio" name={name} id={value} {...rest} />
            <div className="form__group-radio-circle"></div>
            <div className="form__group-radio-label">{children} </div>
        </label>
    )

    // Wrap all radios in a div for stacked layout
    if (stacked) radio = <div>{radio}</div>

    return radio;
}

const Group = ({ children, name, label, noLabel, onChange, error, value, setValue, values, setValues, stacked, disabled, className='', groupClassName, identifier, ...rest }) => {
    const propsForChildren = { name, onChange, values, stacked, selectedValue: value };
    if (disabled) propsForChildren.disabled = true;

    if ((!onChange && setValues) || (!onChange && setValue)) {
        if (setValue) {

            // Handle value if setValue is passed instead of setValues
            propsForChildren.onChange = (e) => setValue(e.target.value);
        
        } else if (typeof(values) === 'object' && values !== null) {

            // Handle setting values if values is an object
            propsForChildren.onChange = (e) => setValues({ ...values, [e.target.name]: e.target.value })
        
        } else {

            // Handle setting values for strings and null values
            propsForChildren.onChange = (e) => setValues(e.target.value)
        }
    }

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                ...child.props,
                ...propsForChildren
            });
        });
    };

    return (
        <div className={`form__group ${error ? 'invalid' : ''} ${groupClassName}` + className} {...rest}>
            {!noLabel && <label className='form__group-label' htmlFor={name}>{label}</label>}
            <div className='form__group-radios'>
                {renderChildren()}
            </div>
            <div className="form__group-feedback">{error}</div>
        </div>
    )
}

Radio.Group = Group

export default Radio;




