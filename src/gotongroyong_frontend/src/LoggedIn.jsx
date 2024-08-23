import Form from "./Form";
import Header from "./Header";

function LoggedIn(props) {
  const role = 'community';

  return (
    <>
      <Header />
      <div className="container">
        <br />
        <h1>Welcome, green patrol</h1>
        <Form role={role} />
      </div>
    </>
  );
}

export default LoggedIn;
