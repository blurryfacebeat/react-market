import React from 'react';
import { Header, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';

function ProductAttributes({ description, _id, user }) {
  const [modal, setModal] = React.useState(false);
  const router = useRouter();
  const isRoot = user && user.role === 'root';
  const isAdmin = user && user.role === 'admin';
  const isRootOrAdmin = isRoot || isAdmin;

  async function handleDelete() {
    const url = `${baseUrl}/api/product`
    const payload = { params: { _id } }
    await axios.delete(url, payload)
    router.push('/');
  }

  return <>
    <Header as="h3">О продукте</Header>
    <p>{description}</p>
    {isRootOrAdmin && (
    <>
    <Button
      icon="trash alternate outline"
      color="red"
      content="Удалить продукт"
      onClick={() => setModal(true)}
    />
    <Modal open={modal} dimmer="blurring">
      <Modal.Header>Подтверждение действия</Modal.Header>
      <Modal.Content>
        <p>Вы действительно хотите удалить этот продукт?</p>
      </Modal.Content>
      <Modal.Actions>
        <Button 
          onClick={() => setModal(false)}
          content="Отмена" 
        />
        <Button 
          negative
          icon="trash"
          labelPosition="right"
          content="Удалить"
          onClick={handleDelete}
        />
      </Modal.Actions>
    </Modal>
    </>
    )}
  </>;
}

export default ProductAttributes;
