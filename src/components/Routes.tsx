import { Route, Switch } from 'react-router-dom';
import PostList from './PostList';
import SinglePost from './SinglePost';

const Routes = () => {
  return (
    <div>
      <Switch>
        <Route exact path='/' component={PostList} />
        <Route exact path='/:id' component={SinglePost} />
      </Switch>
    </div>
  );
};

export default Routes;
