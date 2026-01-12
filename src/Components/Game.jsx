import { useState } from "react";
import Board from "./Board";

function Game() {
    const [currTurn, setCurrTurn] = useState('X');
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currMove, setCurrMove] = useState(0);
    const currentSquares = history[currMove];

    const handlePlay = (nextSquares) => {
        const nextHistory = [...history.splice(0, currMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrMove(nextHistory.length - 1);
        setCurrTurn(currTurn === 'X' ? 'O' : 'X');
    };

    const jumpToMove = (nextMove) => {
        setCurrMove(nextMove);
        setCurrTurn(nextMove % 2 === 0 ? 'X' : 'O');
    };

    const moves = history.map((squares, move) => {
        let description;
        if (move > 0) {
            description = 'Go to move #' + move;
        }
        else {
            description = 'Go to game start';
        }
        return (
            <li key={move} className="history-list-item">
                <button onClick={() => jumpToMove(move)}>{description}</button>
            </li>
        )
    });

    return (
        <div className="game">
            <div className="game-board">
                <Board currTurn={currTurn} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>
                    {moves}
                </ol>
            </div>
        </div>
    );
}

export default Game;