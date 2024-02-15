import { useState, useEffect } from "react";

import {
  HighchartsChart,
  Chart,
  XAxis,
  YAxis,
  ColumnSeries,
  Legend,
  Tooltip,
} from "react-jsx-highcharts";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import './App.css'

import complete from "./assets/complete.json";
import al from "./assets/al.json";
import cc from "./assets/cc.json";


function App() {
  const [data, setData] = useState(complete);
  const [discipline, setDiscipline] = useState("complete");
  const [view, setView] = useState("rel");

  useEffect(() => {
    switch (discipline) {
      case "complete":
        setData(complete);
        break;
      case "al":
        setData(al);
        break;
      case "cc":
        setData(cc);
        break;
    }
  }, [discipline]);


  return (
    <>
      <h1 className="text-3xl font-bold pb-5">
        Závody světové lyžařské federace FIS
      </h1>
      <p className="pb-5">
        Zdroj dat: <a className="underline text-blue-800" href="https://www.fis-ski.com/DB/general/calendar-results.html" target="_blank">https://www.fis-ski.com/DB/general/calendar-results.html</a></p>
      <Select onValueChange={e=>setDiscipline(e)}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Vyberte disciplínu" />
        </SelectTrigger>
        <SelectContent className="bg-white">
        <SelectGroup>
          <SelectItem value="complete">Všechny disciplíny</SelectItem>
          <SelectItem value="al">Alpské lyžování</SelectItem>
          <SelectItem value="cc">Běh na lyžích</SelectItem>
        </SelectGroup>
        </SelectContent>
      </Select>
      <RadioGroup className="py-5" value={view} onValueChange={e => setView(e)}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="abs" id="option-abs" />
          <Label htmlFor="option-abs">zobrazit absolutně (počet)</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="rel" id="option-rel" />
          <Label htmlFor="option-rel">zobrazit relativně (procenta)</Label>
        </div>
      </RadioGroup>

      <HighchartsChart>
        <Chart type="column" />

        <Legend layout="vertical" align="right" verticalAlign="middle" />

        <XAxis categories={data.map(e => String(e.season))}>

        </XAxis>

        <YAxis>
          <ColumnSeries name="Nezrušené" data={data.map(e => e.completed)} stacking={view === "rel" ? "percent" : "normal"} />
          <ColumnSeries name="Zrušené" data={data.map(e => e.cancelled)} stacking={view === "rel" ? "percent" : "normal"} color="#db3d78" />
        </YAxis>
        <Tooltip shared={true} />
      </HighchartsChart>
    </>
  )
}

export default App
