// App.js
// Yuan Wang

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import BackgroundImage from './components/BackgroundImage.js'
import { __COMPONENT_STYLES__ } from './global/Styles.js'
import { White, PrimaryColor } from './global/Colors.js'
import axios from 'axios'

import './index.css'

const __BACKGROUND_IMAGE_URL__ = "http://snowbirdsgulfcoast.com/wp-content/uploads/2015/09/Dauphin-Island-sunset.jpg"

const __BACKGROUND_IMAGES__ = [
  "https://i2.wp.com/thelistenersclub.timothyjuddviolin.com/wp-content/uploads/sites/2/2014/03/mountain-sunrise-background-wallpaper-1.jpg?fit=2560%2C1600",
  "https://static.tripping.com/uploads/image/0/1559/venice-beach-florida.jpg",
  "http://www.wsllpaper.com/wp-content/uploads/2014/02/beautiful-evening-sunset-hd-desktop-wallpaper.jpg",
  "https://accuweather.brightspotcdn.com/e7/42/8edb1a6f4343bd2696820566e09a/milky-way.jpeg"
]

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
    // hourly rerender
    setInterval( 
      () => window.location.reload(), 
      60 * 60 * 1000
    );
  }


  render() {
    // determine the background
    var now = new Date()
    var hour = now.getHours()

    var backgroundIndex = 3
    if (hour >= 5 && hour <= 9) {
      backgroundIndex = 0
    }
    else if (hour > 9 && hour <= 16) {
      backgroundIndex = 1
    }
    else if (hour > 16 && hour <= 20) {
      backgroundIndex = 2
    }
    
    var backgroundImage = __BACKGROUND_IMAGES__[backgroundIndex]
    return (
      <div 
        style={styles.container}
        className="App">
        <BackgroundImage 
          contentStyle={{
            ...__COMPONENT_STYLES__.jumboContent,
            ...styles.content
          }}
          background={"url(" + backgroundImage + ")"}>
          <div style={styles.headerPane}>
            <br/>
          </div>

          <div style={styles.body}>
            <div style={{
              ...styles.paneLeft, 
              ...styles.pane
              }}>


            </div>
            <div style={{
              ...styles.paneRight, 
              ...styles.pane
              }}>

            </div>
            
          </div>

        </BackgroundImage>
      </div>
    );
  }
}



const styles = {

  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    display: 'flex',
    width: '100vw',
    height: '100vh'
  },
  pane: {
    padding: 10
  },
  secondPane: {
    margin: 10,

    flex: 1,
    display: 'flex',
    backgroundColor: White(0.0),
    minHeight: 400,
    justifyContent: 'center'
  },
  headerPane: {
    margin: 10,
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    backgroundColor: White(0.0),

  },
  paneLeft: {
    margin: 10,
    flexDirection: 'column',
    backgroundColor: White(0.0),
    display: 'flex',
    flex: 1
  },
  paneRight: {
    margin: 10,
    flexDirection: 'column',
    alignItems: 'flex-start',
    backgroundColor: White(0.0),
    display: 'flex',
    flex: 1
  },
  body: {
    backgroundColor: White(0.0),
    flex: 5,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    display: 'flex',
  },
  top: {

    flex: 3,
    alignItems: 'stretch',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    display: 'flex',
  },
  sidebar: {  
    flexDirection: 'column',
    flex: 1,
    alignItems: 'flex-start',
    minWidth: 300,
    display: 'flex',
  },
  mainbody: {
    flexDirection: 'column',
    flex: 4,
    display: 'flex', 

  },
  clockText: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginLeft: 80
  },
  scroll: {
    maxHeight: '70vh',
    flex: 1,
  },
  scrollContent: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
  cleanLink: {
    textDecoration: 'none'
  },
  whiteText: {
    color: 'white',
    textAlign: 'start'
  },
  content: {
    display: 'flex',
    flex: 1,
    alignItems: 'stretch',
  },
  hline: {
    backgroundColor: White(1),
    maxHeight: 1,
    flex: 2,
    width: 400
  }


}

export default App;
