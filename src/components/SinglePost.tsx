import { useHistory } from 'react-router-dom';

const SinglePost = () => {
  const history = useHistory();
  const state = history?.location?.state;
  return <p>{JSON.stringify(state)}</p>;
};

export default SinglePost;
