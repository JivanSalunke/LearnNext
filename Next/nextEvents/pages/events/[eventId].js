import { getAllEvents, getEventById } from "../../helpers/api-util";
import EventSummary from '../../components/event-detail/event-summary';
import EventContent from "../../components/event-detail/event-content";
import EventLogistics from '../../components/event-detail/event-logistics'
import { Fragment } from "react";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import { getFeaturedEvents } from "../../dummy-data";
import Head from 'next/head';
function EventDetailsPage(props) {
  const event= props.event;
  if(!event){
    return(
      <Fragment>
        <ErrorAlert>
          <p>No Event Found</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    )
  }
  return (
    <Fragment>
      <Head> 
        <title>{event.title}</title>
        <meta name="description" content={event.description}/>
      </Head>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId= context.params.eventId;
  const event= await getEventById(eventId);
  
    return {
      props :{
        event: event
      },
      revalidate : 30
      
    }
}

export async function getStaticPaths(){
  const allEvents= await getFeaturedEvents();

  const paths= allEvents.map( event => ({params: {eventId : event.id}}));

  return {
    paths: paths,
    fallback:'blocking'
  }
}
export default EventDetailsPage;
