import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

export default function Provider({ children }) {
  const [random, setRandom] = useState();

  const context = useMemo(() => (
    {
      random,
      setRandom,
    }
  ), []);

  return (
    <Context.Provider value={ context }>{ children }</Context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
