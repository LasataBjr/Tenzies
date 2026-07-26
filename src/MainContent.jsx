import Die from "./components/Die";

import { useState } from "react";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function MainContent() {
    // Initialize state with safely generated dice ;Runs on load ONLY. Completely ignored on future clicks/rolls:

    const [dice, setDice] = useState(() => generateAllNewDice()); //Lazy State : passing a func as a callback wrapper, without executing it immediately into useState instead of a direct value

    const buttonRef = useRef(null);
    //DERIVED STATE: Calculated automatically on EVERY render loop
    // const firstValue = dice[0].value;
    // const allHeld = dice.every(die => die.isHeld);
    // const allSameValue = dice.every(die => die.value === firstValue);

    //If all are held AND all values match, gameWon is true!
    const gameWon = dice.every(die => die.isHeld) && 
        dice.every(die => die.value === dice[0].value)
 
    useEffect(() => {
        if (gameWon) {
            buttonRef.current.focus()
        }
    }, [gameWon]);

    function generateAllNewDice() {
        // const newDice = [];
        // for (let i = 0; i < 10; i++){
        //     //Math.floor(Math.random() * total_possible_numbers) + starting_number;
        //     const randNum = Math.floor(Math.random() * 6);
        //     newDice.push(randNum);
        // }
        // return newDice;

        //builds the array of 10 random numbers 
        return new Array(10)
            .fill(0)
            .map(() => ({
                        value: Math.ceil(Math.random() * 6),
                        isHeld: false,
                        id: nanoid()
                    })
                )
    }
    // console.log(generateAllNewDice());

    //Roll only the unheld dice
    function rollDice() {
        if(!gameWon) {
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ?
                    die :
                    {...die, value : Math.ceil(Math.random() * 6)}
            }))
        } else {
            setDice(generateAllNewDice())
        }            
    }

     // Updating the hold value
    function hold(id) {       
        setDice(prevDice => prevDice.map(die => {
            return die.id === id ?
                { ...die, isHeld: !die.isHeld } :
                die
        }))
    }
    
    // Map state obj to component to give it "memory" by tracking multiple info at once
    const diceElements = dice.map(dieObj => (
        <Die
            key={dieObj.id}
            value={dieObj.value}
            isHeld={dieObj.isHeld}
            hold={() => hold(dieObj.id)}            
        />)
    )


    return (
        <main className="bg-[#F5F5F5] h-full rounded-[5px] flex flex-col justify-evenly items-center ">
            {gameWon && <Confetti />}
            <div aria-live="polite" className="absolute w-px h-px p-0 -m-px overflow-hidden [clip:rect(0,0,0,0)] whitespace-nowrap border-0">
                {gameWon && <p>Congratulations! You won! Press "New Game" to start again.</p>}
            </div>

            <h1 className="font-bold text-3xl">Tenzies</h1>
            <p className="font-semibold text-center text-sm px-5">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>

            <div className="grid grid-cols-5 gap-5">
                {diceElements}               
            </div>

            <button
                className="h-[50px] whitespace-nowrap w-auto py-[6px] px-[21px] border-0 rounded-[6px] bg-[#5035FF] text-white text-[1.2rem] font-semibold"
                onClick={rollDice}
                ref={buttonRef}
            >
                {gameWon ? "New Game" : "Roll"}
            </button>
        </main>
    )
}