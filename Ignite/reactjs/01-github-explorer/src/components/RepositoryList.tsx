import { RepositoryItem } from "./RepositoryItem";
import { useEffect, useState } from "react";

import '../styles/repositories.scss';

interface Repository {
    name: string;
    description: string;
    html_url: string;
}

export function RepositoryList(){

    const [repositories,setRepositories] = useState<Repository[]>([]);

    //vamos utilizar o setEffect para consumir a api e manipular o repostories

    useEffect(() => {
        fetch('https://api.github.com/orgs/rocketseat/repos') //<-acessando repositorio
        .then(response => response.json()) // <- transforma a resposta da api em json
        .then(data => setRepositories(data)) // <- depois de receber toda resposta em JSON, guarda os dados
    } ,[]);

    console.log(repositories); //verifica o resultado


    return(
        <section className="repository-list">
            
            <h1>Lista de repositórios</h1>

            {   //para escrevermos java script precisamos colocar o codigo dentro de chaves
                repositories.map(repository => {
                return <RepositoryItem key={repository.name} repository = {repository}/>
            })}
                        
        </section>
    );
}