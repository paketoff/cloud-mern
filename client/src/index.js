import React from 'react';
import ReactDOM from 'react-dom/client';
import {store} from "./reducers";
import { Provider } from 'react-redux';
import App from './components/App';

ReactDOM.createRoot(document.getElementById("root")).render(
    <Provider store={store}>
        <App />

    </Provider>,
);

