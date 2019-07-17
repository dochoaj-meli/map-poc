import React from 'react'

import Api from '../api' 
import Map from './Map'
import List from './List'

const DEFAULT_VIEWPORT = {
    center: [-33.48, -70.74],
    zoom: 13,
  }

export default class GeographicSearch extends React.PureComponent {
    static defaultProps = {
        changeMapCenterOnItemSelection: false,
        groupNearItems: true,
    }

    constructor() {
        super()
        this.state = {
            mapCenter: [-33.48, -70.74],
            curZoom: 13,
            loading: true,
            items: [],
            maxZoom: 22,
            selectedItem: null,
            viewport: DEFAULT_VIEWPORT,
        }
    }

    componentWillMount() {
        Api.fetchItems()
            .then((items) => {
                this.setState({
                    loading: false,
                    items
                })
            })
    }

    setSelectedItem = (item) => {
        if (!item) {
            return this.setState({ selectedItem: null })
        }

        console.log('Selected item!', item)
        let mapCenter = this.state.mapCenter

        if (this.props.changeMapCenterOnItemSelection) {
            if (Object.keys(item.location).includes('latitude') && Object.keys(item.location).includes('longitude')) {
                mapCenter = [item.location.latitude, item.location.longitude]
                console.log('Map center changed to:', mapCenter)
            }
        }

        this.setState({ selectedItem: item.id, mapCenter })
    }

    onViewportChanged = (viewport) => {
        this.setState({ viewport, pendingFetch: true })
    }

    render() {
        if (this.state.loading) {
            return null
        }

        const { viewport, maxZoom, items, selectedItem } = this.state

        return (
            <div className="geo-search">
                <List items={items} setSelectedItem={this.setSelectedItem} />
                <Map
                    viewport={viewport}
                    maxZoom={maxZoom}
                    items={items}
                    onViewportChanged={this.onViewportChanged}
                    selectedItem={selectedItem}
                    clusterize={this.props.groupNearItems}
                />
            </div>
        )
    }
}