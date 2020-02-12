import React from 'react';

// export default here
// simple component
export default (props) => {
    // props is the snake position array, coordinates [x,y]
    return (
        <g>
            {
                // map over the array and return many objects
                props.snakeDots.map((dot, i) => {
                //css style is pulled out
                const style = {
                    x: `${dot[0]}%`,
                    y: `${dot[1]}%`     
                }
                return (
                    <rect className="snake-dot" key={i} style={style}></rect>
                )
            })}
        </g>
    )
}