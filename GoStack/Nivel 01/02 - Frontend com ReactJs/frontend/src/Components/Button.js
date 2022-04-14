import React from 'react';

import { useState } from 'react';


export function Button(){

    let [counter,setCounter] = useState(0);

    function Counter(){
        setCounter(counter+1);
    }

        return (
        <>
            <li>{counter}</li>
            <li>
                <button type="button" onClick={Counter}>
                    Add Counter
                </button>
            </li>
        </>        
    );
    
}