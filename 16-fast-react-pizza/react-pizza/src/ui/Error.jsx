import { useRouteError } from 'react-router-dom';
import Linkbutton from './Linkbutton';

function NotFound() {
  const error = useRouteError();
  console.log(error);

  return (
    <div>
      <h1>Something went wrong 😢</h1>
      <p>{error.data || error.message}</p>
      <Linkbutton to="-1">&larr; Go back</Linkbutton>
    </div>
  );
}

export default NotFound;
