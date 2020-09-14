import React from 'react';
import { Header, Button, Modal } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import { useRouter } from 'next/router';

function ProducerAttributes({ description, _id }) {
  const [modal, setModal] = React.useState(false);
  const router = useRouter();

  async function handleDelete() {
    const url = `${baseUrl}/api/producer`
    const payload = { params: { _id } }
    await axios.delete(url, payload)
    router.push('/producer');
  }

  return <>
    <Header as="h3">О производителе</Header>
    <p>{description}</p>
    <Button
      icon="trash alternate outline"
      color="red"
      content="Удалить производителя"
      onClick={() => setModal(true)}
    />
    <Modal open={modal} dimmer="blurring">
      <Modal.Header>Подтверждение действия</Modal.Header>
      <Modal.Content>
        <p>Вы действительно хотите удалить этого производителя?</p>
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
  </>;
}

export default ProducerAttributes;