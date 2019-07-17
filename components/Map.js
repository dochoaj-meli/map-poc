import React from 'react'
import { Map as LeafletMap, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';

import ItemListRenderer from './ItemListRenderer'

// LEAFLET CONFIG

import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default class Map extends React.PureComponent {
    onPopupOpen = ({ popup }) => {
        console.log('Popup open!', popup)
    }
  
    render() {
        const { viewport, maxZoom, items, selectedItem, clusterize, onViewportChanged } = this.props
        console.log('Map viewport', this.props.viewport)
        return (
            <div className="map-container">
                <LeafletMap onViewportChanged={onViewportChanged} viewport={viewport} maxZoom={maxZoom} onpopupopen={this.onPopupOpen}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        prefix=''
                        url='https://{s}.tile.osm.org/{z}/{x}/{y}.png'
                    />
                    <ItemListRenderer.Map items={items} selectedItem={selectedItem} clusterize={clusterize}/>
                </LeafletMap>
            </div>
        );
    }
}