import React, { Component } from 'react';
import {HorizontalBar} from 'react-chartjs-2';
import axios from 'axios';

export default class Categorybarmn extends Component
{
   constructor(props) {
      super(props);
      this.state = {
        Data: {}
      }
    }
       
      componentDidMount() {
        axios.get(`http://localhost:8081/tracker/register/monthlycategorysum`,{params:{uSER_ID:  this.props.message}})
          .then(res => {
        const response = res.data;
        let category=[];
        let amount = [];
        Array.from(response).forEach(element => {
          category.push(element.CATEGORY_NAME);
          amount.push(element.SUMAMOUNT);
        });
            this.setState({ 
              Data: {
                labels:category,
                datasets:[
                   {
                      data: amount,
                      borderColor: '  rgb(255, 255, 255)',
                      backgroundColor:"#F35B8c"
                    
                   }
                ]
             }
             });
          }).catch(error => {console.log(error)
            this.setState({ErrorMessage:"Error in retrieving data"})
          }) 
        }
 render()
   {
     return(
      <div>
          <HorizontalBar
            data = {this.state.Data}
            options = {chartoptions} 
            width= {350}
            height={100} />
        </div>
      )
   }   
}

const chartoptions = {
  tooltips:{
    yPadding : 0.1,
    xPadding  : 0.1
},
barValueSpacing : 1,       
barDatasetSpacing : 1,
   legend: {
    display: false,
 },
  scales:{
    xAxes:[{
      ticks: {
          display: false,
          beginAtZero : true
      },
      responsive: true,
      gridLines: {
          display:false,
          color: "rgba(0, 0, 0, 0)"
      }
  }],
      yAxes:[{
    
        ticks: {
            display: true,
            beginAtZero : true,
            padding: -680,
            fontSize: 15,
            
        },
        categoryPercentage: 0.8,
        barPercentage: 1,
         minBarLength: 2,
        gridLines: {
            display:false,
            color: "rgba(0, 0, 0, 0)"
        }   
    }]
}
}