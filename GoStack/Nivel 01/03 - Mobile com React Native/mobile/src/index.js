import React, { useEffect, useState } from 'react';
import { FlatList , Text, StyleSheet, StatusBar, SafeAreaView, TouchableOpacity} from 'react-native';

import api from '../services/api';

export default function App(){

    const [projects,setProjects] = useState([]);

    useEffect(() => {
        api.get('json').then(response => {
            setProjects(response.data);
            
        })
    },[]);

    async function handleAddProject(){
        const response = await api.post('json', {
            title: `Novo projeto ${Date.now()}`,
            owner: 'Ismael Roberto'
        })

        const project = response.data;

        setProjects([...projects,project])
    }


    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

            <SafeAreaView style={styles.container}>
                <FlatList 
                    //contentContainerStyle={styles.container}
                    data={projects}
                    keyExtractor={project => project.id}
                    renderItem={({ item: project}) => (
                        <Text style={styles.project}>{project.title}</Text>
                    )}
                /> 

                <TouchableOpacity activeOpacity={0.9} style={styles.button} onPress={handleAddProject}>
                    <Text style={styles.buttonText}>Adicionar novo Projeto</Text>
                </TouchableOpacity>
            </SafeAreaView>
            
        </>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#FF8C00',
        justifyContent: 'center',
        alignItems: 'center'
    },
    project: {
        color: '#FFF',
        fontSize: 32, 
        fontWeight: 'bold'       
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16
    }
})