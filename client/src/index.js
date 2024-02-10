import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ConfigProvider } from 'antd';
import store from './redux/store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>

    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary:'#04B2D9',
            colorPrimaryHover: '#00b4d4',
            boxShadow: "none",
          
          },
        },
        token: {
          borderRadius: "2px"
        }
      }}
    >
      <App />
    </ConfigProvider>
  </Provider>

);

reportWebVitals();

