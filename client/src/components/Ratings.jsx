import React, { useState } from 'react'
import { Rating } from 'react-simple-star-rating'

const Ratings = ({size,initialValue}) => {
    const [rating, setRating] = useState(0)
    const handleRating1 = (rate) => setRating(rate);
    return (
        <Rating
            onClick={handleRating1}
            size={size}
            SVGclassName="inline"
            transition
            allowFraction
            // showTooltip
            initialValue={initialValue}
        // tooltipArray={tooltipArray}
        // fillColorArray={fillColorArray}
        />
    )
}

export default Ratings