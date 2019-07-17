import React, { useRef, useEffect } from 'react'
import { Marker } from 'react-leaflet'
import 'react-leaflet-markercluster/dist/styles.min.css'

export default (props) => {
    const markerRef = useRef(null)
    const { position, children, open } = props

    useEffect(() => {
        const el = markerRef.current.leafletElement
    
        if (open) {
            el.openPopup()
        } else {
            if (el.isPopupOpen()) {
                el.closePopup()
            }
        }
      }, [open])

    return (
        <Marker ref={markerRef} position={position}>
            {children}
        </Marker>
    )
}