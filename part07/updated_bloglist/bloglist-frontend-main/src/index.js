import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'

import App from "./App.js";
import store from "./store.js";

store.subscribe(() => {
    const storeNow = store.getState()
    console.log('storeNow', storeNow)
  })

ReactDOM.createRoot(document.getElementById("root")).render(
        <Router>
            <Provider store={store}>
                <App />
            </Provider>
        </Router>
);
