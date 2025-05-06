import React, { useEffect } from 'react'

export default function Score( {winner, winnerPlayer, playerNames, score, onGameOver} ) {

    return (
        <>
        {winner === 'draw' && <p>¡Empate!</p>}
        {winner && winner !== 'draw' && <p>Ganó el jugador: {winnerPlayer}</p>}
        {!winner && <p>Esperando resultado...</p>}
        <table className='score-table'>
            <thead>
                <tr className='score-table-score'>
                    <th>Player Name</th>
                    <th>Wins</th>
                    <th>Draws</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td className='player-table-name'>{playerNames.x}</td>
                    <td>{score.x}</td>
                    <td>{score.draw}</td>
                </tr>
                <tr>
                    <td className='player-table-name'>{playerNames.o} </td>
                    <td>{score.o}</td>
                    <td>{score.draw} </td>
                </tr>
            </tbody>
        </table>
        <button onClick={onGameOver}>GAME OVER</button>

        </>
    )
}
