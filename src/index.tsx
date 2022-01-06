import './index.css';

import { Response, createServer } from "miragejs"

import App from './App';
import React from 'react';
import ReactDOM from 'react-dom';
import { makeServer } from './server';
import reportWebVitals from './reportWebVitals';

// @ts-ignore
if (window.Cypress) {
  console.log('>>>>>>>>>>>>>> WINDOW CYPRESS')
  // If your app makes requests to domains other than / (the current domain), add them
  // here so that they are also proxied from your app to the handleFromCypress function.
  // For example: let otherDomains = ["https://my-backend.herokuapp.com/"]
  const otherDomains = ["api"];
  const methods = ["get", "put", "patch", "post", "delete"];

  createServer({
    environment: "test",
    routes() {
      for (const domain of ["/", ...otherDomains]) {
        for (const method of methods) {
	  // @ts-ignore
          this[method](`${domain}*`, async (schema, request) => {
	    // @ts-ignore
            let [status, headers, body] = await window.handleFromCypress(
              request
            )
            return new Response(status, headers, body)
          })
        }
      }

      // If your central server has any calls to passthrough(), you'll need to duplicate them here
      // this.passthrough('https://analytics.google.com')
    },
  })
}

if (process.env.NODE_ENV === "development") {
  console.log('MIRAGE MODE ENABLED -----------------------')
  makeServer({ environment: "development" })
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
