import React from 'react';
import axios from 'axios';
import ProducerList from '../components/Producers/ProducerList';
import baseUrl from '../utils/baseUrl';

function Prod({ producers }) {
  return <ProducerList producers={producers} />;
}

Prod.getInitialProps = async () => {
  // Fetch data on server
  const url = `${baseUrl}/api/producers`;
  const response = await axios.get(url);
  return { producers: response.data };
  // Return response data as an object
  // Note: this object will be merged with existing props
}

export default Prod;