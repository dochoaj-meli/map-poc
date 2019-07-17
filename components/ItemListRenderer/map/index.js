import React from 'react'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import { Popup } from 'react-leaflet'
import 'react-leaflet-markercluster/dist/styles.min.css'

import ActionableMarker from './ActionableMarker'
import './styles.scss'

function defaultRenderStrategy(item, selectedItem, markerContentRenderer) {
    return (
        <ActionableMarker key={item.id} position={[item.location.latitude, item.location.longitude]} open={item.id === selectedItem}>
            <Popup className="onmap-item">
                {markerContentRenderer(item)}
            </Popup>
        </ActionableMarker>
    )
}

function defaultMarkerContent(item) {
    return (
        <div className="onmap-item-description">
            <div className="onmap-item-description__item-attributes">
                <div className="onmap-item-description__item-attributes__price">
                    {item.price_context_message && (<small>{item.price_context_message}</small>)}
                    <span>
                        {item.price.currency_id} {item.price.amount}
                    </span>
                </div>
                <div className="onmap-item-description__item-attributes__title">
                    {item.title}
                </div>
                <div className="onmap-item-description__item-attributes__features">
                    <span>2 baños</span>
                    <span>1-3 dorms</span>
                    <span>55 - 98 m² útiles</span>
                </div>
            </div>
        </div>
    )
}

export default ({
        items, 
        selectedItem, 
        clusterize, 
        renderStrategy = defaultRenderStrategy,
        markerContentRenderer = defaultMarkerContent
    }) => {
        const markers = items.map((item) => {
            return renderStrategy(item, selectedItem, markerContentRenderer)
        })

        return clusterize ?
            <MarkerClusterGroup>
                {markers}
            </MarkerClusterGroup>
            : markers
    }