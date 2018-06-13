// components/MarketsPane.js
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

const __DEV__ = false
const __MARKETS__ = [ 'nasdaq', 'vix', 'nikkei' ]

const marketRow = (mkt, name, val) => {
  var up = val >= 0
  if (mkt == 'vix') {
    up = -up
  }

  var color = up >= 0 ? Green(0.7) : Red(0.7)
  var icon = up ? boldUp : boldDown

  return (
    <div 
      key={mkt}
      style={marketRowStyle.container}>
      <div 
        style={marketRowStyle.row}>
        <Icon 
          size={60}
          style={{ 
            color: color
          }} 
          icon={ icon }/>
        <h1 
          style={{
            ...__COMPONENT_STYLES__.titleText,
            ...{
              textAlign: 'start',
              margin: 0,
              marginLeft: 8,
              color: color,
            }
          }}>
          { mkt.toUpperCase()}
        </h1>
        <h1 
          style={{
            ...__COMPONENT_STYLES__.titleText,
            ...{
              textAlign: 'end',
              margin: 0,
              marginLeft: 30,
              color: color,
            }
          }}>
          { Math.abs(roundN(val, 2)) + '%' }
        </h1>

      </div>
      <p 
        style={{
            ...__COMPONENT_STYLES__.subtitle,
            ...{
              textAlign: 'start',
              margin: 0,
              marginLeft: 70,
              color: White(0.5),
            }
          }}>
        { name }
      </p>
    </div>)
}

const marketRowStyle = {
  container: {
    flexDirection: 'column',
    display: 'flex', 
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    display: 'flex',
    marginBottom: -6,
  }
}

export default class MarketsPane extends Component {

  constructor(props) {
    super(props)
    this.state = {
      vix: null
    }
    this.getMarkets = this.getMarkets.bind(this)
  }

  componentDidMount() {
    this.getMarkets()
  }

  getMarkets() {

    // var mkt = 'nasdaq'
    // axios.get(
    //   '/' + mkt
    // )
    // .then(function(response) {
    //   console.log(response)
    //   var update = {}
    //   update[mkt] = response.data
    //   this.setState(update)
    // }.bind(this))
    // .catch(function(error) {
    //   console.log(error);
    // })

    __MARKETS__.map( function( mkt, index ) {
      if (__DEV__) {
        console.log("Fetching " + mkt)
      }
      axios.get(
        '/' + mkt
      )
      .then(function(response) {
        if (__DEV__) {
          console.log(response.data)
        }
        var update = {}
        update[mkt] = response.data
        this.setState(update)
      }.bind(this))
      .catch(function(error) {
        console.log(error);
      })

    }.bind(this))
    
  }

  render() {

    var rows = []

    for (var i = 0; i < __MARKETS__.length; i++) {
      var mkt = __MARKETS__[i]
      if ( this.state[mkt] != null ) {
        var val = this.state[mkt].dataset.data[0][1]

        var yesterday = this.state[mkt].dataset.data[1][1]
        var today = this.state[mkt].dataset.data[0][1]
        var change = (today - yesterday) / yesterday

        var name = this.state[mkt].dataset.name

        rows.push(
          marketRow(mkt, name, change)
        )
      }
    }

    var ts = []
    if (this.state.nasdaq != null) {
      ts = this.state.nasdaq.dataset.data
    }

    return (
      <div style={styles.container}>
        <AreaChart width={450} height={140} data={ts}
          margin={{ top: 10, right: 30, left: 10, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={White(0.8)} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={White(0.8)} stopOpacity={0}/>
            </linearGradient>
          </defs>

          <YAxis 
            stroke={White(0.8)}
            type="number" 
            domain={['dataMin', 'dataMax']}
            />

          <Area type="monotone" dataKey={1} stroke={White(0.8)} fillOpacity={1} fill="url(#colorUv)" />
        </AreaChart>

        <br/>
        { rows }
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
