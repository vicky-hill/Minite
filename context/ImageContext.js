'use client'

import { createContext, useState, useEffect, useContext } from "react"
import api from "@/utils/api"
import UserContext from './UserContext'
import EventContext from './EventContext'

const ImageContext = createContext()

export const ImageContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [images, setImages] = useState(null);

    const [selectedVersion, setSelectedVersion] = useState('main');
    const [nextImageID, setNextImageID] = useState(null);

    const { currentUser } = useContext(UserContext);
    const { event, setEvent, setEvents } = useContext(EventContext);

    useEffect(() => {
        if (currentUser) {
            setNextImageID(currentUser.nextImageID)
        }
    }, [currentUser])

    useEffect(() => {
        event && setImages(event.images);
    }, [event])

    const getNextImageID = (imageID) => {
        if (!imageID) return;

        let imagePrefix = imageID.slice(0, 3);
        let imageDigits = Number(imageID.slice(3)) + 1;

        const newImageID = imagePrefix + imageDigits.toString().padStart(4, 0);

        return newImageID;
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
        } catch (err) {
            setError('Failed to load features');
        }
    }

    const value = {
        images,
        selectedVersion,
        createImage,
        nextImageID,
        setSelectedVersion
    }

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>

    )
}

export default ImageContext;