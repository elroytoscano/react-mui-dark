import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';
import { useState } from 'react';

import data from './data';
import DataTable from './DataTable';

function App() {
  const [value, setValue] = useState('');
  const dataOptions = Object.keys(data[0]);

  return (
    <>
      <Autocomplete
        freeSolo
        autoComplete
        autoHighlight
        options={dataOptions}
        inputValue={value}
        filterSelectedOptions
        onInputChange={(_, newInputValue) => {
          setValue(newInputValue);
        }}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => (
            <Chip variant='filled' label={option} {...getTagProps({ index })} />
          ))
        }
        renderInput={(params) => {
          return (
            <TextField {...params} variant='outlined' label='Search Box' />
          );
        }}
      />
      <DataTable rows={data} />
    </>
  );
}

export default App;
