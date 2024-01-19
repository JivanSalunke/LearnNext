import { useEffect, useState } from "react";
import useSWR from "swr";

function LastSalePage(props) {
  const [salesList, setSalesList] = useState([]);

  const { data, error } = useSWR(
    "https://nextjs-course-18aea-default-rtdb.firebaseio.com/Sales.json"
  );

  useEffect(() => {
    if (data) {
      const list = [];
      for (const key in data) {
        list.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }
      setSalesList(list);
    }
  }, [data]);

  if (error) {
    return <p>Error....</p>;
  }
  if (!data && !salesList) {
    return <p>Loading...</p>;
  }

  return (
    <ul>
      {salesList.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}
export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-18aea-default-rtdb.firebaseio.com/Sales.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const list = [];
      for (const key in data) {
        list.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }
      console.log(list);
      return { props: { sales: list } };
    });
}
export default LastSalePage;
