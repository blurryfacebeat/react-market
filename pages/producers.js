import axios from 'axios';
import ProducerSummary from '../components/Producer/ProducerSummary';
import ProducerAttributes from '../components/Producer/ProducerAttributes';
import baseUrl from '../utils/baseUrl';

function Producer({ producer }) {
  return (
    <>
    <ProducerSummary {...producer} />
    <ProducerAttributes {...producer} />
    </>
  )
}

Producer.getInitialProps = async ({ query: { _id } }) => {
  const url = `${baseUrl}/api/producer`;
  const payload = { params: { _id } }
  const response = await axios.get(url, payload);
  return { producer: response.data };
};

export default Producer;