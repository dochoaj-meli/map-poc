import React from 'react'

import ItemListRenderer from './ItemListRenderer'

export default ({ items, setSelectedItem }) => {
    return (
        <div className="list-container">
            <ItemListRenderer.List items={items} onItemInteraction={setSelectedItem} />
        </div>
    )
}