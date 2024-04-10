'use client'

import { createContext, useState, useEffect, useContext } from "react"
import api from "@/utils/api"
import EventContext from './EventContext'

const ImageContext = createContext()

export const ImageContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [images, setImages] = useState(null);

    const [selectedVersion, setSelectedVersion] = useState('original');
    const [nextImageID, setNextImageID] = useState(null);

    console.log('next image id', nextImageID)

    const { event, events, setEvent, setEvents } = useContext(EventContext);

    useEffect(() => {
        event && getNextImageID(event)
    }, [event])

    // useEffect(() => {
    //     event && setImages(event.images);
    // }, [event])

    const getNextImageID = async (event) => {
        try {
            const nextImageID = await api.get(`/images/imageID/${event.year}`);
            setNextImageID(nextImageID);
        } catch (err) {
          console.log(err);
        }
    }

    const getImagesWithVersions = async (imageID) => {
        try {
            const images = await api.get(`/images/${imageID}`);
            setImages(images)
        } catch (err) {
          console.log(err);
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
    * @param {boolean} addVersion - true if the created image is a version of an exisiting image
    */
    const createImage = async (payload, addVersion) => {
        try {
            setLoading(true);

            const images = await api.post(`/images`, [payload]);

            const updatedEvent = events.find(event => event._id === payload.event)
            updatedEvent.images = [...updatedEvent.images, ...images];

            setEvents(events => events.map(event => event._id === event ? updatedEvent : event));
            setEvent(event => event._id === event ? updatedEvent : event);
            !addVersion && await getNextImageID(event);
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
        setSelectedVersion,
        getImagesWithVersions
    }

    return (
        <ImageContext.Provider value={value}>
            {children}
        </ImageContext.Provider>

    )
}

export default ImageContext;