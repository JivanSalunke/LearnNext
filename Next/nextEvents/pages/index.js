import EventList from "../components/events/event-list";
import {getFeaturedEvents} from "../helpers/api-util"
import Head from 'next/head';
function HomePage(props) {
  return (
    <div>
      <Head>
        <title>NeaxtEvents</title>
        <meta name="description"  content="Find the events"/>
      </Head>
      <EventList items={props.events}/>
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents= await getFeaturedEvents();
  return {
    props: {
      events : featuredEvents
    },
    revalidate :1800
  }
}
export default HomePage;