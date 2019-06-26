import React from "react"
import Part from "./part"

const Content= ({partList})=>{
    const parts= partList.map((part)=>{
        return <Part key={part.id} part={part}/>
    })
    return(
        <div>
            {parts}
        </div>
    )
}

export default Content