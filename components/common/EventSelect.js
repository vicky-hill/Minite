import { useState, useEffect } from 'react'
import EventContext from '@/context/EventContext'
import { useContext } from 'react'
import CreatableSelect from 'react-select/creatable'

const EventSelect = ({ }) => {
  const [value, setValue] = useState(null);
  const { events, event, selectEvent, createEvent } = useContext(EventContext);

  useEffect(() => {
    if (event) {
      const option = { value: event._id, label: event.name }
      setValue(option);
    }
  }, [event])

  const onCreate = async (name) => {
    try {
      setValue(null);
      await createEvent(name);
    } catch (err) {
      console.log(err);
    }
  }

  const getOptions = () => {
    return events.map(event => ({
      value: event._id,
      label: `${event.name} ${event.year}`
    }))
  }

  const onChange = (e) => {
    selectEvent(e.value);
  }

  if (!events) return;

  return (
    <CreatableSelect
      isClearable
      options={getOptions()}
      classNamePrefix='event-select'
      onCreateOption={onCreate}
      value={value || ''}
      onChange={onChange}
    />
  )
}

export default EventSelect;
