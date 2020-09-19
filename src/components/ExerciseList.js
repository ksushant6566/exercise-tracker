import React, { useState, useEffect } from "react";
import {Link} from "react-router-dom";
import axios  from "axios";


const Exercise = props => {
    return (
        <tr>
            <td>{props.exercise.username}</td>
            <td>{props.exercise.description}</td>
            <td>{props.exercise.duration}</td>
            <td>{props.exercise.date.substring(0, 10)}</td>
            <td>
                <Link to={"/edit" + props.exercise._id}>Edit</Link> | <a href="#" onClick={() => {props.deleteExercise(props.exercise._id) }}>delete</a>
            </td>
        </tr>
    )
}

function ExerciseList() {
    
    const [exercises, setExercises] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/exercises/")
            .then(response => setExercises(response.data))
            .catch(error => {console.log("erorr")});
    },[exercises] );

    const deleteExercise = (id)=> {
        axios.delete("http://localhost:5000/exercises/"+ id)
            .then(res => console.log(res.data));

    };

    const exerciseList = () => {
        return exercises.map( currentExercise => {
            return <Exercise exercise = {currentExercise} deleteExercise = {deleteExercise} key = {currentExercise._id} />;
        } )
    }
    
    return (
        <div>
            <h3>Logged Exercise</h3>
            <table className="table">
                <thead className = "thread-light">
                    <tr>
                        <th>Username</th>
                        <th>Description</th>
                        <th>Duration</th>
                        <th>date</th>
                        </tr>
                </thead>
                <tbody>
                    {exerciseList()}
                </tbody>
            </table>
        </div>
    )
}

export default ExerciseList;