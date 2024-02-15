import { useState } from "react";

import {
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  ColumnSeries,
  Legend,
} from "react-jsx-highcharts";

import complete from "./assets/complete.json"
import cc from "./assets/cc.json"
import al from "./assets/al.json"

import './App.css'



function App() {
  const [data, setData] = useState(complete);
  const [view, setView] = useState("abs");


  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Ježiš je Pán
      </h1>
      <HighchartsChart>
        <Chart type="column"/>

        <Legend layout="vertical" align="right" verticalAlign="middle" />

        <XAxis categories={data.map(e => String(e.season))}>
          
        </XAxis>

        <YAxis>
        <ColumnSeries name="Nezrušené" data={data.map(e => e.completed)} stacking="percent" />
          <ColumnSeries name="Zrušené" data={data.map(e => e.cancelled)} stacking="percent" color="#db3d78"/>
        </YAxis>
      </HighchartsChart>
    </>
  )
}

export default App
