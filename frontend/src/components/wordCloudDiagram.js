import React from "react";
import wordData from "../data/sampleData/sampleWordCloud.json";
import { TagCloud } from 'react-tagcloud'

export default function WordCloudDiagram() {
    return <TagCloud
        minSize={12}
        maxSize={100}
        tags={wordData}
    />
}