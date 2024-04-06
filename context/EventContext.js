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
    const [images, setImages] = useState(null);

    const [selectedVersion, setSelectedVersion] = useState('main');
    const [nextImageID, setNextImageID] = useState(null);

    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        if (currentUser) {
            getEvents();
            setNextImageID(currentUser.nextImageID)
        }
    }, [currentUser])

    const getNextImageID = (imageID) => {
        if (!imageID) return;

        let imagePrefix = imageID.slice(0, 3);
        let imageDigits = Number(imageID.slice(3)) + 1;

        const newImageID = imagePrefix + imageDigits.toString().padStart(4, 0);

        return newImageID;
    }

    /**
    * Get Events
    */
    const getEvents = async () => {
        try {
            setEvents(null);
            setLoading(true);

            const { data: events } = await api.get(`/events`);

            setEvent(events[0]);
            setImages(events[0]?.images)
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
    * Create Image
    * @property {string} payload.url
    * @property {string} payload.thumbnail
    * @property {string} payload.fileName
    * @property {string} payload.filePath
    * @property {string} payload.name
    * @property {string} payload.imageID
    * @property {string} payload.event
    * @property {string} payload.version
    * @property {string} payload.year
    * @property {number} payload.width
    * @property {number} payload.height
    */
    const createImage = async (payload) => {
        try {
            setLoading(true);

            const images = await api.post(`/images`, [payload]);

            const updatedEvent = events.find(event => event._id === payload.event)
            updatedEvent.images = [...updatedEvent.images, ...images];

            setEvents(events => events.map(event => event._id === event ? updatedEvent : event));
            setEvent(event => event._id === event ? updatedEvent : event);
            setNextImageID(imageID => getNextImageID(imageID))
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
        setImages(selectedEvent.images)
    }


    const value = {
        images,
        event,
        selectEvent,
        events,
        createEvent,
        selectedVersion,
        setSelectedVersion,
        createImage,
        nextImageID
    }

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>

    )
}

export default EventContext;