import React from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import ProductList from '../components/Index/ProductList';
import ProductPagination from '../components/Index/ProductPagination';

function Home({ products, totalPages }) {
  return <>
    <ProductList products={products} />
    <ProductPagination totalPages={totalPages} />
  </>
}

Home.getInitialProps = async (ctx) => {
  const page = ctx.query.page ? ctx.query.page : "1";
  const size = 3;
  // Fetch data on server
  const url = `${baseUrl}/api/products`;
  const payload = { params: { page, size } };
  const response = await axios.get(url, payload);
  return response.data;
  // Return response data as an object
  // Note: this object will be merged with existing props
}

export default Home;
