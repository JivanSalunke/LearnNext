function UserProfilePage(props) {
  return <h1>{props.name}</h1>;
}
export default UserProfilePage;

export async function getServerSideProps(context) {
  return {
    props: {
      name: 'Max',
    }
  };
}
