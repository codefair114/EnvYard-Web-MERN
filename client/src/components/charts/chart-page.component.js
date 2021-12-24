import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart'
import axios from 'axios';

export default class ChartsPage extends React.Component {
  
    constructor(props) {
        super(props);
        
        this.state = {rating: [],
                      average_rating: 0,
                      users: [],
                      revenue: [],
                      total_revenue: 0};
      }
    async componentDidMount() {
      

          await axios.get('/orders/')
          .then(response => {
            var s = 0;
            response.data.forEach(element => {
              this.state.revenue.push(element.amount);
              s = s + element.amount;
            });
            this.setState({ total_revenue: s});
            console.log(this.state.revenue);
          })
          .catch((error) => {
            console.log(error);
          })
          
    }
    render() {
    return (
      <div className="container">
        <div>
        <Line
          data={[10, 20, 30]}
          options={{
            title:{
              display:true,
              text:'Revenue',
              fontSize:20
            },
            legend:{
              display:true,
              position:'right'
            }
          }}
        />
      </div>
        <div>
            <Bar
            data={this.state.users}
            options={{
                title:{
                display:true,
                text:'Users registered',
                fontSize:20
                },
                legend:{
                display:true,
                position:'right'
                }
            }}
            />
        </div>
        <div>
        <GaugeChart id="gauge-chart5"
        nrOfLevels={420}
        arcsLength={[0.3, 0.5, 0.2]}
        colors={['#5BE12C', '#F5CD19', '#EA4228']}
        percent={this.state.average_rating/5}
        arcPadding={0.02}
        />
        </div>
        
      </div>
    );
  }
}