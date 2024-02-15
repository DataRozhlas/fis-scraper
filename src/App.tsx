import { useState } from "react";

import {
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  BarSeries,
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
        <Chart />

        <Legend layout="vertical" align="right" verticalAlign="middle" />

        <XAxis>
          <XAxis.Title>Time</XAxis.Title>
        </XAxis>

        <YAxis>
          <YAxis.Title>Number of employees</YAxis.Title>
          <BarSeries name="Installation" data={[43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]} />
          <BarSeries name="Manufacturing" data={[24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]} />
          <BarSeries name="Sales & Distribution" data={[11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]} />
          <BarSeries name="Project Development" data={[null, null, 7988, 12169, 15112, 22452, 34400, 34227]} />
          <BarSeries name="Other" data={[12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]} />
        </YAxis>
      </HighchartsChart>
    </>
  )
}

export default App
