import React, { useState, useContext, createContext } from 'react';
import InputComponent from './Input'
import RadioComponent from './Radio';
import CheckboxComponent from './Checkbox';
import SelectComponent, { Option as OptionComponent } from './Select'


const FormContext = createContext();

const Form = ({ children, values, setValues, validation, onSubmit, onChange, errors, setErrors, noLabel, className='', groupClassName='mb-10', ...rest }) => {
    const [innerErrors, setInnerErrors] = useState({});

    // Ability to use a default onChange function within the form component
    // Or use a custom onChange function outside the form compnonent, must handle setting values
    const handleChangeFromInside = (e) => {
        let updatedValues = { ...values };
        
        // If checkbox handle array field on change
        if (e.target.type === 'checkbox') {
            const checkboxValue = e.target.value;
            const checkboxName = e.target.name;

            if (!Array.isArray(values[checkboxName])) return console.warn(`Checkbox in Form: The values field for the checkbox: ${checkboxName} is not array, please check values and the onChange handler`)

            if (values[checkboxName].includes(checkboxValue)) {
                updatedValues[checkboxName] = updatedValues[checkboxName].filter(value => value !== checkboxValue);
                setValues(updatedValues);
            } else {
                updatedValues[checkboxName] = [...updatedValues[checkboxName], checkboxValue];
                setValues(updatedValues);
            }

            // Handle regular value fields on change
        } else {
            
            // Handle nested values 
            if (e.target.name.includes('.')) {        
                updatedValues = getUpdateNestedValues(updatedValues, e);
            
            } else {
                updatedValues[e.target.name] = e.target.value;
            }
             
            setValues(updatedValues);
        }
    }

    const handleChangeFromOutside = (e) => onChange(e);

    let handleChange;

    if (onChange) {
        handleChange = handleChangeFromOutside;
    } else {
        handleChange = handleChangeFromInside;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            if (validation) await validation.validate(values, { abortEarly: false });

            onSubmit();

        } catch (err) {
            const createdErrors = {};
            err.inner.forEach(error => createdErrors[error.path] = error.message);
            setErrors ? setErrors(createdErrors) : setInnerErrors(createdErrors);
        }
    }

    errors = errors ? errors : innerErrors;
    setErrors = setErrors ? setErrors : setInnerErrors;

    // As a rule, handleChange, handleSubmit, etc are always functions generated within the Form component
    // OnChange, OnSubmit, etc are optional functions passed to the Form component, and will be used instead if they are provided

    return (
        <FormContext.Provider value={{ values, setValues, validation, noLabel, errors, setErrors, handleChange, groupClassName }}>
            <form onSubmit={handleSubmit} className={className} {...rest}>
                {children}
            </form>
        </FormContext.Provider>
    )
}

export default Form;


/* ===================================
   Helper Functions
=================================== */
const getLabel = (name, label) => {
    if (label) return label;

    // Get label from name
    const words = name.match(/[A-Za-z][a-z]*/g) || [];
    return words.map(word => word.charAt(0).toUpperCase() + word.substring(1)).join(" ");
}

const getPlaceholder = (name, placeholder) => {
    if (placeholder) return placeholder;

    // Placeholder from name
    const words = name.match(/[A-Za-z][a-z]*/g) || [];
    const placeholderFromName = words.map(word => word.charAt(0).toLowerCase() + word.substring(1)).join(" ");

    return 'Enter ' + placeholderFromName;
}

const getError = (name, error, errors) => {
    if (error) return error;

    return errors?.[name]
}

const resetErrors = (errors, setErrors, name) => {
    if (errors[name]) {
        const updatedErrors = { ...errors };
        delete updatedErrors[name];
        setErrors(updatedErrors);
    }
}

const getUpdateNestedValues = (updatedValues, e) => {
    let name = e.target.name.split('.');

    const n = [];

    name.forEach(name => {
        if (name.includes("[")) {
            name = name.split('[');
            name[1] = name[1].split(']')

            n.push(name[0]);
            n.push(parseInt(name[1][0]));
        } else {
            n.push(name);
        }
    });

    if (n.length === 2) updatedValues[n[0]][n[1]] = e.target.value;
    if (n.length === 3) updatedValues[n[0]][n[1]][n[2]] = e.target.value;
    if (n.length === 4) updatedValues[n[0]][n[1]][n[2]][n[3]] = e.target.value;
    if (n.length === 5) updatedValues[n[0]][n[1]][n[2]][n[3]][n[4]] = e.target.value;
    if (n.length === 6) updatedValues[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]] = e.target.value;
    if (n.length === 7) updatedValues[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]] = e.target.value;
    if (n.length === 8) updatedValues[n[0]][n[1]][n[2]][n[3]][n[4]][n[5]][n[6]][n[8]] = e.target.value;
    
    return updatedValues;
}

