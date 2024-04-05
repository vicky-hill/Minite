'use client'

import { useRouter} from 'next/navigation'
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

    console.log(events)

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

    const resetEvents = () => {
        setEvents(null);
    }

    /**
     * Create Feature
     * @param {string} name
     * @param {objectId} [main_feature]
     */
    const createFeature = async (name, main_feature) => {
        try {
            // Create sub feature
            if (main_feature) {
                const subfeature = await api.post(`/features/${main_feature}/sub`, { name });

                setFeatures(features =>
                    features.map(feature => (
                        feature._id === main_feature
                            ? { ...feature, sub_features: feature.sub_features ? [...feature.sub_features, subfeature] : [subfeature] }
                            : feature
                    ))
                );

                // Create main feature
            } else {
                const feature = await api.post(`/features`, { name, project: project._id });
                setFeatures(features => [...features, feature]);

                // Handle adding first feature of project
                if (!features.length) {
                    setProjects(projects =>
                        projects.map(p => p._id === project._id ? { ...p, first_feature: feature._id } : p) 
                    )
                    router.push(`/${project.slug}/${feature._id}?mode=edit`);

                }
            }


        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Update Feature
     * @param {objectID} featureID
     * @param {property} payload.name
     */
    const updateFeature = async (featureID, payload) => {
        try {
            const updatedFeature = await api.put(`/features/${featureID}`, payload);

            if (updatedFeature.main_feature) {
                setFeatures(features =>
                    features.map(feature => (
                        feature._id === updatedFeature.main_feature._id
                            ? { ...feature, sub_features: feature.sub_features.map(feature => feature._id === featureID ? updatedFeature : feature) }
                            : feature
                    ))
                );

            } else {
                setFeatures(features =>
                    features.map(feature =>
                        feature._id.toString() === updatedFeature._id.toString() ? updatedFeature : feature
                    )
                )
            }

            setFeature(updatedFeature);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Sort Features
     * @param {array<Feature>} items 
     */
    const sortFeatures = async (items) => {
        try {
            setFeatures(items);
            const payload = items.map((feature, i) => ({ _id: feature._id, sort: i + 1 }));
            await api.put(`/features/sort`, payload);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Sort Sub Features
     * @param {array<Feature>} items 
     */
    const sortSubFeatures = async (items) => {
        try {
            setFeatures(features =>
                features.map(feature => (
                    feature._id === items[0].main_feature
                        ? { ...feature, sub_features: items }
                        : feature
                ))
            );

            const payload = items.map((feature, i) => ({ _id: feature._id, sort: i + 1 }));

            await api.put(`/features/sort`, payload);
        } catch (err) {
            console.log(err);
        }
    }

    /**
     * Delete Feature
     * @param {objectId} featureID
     */
    const deleteFeature = async (featureID) => {
        try {
            const deletedFeature = await api.delete(`/features/${featureID}`);

            // Handle sub features
            if (deletedFeature.main_feature) {
                const updatedMainFeature = features.find(feature => feature._id === deletedFeature.main_feature);
                updatedMainFeature.sub_features = updatedMainFeature.sub_features.filter(feature => feature._id !== featureID);
                setFeatures(features => features.map(feature => feature._id === featureID ? updatedMainFeature : feature));

                const subFeatureCount = updatedMainFeature.sub_features.length;

                if (subFeatureCount) {
                    const lastSubFeature = updatedMainFeature.sub_features[subFeatureCount - 1];
                    router.push(`/${project.slug}/${updatedMainFeature._id}/${lastSubFeature._id}?mode=edit`);

                } else {
                    router.push(`/${project.slug}/${updatedMainFeature._id}?mode=edit`);
                }

                // Handle main features
            } else {
                console.log('deleted feature id', deletedFeature._id)
                console.log('features', features)
                const deletedFeatureIndex = features.findIndex(feature => feature._id === deletedFeature._id);

                console.log(deletedFeatureIndex)

                setFeatures(features =>
                    features.filter(feature => feature._id !== featureID)
                );

                if (deletedFeatureIndex === 0) {
                    router.push(`/${project.slug}/${features[0]._id}?mode=edit`)
                } else {
                    router.push(`/${project.slug}/${features[deletedFeatureIndex - 1]._id}?mode=edit`)
                }
            }
        } catch (err) {
            console.log(err);
        }
    }


    const value = {
        events
    }

    return (
        <EventContext.Provider value={value}>
            {children}
        </EventContext.Provider>

    )
}

export default EventContext;