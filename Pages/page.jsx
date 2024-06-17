import { useNavigate } from "react-router-dom";

function page(){
    const nav=useNavigate();
    return (
        <div>
            <button onClick={()=>nav("/")}>Navigate</button>
        </div>
    )
}