const getNestedValue = (nestedName, values) => {
    let name = nestedName.split('.');

    const n = [];

    name.forEach(name => {
        if (name.includes("[")) {
            name = name.split('[');
            name[1] = name[1].split(']')

            n.push(name[0]);
            n.push(parseInt(name[1][0]));
        } else {
            n.push(name);
        }
    });

    let value;

    if (n.length === 2) value = values[n[0]]?.[n[1]] || "";
    if (n.length === 3) value = values[n[0]]?.[n[1]]?.[n[2]] || "";
    if (n.length === 4) value = values[n[0]]?.[n[1]]?.[n[2]]?.[n[3]] || "";
    if (n.length === 5) value = values[n[0]]?.[n[1]]?.[n[2]]?.[n[3]]?.[n[4]] || "";
    if (n.length === 6) value = values[n[0]]?.[n[1]]?.[n[2]]?.[n[3]]?.[n[4]]?.[n[5]] || "";
    if (n.length === 7) value = values[n[0]]?.[n[1]]?.[n[2]]?.[n[3]]?.[n[4]]?.[n[5]]?.[n[6]] || "";
    if (n.length === 8) value = values[n[0]]?.[n[1]]?.[n[2]]?.[n[3]]?.[n[4]]?.[n[5]]?.[n[6]]?.[n[8]] || "";

    return value;
}


/* ===================================
   Text Input
=================================== */
export const TextInput = ({ name, value, label, placeholder, onChange, error, className, ...rest }) => {
    const { values, handleChange, errors, setErrors, noLabel, groupClassName } = useContext(FormContext);

    label = getLabel(name, label);
    placeholder = getPlaceholder(name, placeholder);
    error = getError(name, error, errors);
    value = value || value === '' ? value : name.includes('.') ? getNestedValue(name, values) : values[name]; 

    const getOnChange = (e) => {
        onChange ? onChange(e) : handleChange(e);
        resetErrors(errors, setErrors, name);
    }

    return (
        <InputComponent
            name={name}
            value={value}
            onChange={getOnChange}
            label={label}
            noLabel={noLabel}
            placeholder={placeholder}
            error={error}
            className={className}
            groupClassName={groupClassName}
            {...rest}
        />
    )
}


/* ===================================
   Dollar Input
=================================== */
export const DollarInput = ({ name, label, placeholder, onChange, error, className, ...rest }) => {
    const { values, handleChange, errors, setErrors, noLabel, groupClassName } = useContext(FormContext);

    label = getLabel(name, label);
    placeholder = getPlaceholder(name, placeholder);
    error = getError(name, error, errors);

    const getOnChange = (e) => {
        onChange ? onChange(e) : handleChange(e);
        resetErrors(errors, setErrors, name);
    }

    return (
        <InputComponent
            name={name}
            value={values[name]}
            onChange={getOnChange}
            label={label}
            noLabel={noLabel}
            placeholder={placeholder}
            error={error}
            className={className}
            groupClassName={groupClassName}
            dollar
            {...rest}
        />
    )
}


/* ===================================
   Select
=================================== */
export const Select = ({ children, name, value, label, placeholder, onChange, error, disabled, className, ...rest }) => {
    const { values, handleChange, errors, setErrors, noLabel, groupClassName } = useContext(FormContext);

    label = getLabel(name, label);
    error = getError(name, error, errors);
    value = value || value === '' ? value : name && name.includes('.') ? getNestedValue(name, values) : values[name]; 

    const getOnChange = (e) => {
        onChange ? onChange(e) : handleChange(e);
        resetErrors(errors, setErrors, name);
    }

    return (
        <SelectComponent
            onChange={getOnChange}
            error={error}
            label={label}
            noLabel={noLabel}
            name={name}
            value={value}
            disabled={disabled}
            placeholder={placeholder}
            className={className}
            groupClassName={groupClassName}
            {...rest}
        >
            {children}
        </SelectComponent>
    )
}

export const Option = ({ children, value }) => {
    return (
        <OptionComponent value={value ? value : children}>{children}</OptionComponent>
    )
}


