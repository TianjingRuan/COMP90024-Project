import React, {useState, useEffect} from "react";

function Test(props) {
    const [query, setQuery] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/scenario/language")
        .then(data => data.json(data))
        .then(data => setQuery(data));
    }, []);


    return (
        <div>
        <h3>hi</h3>
        <p>-------------------------</p>
        {query.map(q => 
        <p key={q.name}> {q.name} : {q.value}</p>)}
    </div>
    );
}

export default Test;
