'use client'

import { useState } from 'react'

export default function useLoading({ }) {
    const [loading, setLoading] = useState(false);

    const start = setLoading(true);
    const end = setLoading(false);

    const loadingFunction = async (fn) => {
        try {
            setLoading(true);
            await fn();
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    }

    return [loading, loadingFunction];
}