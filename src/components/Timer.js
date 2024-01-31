import { useEffect, useState } from "react";
import { BsFillPencilFill, BsFillTrashFill } from "react-icons/bs"; // Importing pencil and trash icons

const Timer = ({ updateTodo, deleteTodo }) => { // Destructuring props directly in the function parameters
    // State variables for seconds, minutes, hours, and timer start
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
    const restart = () => {
        setStart(prevStart => !prevStart); // Toggle 'start' state
    };

    return (
        <div>
            <div className="d-flex justify-content-between">
                {/* Displaying the timer */}
                <h3 className="mx-auto">{hours < 10 ? "0" + hours : hours}:{minutes < 10 ? "0" + minutes : minutes}:{seconds < 10 ? "0" + seconds : seconds}</h3>
                <div className="text-light">
                    {/* Buttons for editing and deleting todo */}
                    <BsFillPencilFill onClick={updateTodo} />
                    <BsFillTrashFill onClick={deleteTodo} />
                </div>
            </div>
            {/* Button to start/stop the timer */}
            <button className={`restart btn ${start ? "btn-primary" : "btn-success"}`} onClick={restart}>
                {start ? "Stop" : "Start"}
            </button>
        </div>
    );
}

export default Timer;
