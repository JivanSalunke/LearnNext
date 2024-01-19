import path from "path";
import fs from "fs/promises";
import Link from 'next/link';
function HomePage(props) {
  return (
    <ul>
      {props.products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  console.log("re-gen");
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  // const data=[];

  if (data.length == 0) {
    return {
      redirect: {
        destination: "/no",
      },
    };
  }

  return {
    props: {
      products: data.products,
    },
    revalidate: 10,
  };
}
export default HomePage;
