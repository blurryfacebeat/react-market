import { Card } from 'semantic-ui-react';

function ProducerList({ producers }) {
  function mapProducersToItems(producers) {
    return producers.map(producer => ({
      header: producer.name,
      image: producer.mediaUrl,
      color: 'blue',
      fluid: true,
      childKey: producer._id,
      href: `/producers?_id=${producer._id}`
    }));
  }

  return <Card.Group stackable itemsPerRow="3" centered items={mapProducersToItems(producers)}/>;
}

export default ProducerList;