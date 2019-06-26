import React from 'react'

const Sum= ({partList})=>{
    const sum= partList.reduce((accumulator,part)=> part.exercises + accumulator,0
    )
    return(
        <p style={{fontWeight:'bold'}}>
            total of {sum} exercises
        </p>
    )
}
export default Sum