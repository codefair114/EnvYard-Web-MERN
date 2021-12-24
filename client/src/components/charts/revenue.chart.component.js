import React from 'react';
import { LineChart, PieChart } from 'react-chartkick'
import 'chartkick/chart.js'
import axios from 'axios';

export default class RevenuePage extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            total_revenue: 0
        
        };
      }

    
    componentDidMount() {
      
          axios.get('/orders/')
          .then(response => {
            var s = 0;
            var datav = {};
            response.data.forEach(element => {
                var d = element.createdAt;
                var tim = element.amount;
                datav[d] = tim;

              s = s + element.amount;
            });
            console.log(datav);
            this.setState({data: datav});

          })
          .catch((error) => {
            console.log(error);
          })
          
    }
    render() {
    return (
        
      <div className="container">
            <LineChart data={this.state.data} />

      </div>
    );
  }
}