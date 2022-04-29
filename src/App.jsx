import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';
import { Chip } from '@mui/material';
import { useEffect, useState } from 'react';

import data from './data';
import DataTable from './DataTable';

function App() {
  const dataOptions = Object.keys(data[0]);
  const [dataTable, setDataTable] = useState(data);
  const [optionsChange, setOptionsChange] = useState([]);
  const [inputChange, setInputChange] = useState('');

  const checkDataItem = (dataItem, checkValue, optionCheckList) => {
    for (const option in optionCheckList) {
      if (
        dataItem[optionCheckList[option]]
          .toLowerCase()
          .startsWith(checkValue.toLowerCase())
      )
        return dataItem;
    }
  };

  useEffect(() => {
    setDataTable((_) =>
      data.filter((dataItem) => {
        for (const value in optionsChange) {
          const result = checkDataItem(
            dataItem,
            optionsChange[value],
            dataOptions
          );
          if (result) return result;
        }
      })
    );
    if (optionsChange.length > 0) {
      let testVal = 0;
      for (const option in optionsChange) {
        const check = dataOptions.find((dataOption) => {
          if (dataOption === optionsChange[option]) {
            return dataOption;
          }
        });
        if (check) testVal++;
      }
      if (testVal === optionsChange.length) {
        setDataTable(data);
      }
    } else if (optionsChange.length === 0 && inputChange === '')
      setDataTable(data);
  }, [optionsChange]);

  useEffect(() => {
    if (inputChange !== '') {
      if (optionsChange.length > 0) {
        setDataTable((_) =>
          data.filter((dataItem) => {
            const result = checkDataItem(dataItem, inputChange, optionsChange);
            return result;
          })
        );
      } else {
        setDataTable((_) =>
          data.filter((dataItem) => {
            const result = checkDataItem(dataItem, inputChange, dataOptions);
            if (result) return result;
          })
        );
      }
    } else if (inputChange === '' && optionsChange.length === 0) {
      setDataTable(data);
    }
  }, [inputChange]);

  return (
    <>
      <Autocomplete
        freeSolo
        autoComplete
        autoHighlight
        options={dataOptions}
        filterSelectedOptions
        multiple
        onChange={(_, value) => {
          setOptionsChange(value);
        }}
        onInputChange={(_, value) => {
          setInputChange(value);
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
      <DataTable rows={dataTable} />
    </>
  );
}

export default App;
