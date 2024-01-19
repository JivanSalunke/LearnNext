import { Fragment } from "react";
import path from "path";
import fs from "fs/promises";

function ProductDetailsPage(props) {
  const { loadedProduct } = props;
    if(!loadedProduct){
      return <p>Loading...</p>
    }

  return (
    <Fragment>
      <div>{loadedProduct.title}</div>
      <div>{loadedProduct.description}</div>
    </Fragment>
  );
}
async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}
export async function getStaticProps(context) {
  const { params } = context;
  const productId = params.pid;

  const data = await getData();

  const product = data.products.find((product) => product.id === productId);
  if(!product){
    return {
        notFound:true
    }
  }
  return {
    props: {
      loadedProduct: product,
    },
  };
}

export async function getStaticPaths() {
  const data = await getData();
  const id = data.products.map((product) => product.id);
  const pathsWithParams = id.map(id=>({params:{pid: id}}));
  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

export default ProductDetailsPage;
