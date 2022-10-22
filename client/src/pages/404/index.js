// This page returns if you attempt to reach a non-existing route
function Error404() {
  return (
    <div className="Error-404 text-center mt-5">
      <h3 className="mb-3">No resource found at {window.location.href}</h3>
      <h4>Please try again...</h4>
    </div>
  );
}
export default Error404;
