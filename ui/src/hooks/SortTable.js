import { useState, useEffect, useMemo } from 'react';

export default function  useSortTable (songs, config = null) {
    const [sortConfig, setSortConfig] = useState(config);

    const sortedSongs = useMemo(() => {

        let sortableList = [songs];
        
        console.log("sortConfig")
        console.log(sortConfig)
        // debugger;
        if (sortConfig !== null) {
            sortableList.sort((a, b) => {
                let x = a[sortConfig.key]
                let y = b[sortConfig.key]
                if (!sortConfig.key.includes('metric') && sortConfig.key !== 'playCount') {
                    x = x.toUpperCase();
                    y = y.toUpperCase();
                }

                if (sortConfig.key === 'songReleaseDate') {
                    x = new Date(a[sortConfig.key]); 
                    y = new Date(b[sortConfig.key]); 
                }

                if (x < y) {
                    return sortConfig.direction === 'asc' ? 1 : -1;
                }

                if (x > y) {
                    return sortConfig.direction === 'asc' ? -1 : 1;
                }
                return 0;
            });
        }
        return sortableList

    }, [songs, sortConfig]);

    const requestSort = key => {
        let direction = 'asc';
        
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    }
    console.log("returning from hook")
    console.log({ songs: sortedSongs[0] })
    return { items: sortedSongs[0], requestSort };
}
