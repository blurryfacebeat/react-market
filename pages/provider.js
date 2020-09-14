import axios from 'axios';
import ProviderSummary from '../components/Provider/ProviderSummary';
import ProviderAttributes from '../components/Provider/ProviderAttributes';
import baseUrl from '../utils/baseUrl';

function Provider({ provider }) {
  return (
    <>
    <ProviderSummary {...provider} />
    <ProviderAttributes {...provider} />
    </>
  )
}

Provider.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/provider`;
  const payload = { params: { _id } }
  const response = await axios.get(url, payload);
  return { provider: response.data };
};

export default Provider;