import React from 'react';
import { LineChart, BarChart } from 'react-chartkick'
import 'chartkick/chart.js'
import axios from 'axios';

export default class UsersPage extends React.Component {
  
    constructor(props) {
        super(props);

        this.state = {
            data: {},
            total_users: 0
        
        };
      }
    componentDidMount() {
      
          axios.get('/user/')
          .then(response => {
            var s = 0;
            var datav = {};
            var final = [];
            response.data.forEach(element => {
                var d = element.createdAt;
                var tim = 1;
                datav[d] += tim;
                final.push([d, tim])

              s = s + element.amount;
            });

            console.log(datav);
            this.setState({data: final});

          })

         
          .catch((error) => {
            console.log(error);
          })
          
    }
    render() {
    return (
        
      <div className="container">
            <BarChart data={this.state.data} />

      </div>
    );
  }
}