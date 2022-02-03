import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import { getEvents, extractLocations } from './api';
import NumberOfEvents from './NumberOfEvents';
import {
  ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import EventGenre from './EventGenre';

class App extends Component {
  state = {
    events: [],
    locations: [],
    numberOfEvents: 32,
  }

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents = (location === 'all') ? events : events.filter((event) => event.location === location);
      const shownEvents = locationEvents.slice(0, this.state.numberOfEvents);
      this.setState({
        events: shownEvents,
        currentLocation: location
      });
    });
  }

  getData = () => {
    const {locations, events} = this.state;
    const data = locations.map((location)=>{
      const number = events.filter((event) => event.location === location).length
      const city = location.split(', ').shift()
      return {city, number};
    })
    return data;
  };


  updateNumberOfEvents = (number) => {
    const newNum = number;
    this.setState({
      numberOfEvents: newNum
    });
    this.updateEvents(this.state.currentLocation);
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
          events: events.slice(0, this.state.numberOfEvents),
          locations: extractLocations(events),
        });
      }
      
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }
  render() {
    const { locations, numberOfEvents, events } = this.state;
    return (
      <div className="App">
      <h1>Meet App</h1>
      <CitySearch locations={locations} updateEvents={this.updateEvents} />
      <h4>Events in each city</h4>
      <div className="data-vis-wrapper">
        <EventGenre events={events} />
        <ResponsiveContainer height={400} >
          <ScatterChart
            width={800}
            height={400}
            margin={{
              top: 20, right: 20, bottom: 20, left: 20,
            }}
          >
            <CartesianGrid />
            <XAxis type="category" dataKey="city" name="city" />
            <YAxis type="number" dataKey="number" name="number of events" allowDecimals={false} />
            <Tooltip cursor={{ strokeDasharray: '3 3' }} />
            <Scatter data={this.getData()} fill="#8884d8" />
          </ScatterChart>
        </ResponsiveContainer>
      </div>
      <EventList events={events} />
    
      <NumberOfEvents updateNumberofEvents={this.updateNumberofEvents} numberOfEvents={numberOfEvents} />
      
    </div>
  );
}
}



export default App; 
