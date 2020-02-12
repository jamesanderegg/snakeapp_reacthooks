import React from 'react';

// export default here
// simple component
export default (props) => {
    //prop is food position coordinates [x,y]

    //css style is pulled out and made a variable
    const style = {
        x: `${props.dot[0]}%`,
        y: `${props.dot[1]}%`
    }
    //"snake-food" is in index css and style variable is passed in
    return (
        <rect className="snake-food" style={style}></rect>
    )
}