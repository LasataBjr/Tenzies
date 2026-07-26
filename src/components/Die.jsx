//10 Dice

export default function Die(props) {   
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "#FFFFFF"
    }
    return (
        <button
            style={styles}
            onClick={props.hold}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.value}, 
            ${props.isHeld ? "held" : "not held"}`}
            className="h-[50px] w-[50px] shadow-[0px_2px_2px_rgba(0,0,0,0.15)] rounded-[10px] border-none bg-white text-[1.75rem] font-bold cursor-pointer">
           {props.value} 
        </button>
    )
}