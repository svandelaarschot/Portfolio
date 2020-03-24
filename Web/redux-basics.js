const redux = require("redux");
const createStore = redux.createStore;

/* Execute this with: node .\redux-basics.js to see the result.  */

// Type-safe initialState!
const initialState = {
  payload: [{ HTML: "<div>Hello World!</div>" }]
};

// 1. Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_SOMETHING":
      return {
        ...state,
        payload: [{ HTML: "<div>Hello Friends!</div>" }]
      };
    case "UPDATE_SOMETHING":
      return {
        ...state,
        payload: [{ HTML: "<div>Hello World! Stop Corona :( </div>" }]
      };
  }
  return state;
};

// 2. Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log("[Subscription]", store.getState());
});

// 3. Dispatching Action
store.dispatch({ type: "FETCH_SOMETHING" });
store.dispatch({ type: "UPDATE_SOMETHING" });
