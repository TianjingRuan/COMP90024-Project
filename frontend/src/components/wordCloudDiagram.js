import React from "react";
import { TagCloud } from 'react-tagcloud'

export default function WordCloudDiagram(props) {
    return (
        <div>
            <TagCloud minSize={12} maxSize={35} tags={props.wordData} />
            <h5>{props.time}</h5>
        </div>
        )
}