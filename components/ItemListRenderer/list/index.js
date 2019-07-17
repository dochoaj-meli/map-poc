import React from 'react'

import './styles.scss'

function defaultRenderStrategy(item, onItemInteraction, itemContentRenderer) {
    return (
        <div className="onlist-item" key={item.id}>
            {itemContentRenderer(item, onItemInteraction)}
        </div>
    )
}

function defaultItemContent(item, onItemInteraction) {
    return (
        <div className="onlist-item-description"
            onMouseEnter={() => onItemInteraction(item)}
            onMouseLeave={() => onItemInteraction(null)}
        >
            <div className="onlist-item-description__item-image">
                <img src={item.pictures.stack.normal} {...item.pictures.tags} />
            </div>
            <div className="onlist-item-description__item-attributes">
                <div className="onlist-item-description__item-attributes__price">
                    {item.price_context_message && (<small>{item.price_context_message}</small>)}
                    <span>
                        {item.price.currency_id} {item.price.amount}
                    </span>
                </div>
                <div className="onlist-item-description__item-attributes__title">
                    {item.title}
                </div>
                <div className="onlist-item-description__item-attributes__features">
                    <span>2 baños</span>
                    <span>1-3 dorms</span>
                    <span>55 - 98 m² útiles</span>
                </div>
            </div>
        </div>
    )
}

export default ({ items, onItemInteraction, renderStrategy = defaultRenderStrategy, itemContentRenderer = defaultItemContent }) => {
    return items.map((item) => {
        return renderStrategy(item, onItemInteraction, itemContentRenderer)
    })
}