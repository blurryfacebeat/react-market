import { Item } from 'semantic-ui-react';
import AddProductToCart from './AddProductToCart';

function ProductSummary({ name, mediaUrl, _id, price, producer, user }) {
  return (
    <Item.Group>
      <Item>
        <Item.Image size="medium" src={mediaUrl} />
        <Item.Content>
          <Item.Header>{name}</Item.Header>
          <Item.Description>
            <p>Цена: {price} руб.</p>
            <p>Производитель: {producer}</p>
          </Item.Description>
          <Item.Extra>
            <AddProductToCart user={user} productId={_id} />
          </Item.Extra>
        </Item.Content>
      </Item>
    </Item.Group>
  );
}

export default ProductSummary;
