import React, { Component } from 'react';
import Map from './map';
import NewMap from './newMap';
import MapMenu from './mapInfo';
import MapEditor from './mapEditor';

class MapCreator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      map: [],
      mapName: '',
      newMap: false,
      showMap: false,
      allMaps: [],
      addTile: {
        tree: false,
        bush: false,
        mountain: false,
        path: false,
        grass: false,
        rock: false,
      }
    }
  }

  componentDidMount() {
    const allMaps = JSON.parse(window.localStorage.getItem('maps'))
    if (allMaps) {
      this.setState({allMaps})
    }
  }

  handleTileSelect = (e) => {
    const addTile = {
      tree: false,
      bush: false,
      mountain: false,
      path: false,
      grass: false,
      rock: false,
    };
    addTile[e.target.getAttribute('name')] = true;
    console.log(addTile, e.target.getAttribute('name'))
    this.setState({addTile})
  }

  handleNewMapClick = () => {
    this.setState({newMap: true, showMap: false})
  }

  handleMapSelect = (e, map, name) => {
    e.preventDefault();
    this.setState({map, mapName: name, showMap: true, newMap:false})
  }

  createNewMap = (e, size, name) => {
    e.preventDefault()
    const mapGrid = []
    for (let i = 0; i < size[0]; i += 1) {
      let row = []
      for (let j = 0; j < size[1]; j += 1) {
        row.push({color: 'white', player: null, location: [i, j]})
      }
      mapGrid.push(row);
    }
    const maps = JSON.parse(window.localStorage.getItem('maps')) || {};
    maps[name] = {name, mapGrid};
    window.localStorage.setItem('maps', JSON.stringify(maps))
    this.setState({map: mapGrid, newMap: false, showMap: true, allMaps: maps, mapName: name})
  }

  render() {
    const { map, newMap, showMap, mapName, allMaps, addTile } = this.state;
    const showNewMap = newMap ? <NewMap createNewMap={this.createNewMap}/> : null;
    const mapDisplay = showMap ? <Map mapArr={map} name={mapName} /> : null;
    const showEdit = showMap ? <MapEditor handleTileSelect={this.handleTileSelect} addTile={addTile}/> : null;
    return (
      <div className="map-creator">
        <div className="button-container">
          <button onClick={() => this.handleNewMapClick()}>New Map</button>
          <button>Delete Map</button>
          <button>Clear Map</button>
          <button>Save Map</button>
        </div>
        <div className="main-container">
          <div className="map-menu-container">
            <MapMenu handleMapSelect={this.handleMapSelect} mapList={Object.values(allMaps)}/>
          </div>
          <div className="map-container">
            {mapDisplay}
            {showNewMap}
          </div>
          <div className="map-edit-container">
            {showEdit}
          </div>
        </div>
        <style jsx>{`
        button {
          font-size: 16px;
          margin: 5px;
          background-color: purple;
          color: white;
          border-radius: 5px;
        }
        .button-container {
          display: flex;
          justify-content: center;
        }
        .main-container {
          display: flex;
          width: 100%;
        }
        .map-edit-container {
          width: 20%;
          display: flex;
        }
        .map-menu-container {
          width: 20%;
        }
        .map-container {
          display: flex;
          justify-content: center;
          width: 80%
        }
        .map-creator {
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        }
        `}</style>
      </div>
    )
  }
}

export default MapCreator;