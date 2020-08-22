import { Gun } from '../types/Gun';
import React from 'react';

class Guns extends React.Component {
    state = {
      guns: [],
      loading: true,
      error: false
    }
  
    componentDidMount () {
      fetch('http://paintballinventory-env.eba-yah5svs5.us-east-2.elasticbeanstalk.com/api/guns')
        .then(response => response.json())
        .then(response => this.setState({ 
          guns: response.results,
          loading: false
        }))
        .catch(error => this.setState({ 
          loading: false, 
          error: true 
        }));
    }
  
    render () {
      const { guns, loading, error } = this.state;
      return (
        <div>
         
        </div>
      );
    }
  };