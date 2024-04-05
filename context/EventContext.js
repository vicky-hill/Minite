'use client'

import { useRouter } from 'next/navigation'
import { createContext, useState, useEffect, useContext } from "react"
import api from "@/utils/api"
import UserContext from './UserContext'

const EventContext = createContext()

export const EventContextProvider = ({ children }) => {
    const router = useRouter();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [events, setEvents] = useState(null);
    const [event, setEvent] = useState('');

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        currentUser && getEvents();
    }, [currentUser])

    /**
    * Get Events
    */
    const getEvents = async () => {
        try {
            setEvents(null);
            setLoading(true);

            const { data: events } = await api.get(`/events`);

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
            setLoading(false);

            return event;
        } catch (err) {
            setError('Failed to load features');
        }
    }







    const value = {
        events,
        createEvent
    }

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>

    )
}

export default EventContext;