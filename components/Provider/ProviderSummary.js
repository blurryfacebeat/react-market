import { Item, Label } from 'semantic-ui-react';

function ProviderSummary({ name, mediaUrl, address, tel, url, email }) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>Адрес: {address}</p>
            <Label>Телефон: {tel}</Label>
            <br></br>
            <a href={url}>Веб-сайт</a>
            <p>Email: {email}</p>
          </Item.Description>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProviderSummary;