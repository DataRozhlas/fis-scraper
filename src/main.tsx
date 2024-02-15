import React from 'react'
import ReactDOM from 'react-dom/client'
import Highcharts from 'highcharts';
import {
  HighchartsProvider,
} from "react-jsx-highcharts";
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HighchartsProvider Highcharts={Highcharts}>
      <App />
    </HighchartsProvider>
  </React.StrictMode>,
)
