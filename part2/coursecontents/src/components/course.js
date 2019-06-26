import React from "react"
import Header from "./header"
import Content from "./content"
import Sum from "./sum"

const Course= ({course})=>{
    return(
        <>
            <Header name={course.name} />
            <Content partList={course.parts} />
            <Sum partList={course.parts} />
        </>
    )
}

export default Course