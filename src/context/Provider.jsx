import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [searchResponse, setSearchResponse] = useState();

  const context = useMemo(() => (
    {
      searchResponse,
      setSearchResponse,
    }
  ), []);

  return (
    <Context.Provider value={ context }>{ children }</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
