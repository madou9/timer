import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs";

const Timer = ({ updateTodo, deleteTodo }) => {
    // State variables for hours, minutes, seconds, and timer start
    const [seconds, setSeconds] = useState(0);
    const [minutes, setMinutes] = useState(0);
    const [hours, setHours] = useState(0);
    const [start, setStart] = useState(false);

    // Effect to update timer
    useEffect(() => {
        let timer;
        if (start) {
            timer = setInterval(() => {
                // Update seconds
                setSeconds(sec => {
                    if (sec === 59) {
                        // If seconds reach 59, reset to 0 and increment minutes
                        setMinutes(min => {
                            if (min === 59) {
                                // If minutes reach 59, reset to 0 and increment hours
                                setHours(hr => hr + 1);
                                return 0;
                            }
                            return min + 1;
                        });
                        return 0;
                    }
                    return sec + 1;
                });
            }, 1000);
        } else {
            clearInterval(timer);
        }
        return () => clearInterval(timer); // Cleanup function to clear interval
    }, [start]); // Dependency array to ensure effect runs when 'start' changes

    // Function to toggle timer start/stop
    const toggleTimer = () => {
        setStart(prevStart => !prevStart); // Toggle 'start' state
    };

    return (
        <section className="timer-container mt-5">
            <div className="d-flex justify-content-between">
                {/* Displaying the timer */}
                <h3 className="timer-display mx-auto">{hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h3>
            </div>
            <div className="timer-controls text-light row mx-auto">
                {/* Buttons for editing and deleting todo */}
                <button className="timer-edit-btn" aria-label="Edit" onClick={updateTodo}><BsFillPencilFill /></button>
                <button className="timer-delete-btn" aria-label="Delete" onClick={deleteTodo}><BsFillTrashFill /></button>
            </div>
            {/* Button to start/stop the timer */}
            <button className={`timer-toggle-btn btn ${start ? "btn-primary" : "btn-success"}`} onClick={toggleTimer}>
                {start ? "Stop" : "Start"}
            </button>
        </section>
    );
}

export default Timer;
