import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search"
import { getAllEvents } from "../../helpers/api-util";
import Head from 'next/head';

function AllEventsPage(props) {
  const allEvents = props.events;
  const router=useRouter();
  function findEventHandler(year, month){
    router.push(`/events/${year}/${month}`)
  }
  return (
    <div>
      <Head>
        <title>All Events</title>
        <meta name="description" content="all events page"/>
      </Head>
      <EventSearch onSearch={findEventHandler}/>
      <EventList items={allEvents}/>
    </div>
  );
}
export async function getStaticProps(context){
  const allEvents= await getAllEvents();

  return {
    props:{
      events : allEvents
    },
    revalidate:60,
  }
}
export default AllEventsPage;
