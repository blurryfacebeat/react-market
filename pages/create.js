import React from 'react';
import { Form, Input, TextArea, Button, Image, Message, Header, Icon } from 'semantic-ui-react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import catchErrors from '../utils/catchErrors';

const INITIAL_PRODUCT = {
  name: "",
  producer: "",
  price: "",
  media: "",
  description: ""
}

function CreateProduct() {
  const [product, setProduct] = React.useState(INITIAL_PRODUCT);
  const [mediaPreview, setMediaPreview] = React.useState("");
  const [success, setSuccess] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [disabled, setDisabled] = React.useState(true);
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const isProduct = Object.values(product).every(el => Boolean(el));
    isProduct ? setDisabled(false) : setDisabled(true);
  }, [product]);

  function handleChange(event) {
    const { name, value, files } = event.target;
    if (name === 'media') {
      setProduct(prevState => ({ ...prevState, media: files[0] }));
      setMediaPreview(window.URL.createObjectURL(files[0]));
    } else {
      setProduct((prevState) => ({ ...prevState, [name]: value }));
    }
  }

  async function handleImageUpload() {
    const data = new FormData();
    data.append('file', product.media);
    data.append('upload_preset', 'citymobile');
    data.append('cloud_name', 'blurryfacebeat');
    const response = await axios.post(process.env.CLOUDINARY_URL, data);
    const mediaUrl = response.data.url;
    return mediaUrl;
  }

  async function handleSubmit(event) {
    try {
      event.preventDefault();
      setLoading(true);
      setError('');
      const mediaUrl = await handleImageUpload();
      const url = `${baseUrl}/api/product`;
      const { name, producer, price, description } = product;
      const payload = { name, producer, price, description, mediaUrl };
      await axios.post(url, payload);
      setProduct(INITIAL_PRODUCT);
      setSuccess(true);
    } catch(error) {
      catchErrors(error, setError);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header as="h2" block>
      <Icon name="add" color="orange" />
        Добавить продукт
      </Header>
      <Form loading={loading} error={Boolean(error)} success={success} onSubmit={handleSubmit}>
      <Message
          error
          header="Ошибка"
          content={error}
        />
      <Message
          success
          icon="check"
          header="Успешно"
          content="Продукт создан"
        />
        <Form.Group widths='equal'>
          <Form.Field 
            control={Input}
            name="name"
            label="Название"
            placeholder="Введите название"
            value={product.name}
            onChange={handleChange}
          />
          <Form.Field 
            control={Input}
            name="producer"
            label="Производитель"
            placeholder="Введите название"
            value={product.producer}
            onChange={handleChange}
          />
          <Form.Field 
            control={Input}
            name="price"
            label="Цена"
            placeholder="Введите цену"
            min="0.00"
            step="0.01"
            type="number"
            value={product.price}
            onChange={handleChange}
          />
          <Form.Field
            control={Input}
            name="media"
            label="Изображение"
            accept="image/*"
            content="Выберите изображение"
            type="file"
            onChange={handleChange}
          />
        </Form.Group>
        <Image src={mediaPreview} rounded centered size="small" />
        <Form.Field
          control={TextArea}
          name="description"
          label="Описание"
          placeholder="Введите описание"
          value={product.description}
          onChange={handleChange}
        />
        <Form.Field
          control={Button}
          disabled={disabled || loading}
          color="blue"
          icon="pencil alternate"
          content="Создать"
          type="submit"
        />
      </Form>
    </>
  )
}

export default CreateProduct;
