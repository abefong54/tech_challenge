import React from 'react';
import useSongFetch from '../hooks/GetSongs';
import BasicSongTable from '../components/BasicSongTable';
import SortableSongTable from '../components/SortableSongTable';


export default function DataTable() {

  // CREATE HOOK TO READ JSON FROM S3 BUCKET
  const url = `https://kyz1bfowj9.execute-api.us-east-1.amazonaws.com/Prod/hello/`;
  const { data } = useSongFetch(url);

  return (
    <div>
    {(data.length > 0)
        ?  
        <BasicSongTable songs={data}/>
        : 
        <div style={{align:'center', paddingLeft:'45%', paddingTop:'20%'}}>
          <h3>Loading Data</h3>
        </div>
      }
    </div>
  );
}