import { useEffect, useState } from "react"
import { BsFillPencilFill } from "react-icons/bs";
import { BsFillTrashFill } from "react-icons/bs";

const Timer = (props) =>{
    const [sec, setSec] =  useState(0)
    const [min, setMin] =  useState(0)
    const [hr, setHr] =  useState(0)
    const [start, setStart] =  useState(false)
    useEffect(() =>{
        let timer;
        if(start){
            timer = setInterval(() => {
                setSec(sec + 1);

                if(sec === 59){
                    setMin(min + 1);
                    setSec(0)
                }
                if(min === 59){
                    setHr(hr + 1);
                    setMin(0)
                }    
            }, 1000);
        }else{
            clearInterval(timer)
        }
        return () =>clearInterval(timer)
    })

    const restart = () =>{
        setStart(!start)
    }
    return (
        <div>
            <div className="d-flex justify-content-between">
                <h3 className="mx-auto">{hr<10? "0" +hr:hr}:{min<10? "0" +min:min}:{sec<10? "0" +sec:sec}</h3>
                <div className="text-light">
                <BsFillPencilFill onClick={props.updateTodo} />
                <BsFillTrashFill onClick={props.deleteTodo}/>
                
                </div>
            </div>
            {!start? ( <button className="restart btn btn-success " onClick={restart}>Start</button>):( <button className="restart btn btn-primary" onClick={restart}>Stop</button>)}
           
        </div>
    )
}

export default Timer