import React from 'react';
import { Button } from './Button';

export function Header(props){

    return(
        <header>
            <h1>Testando a componetização!</h1>
            <ul>
                <li>{props.list.title}</li>
                <li>{props.list.name}</li>
                <Button />                
            </ul>
        </header>
    );
}