import React from 'react'

const FilterForm = (props) => {
    return(
        <form>
            filter shown with<input value={props.nameFilter} onChange={props.handleNameFilterChange}/>
        </form>
    )
}

export default FilterForm