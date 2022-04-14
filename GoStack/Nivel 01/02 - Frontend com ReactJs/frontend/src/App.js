import React, {useState, useEffect} from 'react';

//import { Header } from './Components/Header';

import './App.css';

import api from './services/api';


export function App(){

    const [projects, setProjects] = useState([]);

    useEffect(() => {
        api.get('json').then(response => {
            setProjects(response.data);            
        })
    },[projects]);

    

    
    async function handleAddProject(){
        
        const response = await api.post('json', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Ismael Skywalker'
        });

        const project = response.data;

        setProjects([...projects,project]);
    }

    async function handleUpdateProject(){

        const id = '33c9641b-4e8c-4cea-903c-4b402c94fff3'
        
        const response = await api.put(`json/${id}`, {
            id: 'bedb2337-c3af-4f4c-b222-16752279d9e1',
            title: 'Curso Ignite Big master',
            owner: 'Ismael Roberto'
        })

        const projectIndex = projects.findIndex(project => project.id === id);


       projects[projectIndex] = response.data;
        
       setProjects(projects);    

        
    }

    async function handleRemoveProject(){

        const id = '33c9641b-4e8c-4cea-903c-4b402c94fff3'
        
        const response = await api.delete(`json/${id}`);

        const projectIndex = projects.findIndex(project => project.id === id);


        projects.splice(projectIndex,1);
        
        setProjects(projects);
        
       
    }

    
    return (
        <>
        {
            projects.map(project => 
                <ul key={project.id}>
                    <li>{project.title}</li>
                    <li>{project.owner}</li>
                </ul>)
        }
           
        <ul>
            <li>
                <button type="button" onClick={handleAddProject}>
                    Add Project
                </button>
            </li>
            <li>
                <button type="button" onClick={handleUpdateProject}>
                    Update Project
                </button>
            </li>
            <li>
                <button type="button" onClick={handleRemoveProject}>
                    Remove Project
                </button>
            </li>
        </ul>
        
        </>
       
    )
}