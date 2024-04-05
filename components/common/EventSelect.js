import { useState, useEffect } from 'react'
import EventContext from '@/context/EventContext'
import { useContext } from 'react'
import CreatableSelect from 'react-select/creatable'

const EventSelect = ({ onEventChange }) => {
  const [eventsLoaded, setEventsLoaded] = useState(false);
  const [defaultValue, setDefaultValue] = useState(null);
  const { events, createEvent } = useContext(EventContext);

  useEffect(() => {
    if (events && !eventsLoaded) {
      const event = events[0];
      const option = { value: event._id, label: event.name }
      setDefaultValue(option);
      setEventsLoaded(true);
    }
  }, [events, eventsLoaded])

  const onCreate = async (name) => {
    try {
      setDefaultValue(null);
      const event = await createEvent(name);

      setDefaultValue({ value: event.value, label: event.name })
    } catch (err) {
      console.log(err);
    }


    // options.push({ value: event.name, label: `${event.name} ${event.year}` })

  }

  const getOptions = () => {
    return events.map(event => ({
      value: event._id,
      label: `${event.name} ${event.year}`
    }))
  }

  const onChange = (event) => {

    // onEventChange(e.value);
    setDefaultValue(event)

  }

  if (!events) return;

  return (
    <CreatableSelect
      isClearable
      options={getOptions()}
      classNamePrefix='event-select'
      onCreateOption={onCreate}
      value={defaultValue || ''}
      onChange={onChange}
    />
  )
}

export default EventSelect;
