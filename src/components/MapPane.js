// components/MapPane.js
// Yuan Wang

import React, { Component } from 'react';
import { White, PrimaryColor, Red, Green } from '../global/Colors.js'
import axios from 'axios'
import { __COMPONENT_STYLES__ } from '../global/Styles.js'
import Icon from 'react-icons-kit';
import { roundN } from '../helpers/calcs.js'
import { boldUp } from 'react-icons-kit/entypo/boldUp'
import { boldDown } from 'react-icons-kit/entypo/boldDown'
import { Area, AreaChart, XAxis, YAxis, Tooltip } from 'recharts'
import ReactMapGL from 'react-map-gl';


const __DEV__ = false

export default class MapPane extends Component {

  constructor(props) {
    super(props)
    this.state = {
        viewport: {
        width: 400,
        height: 400,
        latitude: 37.7577,
        longitude: -122.4376,
        zoom: 8
      }
    }
  }

  componentDidMount() {

  }

  render() {

    var ts = []


    return (
      <div style={styles.container}>

        <ReactMapGL
          {...this.state.viewport}
          mapboxApiAccessToken={'pk.eyJ1IjoieXVhbmFnYWluIiwiYSI6ImNqaWNqMHAzNDAxaGIza3F2YWVwb3FsN2gifQ.cxwjkdM71unAsh2Q7zAtCw'}
          onViewportChange={(viewport) => this.setState({viewport})}
        /> 
      </div>
    )
  }
}


const styles = {
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    display: 'flex',
  },
  column: {

    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'flex-start',

  },
  spacer: {
    width: 20,
  },
  row: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row'
  },
  smallRow: {
    justifyContent: 'flex-end',
    display: 'flex',
    flexDirection: 'row',
    marginTop: 20,
    marginLeft: 0,
  }
}
