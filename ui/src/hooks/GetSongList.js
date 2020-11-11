import { useState, useEffect } from 'react';

export default function useSongFetch(url) {
    const [data, setData] = useState([]);

    useEffect(() => {
        if (!url) return;
        const fetchData = async () => {
            const response = await fetch(url, { 
                method: 'get', 
                origin: 'localhost' // have to set this to get around cors issue 
            });
            const data = await response.json();

            console.log("YOUR DATA")
            console.log(data)
            setData(data);
        };
        
        fetchData();
    }, [url]);
    
    
    console.log("YOUR DATA")
    console.log(data)

    return { data };
};