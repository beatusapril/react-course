import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { StateStore } from './store/reducers/reducer';
import { increment, decrement } from './store/actions/Action';

function App() {
  const count = useSelector((state: StateStore) => state.count);
  const dispatch = useDispatch();

  const incrementHandler = () => {
    dispatch(increment());
  }

  const decrementHandler = () => {
    dispatch(decrement());
  }

  return (
    <div style={{padding: '10px'}}>
      <div style={{padding: '10px'}}>{count}</div>
      <button onClick={incrementHandler}>increment</button>
      <button onClick={decrementHandler}>decrement</button>
    </div>
  );
}

export default App;
