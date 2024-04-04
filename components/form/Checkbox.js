import React from 'react'

const Checkbox = ({ children, name, onChange, value, setValue, values, stacked, disabled, checked, className = "", identifier, ...rest }) => {
    
    value = value ? value : children;
    checked = getCheckedValue();
    onChange = getOnChangeValue();

    function getCheckedValue () {
        // If values is an array, check for value in array
        if (Array.isArray(values)) return values.includes(value)
        
        // If values exists, but is not an array, it's coming from the form component
        if (values && !Array.isArray(values)) {
            if (!values[name]) return console.warn(`Checkbox in Form :: The checkbox name "${name}" does not exist in the values object`);
            return values[name].includes(value);
        }

        return checked;
    }    
    
    function getOnChangeValue () {
        return onChange ? onChange : setValue ? (e) => setValue(e.target.checked) : () => console.warn('No on change handler specified on checkbox');
    }
    

    /* ===================================
       Checkbox component
    =================================== */
    let checkbox = (
        <label htmlFor={value} className={"form__group-checkbox " + className}>
            <input className="form__group-checkbox-input" type="checkbox" checked={checked} value={value} name={name} id={value} disabled={disabled} onChange={onChange} {...rest} />
            <div className="form__group-checkbox-box"></div>
            <div className="form__group-checkbox-label">{children}</div>
        </label>
    )

    // Wrap all radios in a div for stacked layout
    if (stacked) checkbox = <div>{checkbox}</div>

    return checkbox;
}


const Group = ({ children, name, label, noLabel, onChange, error, values, setValues, stacked, disabled, className='', groupClassName="", identifier, ...rest }) => {
    const propsForChildren = { name, onChange, values, stacked };
    if (disabled) propsForChildren.disabled = true;

    if (!onChange && !Array.isArray(values) && setValues ) propsForChildren.onChange = handleValueObjectChange; // values is { name: []}
    if (!onChange && Array.isArray(values) && setValues) propsForChildren.onChange = handleValueArrayChange; // values is []
   

    function handleValueObjectChange(e) {
        setValues({ ...values, [e.target.name]: checkboxValue });
    }

    function handleValueArrayChange (e) {
        const checkboxValue = e.target.value;
        let updatedValues = [...values];

        if (values.includes(checkboxValue)) {
            updatedValues = updatedValues.filter(value => value !== checkboxValue);
            setValues(updatedValues);
        } else {
            updatedValues = [...updatedValues, checkboxValue];
            setValues(updatedValues);
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
            <div className='form__group-checkboxes'>
                {renderChildren()}
            </div>
            <div className="form__group-feedback">{error}</div>
        </div>
    )
}

Checkbox.Group = Group;

export default Checkbox;
