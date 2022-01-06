import './App.css';

import { QueryClient, QueryClientProvider } from "react-query"

import React from 'react';
import UserData from "./UserData"

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 0 } },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="App">
        <header className="App-header">
          <h1>Hello world</h1>
        </header>
        <UserData />
      </div>
    </QueryClientProvider>
  );
}

export default App;
