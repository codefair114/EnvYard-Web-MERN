import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import GaugeChart from "react-gauge-chart";
import '../pages/products/products-page.css';
import ReactApexChart from 'react-apexcharts';
const Parameter = props => (
  <tr>
    <td>{props.parameter.date}</td>
    <td>{props.parameter.level}</td>
    <td>{props.parameter.plant}</td>
    <td>{props.parameter.moisture}</td>
    <td>{props.parameter.temperature}</td>
    <td>{props.parameter.humidity}</td>
    <td>{props.parameter.altitude}</td>
    <td>{props.parameter.light}</td>
    <td>{props.parameter.lpg}</td>
    <td>{props.parameter.co}</td>
    <td>{props.parameter.smoke}</td>

    <td>
      <a href="#" onClick={() => { props.deleteparameter(props.parameter._id) }}>delete</a>
    </td>
  </tr>
)

export default class ParametersList extends Component {
  constructor(props) {
    super(props);

    this.deleteparameter = this.deleteparameter.bind(this)

    this.state = {parameters: [],
      series: [
        {
          name: "Level 1",
          data: []
        },
        {
          name: "Level 2",
          data: []
        }
      ],
      options: {
        chart: {
          height: 350,
          type: 'line',
          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#77B6EA', '#545454'],
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: 'smooth'
        },
        title: {
          text: 'Level 1 & Level 2',
          align: 'left'
        },
        grid: {
          borderColor: '#e7e7e7',
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 1
        },
        xaxis: {
          categories: [],
          title: {
            text: 'Date'
          }
        },
        yaxis: {
          title: {
            text: 'Temperature'
          },
          min: 5,
          max: 40
        },
        legend: {
          position: 'top',
          horizontalAlign: 'right',
          floating: true,
          offsetY: -25,
          offsetX: -5
        }
      },
    
};
  }

  componentDidMount() {
    axios.get('/parameters/')
      .then(response => {
        this.setState({ parameters: response.data })
        return response.data
      }) .then(response => {
        var acc = 0;
        for (const x in response.filter(x => x.level === 1)) {
            this.state.series[0].data.push(x);
        }
        for (const x in response.filter(x => x.level === 2)) {
            this.state.series[1].data.push(x);
        this.state.options.xaxis.categories.push(acc++);
        }

        
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteparameter(id) {
    axios.delete('/parameters/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      parameter: this.state.parameters.filter(el => el._id !== id)
    })
  }

  parameterList() {
    return this.state.parameters.map(currentparameter => {
      return <Parameter parameter={currentparameter} deleteparameter={this.deleteparameter} key={currentparameter._id}/>;
    })
  }
 
  render() {
    return (
      <div>
        <h3>Telemetry</h3>
      <div className="productpage">
       
      <GaugeChart
        id="gauge-chart"
        textColor="#333"
        nrOfLevels={3}
        arcsLength={[60, 80, 100]}
        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
        percent={(this.state.parameters.filter(x => x.level === 1).reduce((acc, c) => acc + c.humidity, 0) / this.state.parameters.filter(x => x.level === 1).length)/100}
        text="Humidity level 1"
      />
      <GaugeChart
        id="gauge-chart"
        textColor="#333"
        nrOfLevels={3}
        arcsLength={[60, 80, 100]}
        colors={["#5BE12C", "#F5CD19", "#EA4228"]}
        percent={(this.state.parameters.filter(x => x.level === 2).reduce((acc, c) => acc + c.humidity, 0) / this.state.parameters.filter(x => x.level === 2).length)/100}
        text="Humidity level 2"
      />

    </div>
    <div className="productpage">
      <ReactApexChart options={this.state.options} series={this.state.series} type="line" height={350} width={1200} />

     </div>
        <table className="table">
          <thead className="thead-light">
            <tr>
            <th>Date</th>
            <th>Level</th>
            <th>Plant</th>
            <th>Moisture</th>
            <th>Temperature</th>
            <th>Humidity</th>
            <th>Altitude</th>
            <th>Light</th>
            <th>LPG</th>
            <th>CO</th>
            <th>Smoke</th>
            </tr>
          </thead>
          <tbody>
            { this.parameterList() }
          </tbody>
        </table>
      </div>
    )
  }
}