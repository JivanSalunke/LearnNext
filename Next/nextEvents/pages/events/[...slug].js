import EventsList from "../../components/events/event-list";
import { Fragment, useEffect, useState } from "react";
import ErrorAlert from "../../components/ui/error-alert";
import Button from "../../components/ui/button";
import ResultsTitle from "../../components/events/results-title";
import { useRouter } from "next/router";
import useSWR from "swr";
import Head from 'next/head'
function FilteredEventsPage(props) {
  const router = useRouter();

  const filterData = router.query.slug;
 
  const [loadedEvents, setLoadedEvents]= useState();
  const { data, error } = useSWR(
    'https://nextjs-course-18aea-default-rtdb.firebaseio.com/events.json'
  );
  
  useEffect(() => {
  console.log(data);
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  },[data]);

  if (!data) {
    
    return (
      <ErrorAlert>
        <p>Loading ... </p>
      </ErrorAlert>
    );
  }
  const filterYear = filterData[0];
  const filterMonth = filterData[1];

  const numMonth=+filterMonth;
  const numYear= +filterYear;

  if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }
  
  let filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1;
  });

  if (!filteredEvents || filteredEvents.length == 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No Events Available For The Given Date</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const eventDate = new Date(numYear, numMonth - 1);
  return (
    <div>
      <Head>
        <title>Filtered Events</title>
        <meta name="description" content={`All events for ${numMonth}/${numYear}`}/>
      </Head>
      <ResultsTitle date={eventDate} />
      <EventsList items={filteredEvents} />
    </div>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;
//   const filterData = params.slug;

//   const filterYear = filterData[0];
//   const filterMonth = filterData[1];

//   const numYear = +filterYear;
//   const numMonth = +filterMonth;

//   if (isNaN(numYear) || isNaN(numMonth) || numMonth < 1 || numMonth > 12) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//   const resultList = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: resultList,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }
export default FilteredEventsPage;
