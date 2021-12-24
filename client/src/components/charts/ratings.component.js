import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import GaugeChart from 'react-gauge-chart'
import axios from 'axios';

export default class RatingsPage extends React.Component {
  
    constructor(props) {
        super(props);
        
        this.state = {rating: [],
                      average_rating: 0,
                      users: [],
                      revenue: [],
                      total_revenue: 0};
      }
    componentDidMount() {
      
       axios.get('/reviews/')
          .then(response => {
            var avg = 0;
            var num = 0;
            response.data.forEach(element => {
              this.state.rating.push(element.rating);
              avg = avg + element.rating;
              num = num + 1;
            });
            this.setState({ average_rating: avg/num});
          })
          .catch((error) => {
            console.log(error);
          })
        
    }
    render() {
    return (
      <div className="container">
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