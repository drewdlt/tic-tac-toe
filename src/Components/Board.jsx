import { useState } from "react";
import Square from "./Square";

function Board({ currTurn, squares, onPlay }) {

    const handleClick = (i) => {
        if (squares[i] || calulateWinner(squares)) {
            return;
        }
        const nextSquares = [...squares];
        nextSquares[i] = currTurn;
        onPlay(nextSquares);
    };

    const winner = calulateWinner(squares);
    let status;
    if (winner) {
        status = "Winner: " + winner;
    }
    else {
        status = "Next player: " + currTurn;
    };

    let rows = [0, 1, 2];

    return (
        <>
            <h1>{status}</h1>  
            {
                [0, 1, 2].map(row => {
                    return (
                        <div key={row} className="board-row">
                        {
                            [0, 1, 2].map(col => {
                                const index = row * 3 + col;
                                return (
                                    <Square 
                                        key={index}
                                        value={squares[index]}
                                        onSquareClick={() => handleClick(index)}
                                    />
                                );
                            })
                        }
                        </div>
                    );
                })
            }   
        </>
    );
}

const calulateWinner = (squares) => {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] == squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

export default Board;