import { useState, useEffect } from 'react'
import api from '@/utils/api'

export default function useFetch(url, dependencies = []) {
    const [items, setItems] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchItems();
    }, [...dependencies])

    const fetchItems = async () => {
        try {
            setLoading(true);
            const res = await api.get(url);

            res.data ? setItems(res.data) : setItems(res);
            setLoading(false);

        } catch (err) {
            setLoading(false);
            setError(err);
        }
    }

    return [items, loading, error]
}