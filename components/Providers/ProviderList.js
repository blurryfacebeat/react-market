import { Card } from 'semantic-ui-react';

function ProviderList({ providers }) {
  function mapProvidersToItems(providers) {
    return providers.map(provider => ({
      header: provider.name,
      image: provider.mediaUrl,
      color: 'blue',
      fluid: true,
      childKey: provider._id,
      href: `/provider?_id=${provider._id}`
    }));
  }

  return <Card.Group stackable itemsPerRow="3" centered items={mapProvidersToItems(providers)}/>;
}

export default ProviderList;