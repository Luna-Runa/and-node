// its top components
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./bootstrap.min.css";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { combineReducers, createStore } from "redux";

// 공유할 state
function diaryReducer(state = [{}], action) {
  if (action.type === "diary") {
    const changeState = [...action.payload];
    return changeState;
  }
  return state;
}

function userReducer(state = [{}], action) {
  if (action.type === "user") {
    const changeState = [...action.payload];
    return changeState;
  }
  return state;
}

function sessionReducer(state = [{}], action) {
  if (action.type === "session") {
    const changeState = [...action.payload];
    return changeState;
  }
  return state;
}

const store = createStore(
  combineReducers({
    diaryReducer,
    userReducer,
    sessionReducer,
  })
);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
