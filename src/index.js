import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';
import './app/layout/styles.css';
import App from './app/layout/App';
import { configureStore } from './app/store/configure-store';
import ScrollToTop from './app/layout/ScrollToTop';

const rootEl = document.getElementById('root');
const store = configureStore();

function render() {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <App />
      </BrowserRouter>
    </Provider>
  );
}

if(module.hot) {
  module.hot.accept('./app/layout/App', () => {
    setTimeout(render)
  });
}

render();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals();
