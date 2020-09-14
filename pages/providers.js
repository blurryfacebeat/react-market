import React from 'react';
import axios from 'axios';
import ProviderList from '../components/Providers/ProviderList';
import baseUrl from '../utils/baseUrl';

function Prov({ providers }) {
  return <ProviderList providers={providers} />;
}

Prov.getInitialProps = async () => {
  // Fetch data on server
  const url = `${baseUrl}/api/providers`;
  const response = await axios.get(url);
  return { providers: response.data };
  // Return response data as an object
  // Note: this object will be merged with existing props
}

export default Prov;