/* ===================================
   Radio Buttons
=================================== */
const RadioGroup = ({ children, name, label, placeholder, stacked, disabled, error, onChange, ...rest }) => {
    const { values, handleChange, errors, setErrors, noLabel, groupClassName } = useContext(FormContext);

    label = getLabel(name, label);
    placeholder = getPlaceholder(name, placeholder);
    error = getError(name, error, errors);

    const getOnChange = (e) => {
        onChange ? onChange(e) : handleChange(e);
        resetErrors(errors, setErrors, name);
    }

    const propsForChildren = { name, stacked, onChange, values }
    if (disabled) propsForChildren.disabled = disabled;

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                ...child.props,
                ...propsForChildren
            });
        });
    };

    return (
        <RadioComponent.Group name={name} label={label} noLabel={noLabel} onChange={getOnChange} error={error} values={values} stacked={stacked} groupClassName={groupClassName} {...rest}>
            {renderChildren()}
        </RadioComponent.Group>
    )
}

export const Radio = ({ children, values, onChange, name, value, stacked, disabled, ...rest }) => {
    return (
        <RadioComponent onChange={onChange} name={name} value={value ? value : children} values={values} stacked={stacked} disabled={disabled} {...rest}>
            {children}
        </RadioComponent>
    )
}

Radio.Group = RadioGroup;


/* ===================================
   Checkboxes
=================================== */
const CheckGroup = ({ children, name, label, placeholder, stacked, disabled, error, onChange, ...rest }) => {
    const { values, handleChange, errors, setErrors, noLabel, groupClassName } = useContext(FormContext);

    label = getLabel(name, label);
    placeholder = getPlaceholder(name, placeholder);
    error = getError(name, error, errors);

    const getOnChange = (e) => {
        onChange ? onChange(e) : handleChange(e);
        resetErrors(errors, setErrors, name);
    }

    const propsForChildren = { name, stacked, onChange, values }
    if (disabled) propsForChildren.disabled = disabled;

    const renderChildren = () => {
        return React.Children.map(children, (child) => {
            return React.cloneElement(child, {
                ...child.props,
                ...propsForChildren
            });
        });
    };

    return (
        <CheckboxComponent.Group name={name} label={label} noLabel={noLabel} onChange={getOnChange} error={error} values={values} stacked={stacked} groupClassName={groupClassName} {...rest}>
            {renderChildren()}
        </CheckboxComponent.Group>
    )
}

export const Checkbox = ({ children, values, onChange, name, value, stacked, disabled, ...rest }) => {
    return (
        <CheckboxComponent onChange={onChange} name={name} value={value ? value : children} values={values} stacked={stacked} disabled={disabled} {...rest}>
            {children}
        </CheckboxComponent>
    )
}

Checkbox.Group = CheckGroup;




/* ===================================
   Documentation & HTML Structure
=================================== */

// This section is for documentation purposes only
// It is for describing the components' structure for quick design changes

const TextInputHTML = (
    <div className='form__group'>
        <label className='form__group-label'>Text Input</label>
        <input className="form__group-input" type="text" name="textInput" />
        <div className="form__group-feedback"></div>
    </div>
)

const SelectHTML = (
    <div className='form__group'>
        <label className='form__group-label'>Text Input</label>
        <select className="form__group-input" name="Select">
            <option value="" defaultValue disabled>Select something</option>
            <option value='option1'>Option 1</option>
            <option value='option2'>Option 2</option>
            <option value='option3'>Option 3</option>
        </select>
        <div className="form__group-feedback"></div>
    </div>
)

const RadioHTML = (
    <label htmlFor="visual" className="form__group-radio">
        <input value="visualstudio" type="radio" name="editor" id="visual" className="form__group-radio-input" />
        <div className="form__group-radio-circle"></div>
        <div className="form__group-radio-label">Visual Studio Code</div>
    </label>
)

const RadioGroupHTML = (
    <div className='form__group'>
        <label htmlFor="iphone" className="form__group-radio">
            <input value="iphone" type="radio" name="phones" id="iphone" className="form__group-radio-input" />
            <div className="form__group-radio-circle"></div>
            <div className="form__group-radio-label">iphone</div>
        </label>
        <label htmlFor="samsung" className="form__group-radio">
            <input value="samsung" type="radio" name="phones" id="samsung" className="form__group-radio-input" />
            <div className="form__group-radio-circle"></div>
            <div className="form__group-radio-label">samsung</div>
        </label>
    </div>
)


// Using simple inputs without the Form component

const SimpleTextInput = (
    <input className="form__group-input" type="text" name="textInput" placeholder='Enter text' />
)

const SimpleSelect = (
    <select className="form__group-input" name="Select">
        <option value="" defaultValue disabled>Select something</option>
        <option value='option1'>Option 1</option>
        <option value='option2'>Option 2</option>
        <option value='option3'>Option 3</option>
    </select>
)
