import React from "react"

const Parts= ({partList})=>{
    return partList.map((part) => {
        return (
            <p key={part.id}>
                {part.name} {part.exercises}
            </p>
        )
    })
}

export default Parts