import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ExerciseList from "./components/ExerciseList";
import EditExercise from "./components/EditExercise";
import CreateUser from "./components/CreateUser";
import CreateExercise from "./components/CreateExercise";


function App() {
  return (
    <Router>
    <div className="container">
      <Navbar />
      <br/>
      <Route path="/" exact component= {ExerciseList} />
      <Route path="/edit:id" component= {EditExercise} />
      <Route path="/create" component= {CreateExercise} />
      <Route path="/user" component= {CreateUser} />
    </div>
    </Router>
  );
}

export default App;
