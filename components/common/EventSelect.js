import CreatableSelect from 'react-select/creatable'

const EventSelect = ({ options, onEventChange }) => {
 
    const onCreate = (e) => {
      const event = { name: e, year: 2023 }
      options.push({ value: event.name, label: `${event.name} ${event.year}` })
    }
  
    const onChange = (e) => {
      onEventChange(e.value);
    }

    return (
        <CreatableSelect
        isClearable options={options}
        classNamePrefix='event-select'
        onCreateOption={onCreate}
        defaultValue={options[1]}
        onChange={onChange}
      />
    )
}

export default EventSelect;
