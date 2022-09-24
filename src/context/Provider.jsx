import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [searchResponse, setSearchResponse] = useState({ meals: [], drinks: [] });

  const context = {
    searchResponse,
    ...searchResponse,
    setSearchResponse,
  };

  // const context = useMemo(() => (
  //   {
  //     searchResponse,
  //     ...searchResponse,
  //     setSearchResponse,
  //   }
  // ), []);

  return (
    <Context.Provider value={ context }>{ children }</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
