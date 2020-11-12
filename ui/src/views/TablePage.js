import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import useSongFetch from '../hooks/GetSongList';
import SongTable from '../components/SongTable';
import SortableSongTable from '../components/SortableSongTable';


function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    minHeight: 440,
  },
});

export default function DataTable() {
  const classes = useStyles();

  // CREATE HOOK TO READ JSON FROM S3 BUCKET
  const url = `https://kyz1bfowj9.execute-api.us-east-1.amazonaws.com/Prod/hello/`;
  const { data } = useSongFetch(url);

  return (
    <div className={classes.container}>
    {(data.length > 0)
      ?  
        <SortableSongTable songs={data}/>
        : 
        "Loading Data"
      }
    </div>
  );
}