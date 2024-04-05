'use client'

import useQuery from '@/hooks/useQuery'
import { createContext, useState, useEffect } from 'react'
import { auth } from '@/utils/firebase'
import api from '@/utils/api'

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [isAdmin, setIsAdmin] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [testMode, setTestMode] = useState(false);

    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const mode = useQuery().get('mode');

    useEffect(() => {
        checkUserSession();
    }, []);

    useEffect(() => {
        mode === 'edit' && isAdmin ? setEditMode(true) : setEditMode(false)
        mode === 'test' ? setTestMode(true) : setTestMode(false)
    }, [mode, isAdmin]);

    /** Check user session and get current user */
    const checkUserSession = async () => {
        try {
            const user = await api.get('/user');

            const unsubscribe = auth.onAuthStateChanged((user) => {
                unsubscribe();
            });

            user && setCurrentUser(user);
            user && user.role === 'admin' && setIsAdmin(true);

            setLoading(false);
        } catch (err) {
            setLoading(false);
            console.log(err);
        }
    }

    /** @param payload: { firebaseID, email } */
    const register = async (payload) => {
        try {
            const user = await api.post('/user', payload);
            setCurrentUser(user);
        } catch (err) {
            console.log(err);
        }
    }

    /** Logout */
    const logout = () => {
        auth.signOut();
        setCurrentUser(null);
        localStorage.removeItem('token');
    }

    /** @param {objectId} teamID */
    /** @param {string} name */
    const updateTeam = async (teamID, name) => {
        try {
            await api.put(`/teams/${teamID}`, { name });

            setCurrentUser(currentUser => ({
                ...currentUser,
                team: teamID
            }));
        } catch (err) {
            console.log(err);
        }
    }

    const value = {
        logout,
        loading,
        register,
        currentUser,
        checkUserSession,
        isAdmin,
        editMode,
        testMode,
        updateTeam
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;