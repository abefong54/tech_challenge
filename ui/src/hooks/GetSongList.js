import { useState, useEffect } from 'react';

export default function useSongFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            const response = await fetch(url, { 
                method: 'get', 
                origin: 'localhost' // have to set this to get around cors issue  w/ lambda
            });
            const data = await response.json();
            setData(data);
        };
        
        fetchData();
    }, [url]);
    
    return { data };
};