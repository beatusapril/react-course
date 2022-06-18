/*
  Реализуйте функцию createStore, которая возвращает объект store.
  createStore должна принимать на вход reducer и initialState.
  В store должна быть функция subscribe, подписывающая на себя переданного в неё listener.
  При обновлении данных в store, он (store) должен уведомить об обновлении всех listeners.
  В приложении есть 2 "компонента", каждый подписывается на обновления в store.
  Они отображают содержимое стора и кнопки.
  Нажатие на кнопку increment/decrement изменяет состояние стора, соответственно UI должен обновиться.
  При нажатии кнопки unsubscribe в одном из компонентов должен отписаться только этот компонент.
  То есть второй компонент при этом сохраняет свою возможность получать обновления из стора.
*/

export function createStore(reducer, initialState) {
  let state = initialState;
  let reducerValue = reducer;
  let subscribers = [];


  const getState = () => state;

  const dispatch = (action) => {
    state = reducerValue(state, action);
    subscribers.forEach((subscribe, index) => { console.log(index); subscribe(state) });
  };

  const subscribe = (func) => {
    subscribers.push(func);
    return () => {
      subscribers = subscribers.filter((subscribe) => subscribe !== func);
    }
  };

  return { getState, dispatch, subscribe };
}
