import React from "react"
import Parts from "./parts"

const Content= ({partList})=>{
    return(
        <div>
            <Parts partList={partList}/>
        </div>
    )
}

export default Content