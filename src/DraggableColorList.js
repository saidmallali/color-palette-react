import React from 'react'
import { SortableContainer } from "react-sortable-hoc"
import DraggableColorBox from './DraggableColorBox'

 function DraggableColorList({colors, deletBox}) {
    return (
        <div style={{height:"100%",}}>
            {
             colors.map((color, index) => <DraggableColorBox index={index} key={index} deletBox={() => deletBox(color.name)} name={color.name} color={color.color}/>)

            }
        </div>
    )
}

export default SortableContainer(DraggableColorList);