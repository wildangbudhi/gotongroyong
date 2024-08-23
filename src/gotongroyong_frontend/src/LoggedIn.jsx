import Form from "./Form";
import Header from "./Header";

function LoggedIn(props) {
  return (
    <>
      <Header />
      <div className="container">
        <br />
        <h1>Welcome, green patrol</h1>
        <Form />
      </div>
    </>
  );
}

export default LoggedIn;
