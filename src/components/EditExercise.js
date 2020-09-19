import React, { useEffect , useState} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import axios from "axios";


function EditExercise(props) {
    
    const [username, setUsername] = useState("");
    const [description, setDescription] = useState("");
    const [duration, setDuration] = useState(0);
    const [date, setDate] = useState(new Date());
    const [users, setUsers] = useState([]);

    const onSubmit = (e)=> {
        e.preventDefault();

        const exercise = {
            username: username,
            description: description,
            duration: duration,
            date: date
        }

        console.log(exercise);
        axios.post("http://localhost:5000/exercises/update/" + props.match.params.id, exercise)
            .then(res => console.log(res.data));

        window.location = '/';
    };

    const onChangeUsername = (e) => {
        setUsername(e.target.value);
    };
    
    const onChangeDescription = (e) => {
        setDescription(e.target.value);
    };

    const onChangeDuration = (e) => {
        setDuration(e.target.value);
    };

    const onChangeDate = (date) => {
        setDate(date);
    };

    useEffect(()=> {

        axios.get("http://localhost:5000/exercises/" + props.match.params.id)
            .then(response => {
                setUsername(response.data.username);
                setDate(new Date(response.data.date));
                setDescription(response.data.description);
                setDuration(response.data.duration);
            })
            .catch(error => console.log("error"));

        axios.get("http://localhost:5000/users/")
            .then(response => {
                if(response.data.length > 0) {
                    setUsers(response.data.map(user => user.username));
                }
            })
    },[]);

    return(
        <div>
            <h3>Edit Exercise Log</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <select 
                        required
                        className="form-control"
                        value={username}
                        onChange={onChangeUsername}>
                    {
                        users.map(user => {
                            return <option
                            key={user}
                            value= {user} > {user} 
                            </option>;
                        })
                    }    
                    </select>
                </div>
                <div className="form-group">
                    <label>Description: </label>
                    <input 
                        type="text"
                        required
                        className="from-control"
                        value={description}
                        onChange={onChangeDescription}
                        />
                </div>
                <div className="form-group">
                    <label>Duration (in minutes): </label>
                    <input 
                        type="text"
                        className="from-control"
                        value={duration}
                        onChange={onChangeDuration}
                        />
                </div>
                <div className="form-group">
                    <label>Date: </label>
                    <div>
                        <DatePicker
                            selected={date}
                            onChange={onChangeDate}
                            />
                    </div>
                </div>

                <div className="form-group">
                    <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
                </div>
            </form>
        </div>
    )
}

export default EditExercise;