import React from 'react';
import styled from 'styled-components';
import useSortTable from '../hooks/SortTable';

// STYLE COMPONENTS
const TableContainer = styled.section`
    width: '100%',
    display: grid;
`;
const Table = styled.table`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "black" : "white"};
  color: ${props => props.primary ? "white" : "black"};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  position:auto;
  border-radius: 3px;
  border-collapse: collapse; 
`;

const TableBody = styled.tbody`
    align: center;
`;

const TableTitleRow = styled.tr`
  align: center;
`;

const TableTitleRowCell = styled.th`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "black" : "white"};
  color: ${props => props.primary ? "white" : "black"};
  text-decoration:none;
  font-size: 1.5em;
  align: center;
  margin: 1em;
  font-weight: bold; 
  padding: 0.25em 1em;
  border: 6px solid black;
  border-radius: 4px;
`;

const TableDataRow = styled.tr`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "black" : "white"};
  color: ${props => props.primary ? "white" : "black"};
  text-decoration:none;
  font-size: 1em;
  margin: 1em;
  align: center;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
  overflow:scroll;

`;

const TableDataRowCell = styled.td`
  /* Adapt the colors based on primary prop */
  background: ${props => props.primary ? "black" : "white"};
  color: ${props => props.primary ? "white" : "black"};
  text-decoration:none;
  font-size: 1em;
  margin: 1em;
  align: center;
  padding: 0.25em 1em;
  border-right: 2px solid black;
  border-bottom: 2px solid black;
  border-radius: 3px;
`;

const Button = styled.button`
    /* Adapt the colors based on primary prop */
    background: ${props => props.primary ? "white" : "red"};
    color: ${props => props.primary ? "red" : "white"};
    box-shadow: none;
    margin: 1em;
    display: inline;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
`;

export default function BasicSongTable(props) {

    const songs = props.songs;
    const columnNames = Object.keys(songs[0])

    const { items, requestSort } = useSortTable(songs);

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableBody>
                        <TableTitleRow>
                        {columnNames.map((name,idx) => (
                            <TableTitleRowCell key={idx}>
                                <Button onClick={()=> requestSort(name)}>
                                    {name} ▼
                                </Button>
                            </TableTitleRowCell>
                        ))}
                        </TableTitleRow>
                    </TableBody>
                    <TableBody>
                        {songs.map((row,idx) => (
                            <TableDataRow key={'data-row-'+idx}>
                            {columnNames.map(name => (
                                <TableDataRowCell key={'data-row-'+name+'-'+idx}>
                                    {row[name]}
                                </TableDataRowCell>
                            ))}
                            </TableDataRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}