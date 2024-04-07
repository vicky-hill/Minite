'use client'

import { createContext, useState, useEffect, useContext } from "react"
import api from "@/utils/api"
import UserContext from './UserContext'

const EventContext = createContext()

export const EventContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [events, setEvents] = useState(null);
    const [event, setEvent] = useState(null);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser) {
            getEvents();
        }
    }, [currentUser])

    /**
    * Get Events
    */
    const getEvents = async () => {
        try {
            setEvents(null);
            setLoading(true);

            const { data: events } = await api.get(`/events`);

            setEvent(events[0]);
            setEvents(events);
            setLoading(false);
        } catch (err) {
            setError('Failed to load features');
        }
    }

    /**
    * Create Event
    * @param {string} name
    * @return {Event}
    */
    const createEvent = async (name) => {
        try {
            setLoading(true);

            const event = await api.post(`/events`, { name });

            setEvents(events => [...events, event]);
            setEvent(event);
            setLoading(false);

            return event;
        } catch (err) {
            setError('Failed to load features');
        }
    }

    /**
     * Select Event
     * @param {objectId} eventID
    */
    const selectEvent = (eventID) => {
        const selectedEvent = events.find(event => event._id === eventID);
        setEvent(selectedEvent);
    }


    const value = {
        event,
        selectEvent,
        events,
        setEvents,
        setEvent,
        createEvent,
        getEvents
    }

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>

    )
}

export default EventContext;