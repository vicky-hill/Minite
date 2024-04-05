import EventContext from '@/context/EventContext'
import { useContext } from 'react'
import CreatableSelect from 'react-select/creatable'

const EventSelect = ({ options, onEventChange }) => {

  const { events } = useContext(EventContext);

  const onCreate = (e) => {
    const event = { name: e, year: 2023 }
    options.push({ value: event.name, label: `${event.name} ${event.year}` })
  }

  const getOptions = () => {
    return events.map(event => ({
      value: event._id,
      label: `${event.name} ${event.year}`
    }))
  }

  const onChange = (e) => {
    onEventChange(e.value);
  }

  if (!events) return;
  
  return (
    <CreatableSelect
      isClearable 
      options={getOptions()}
      classNamePrefix='event-select'
      onCreateOption={onCreate}
      defaultValue={getOptions()[0]}
      onChange={onChange}
    />
  )
}

export default EventSelect;
