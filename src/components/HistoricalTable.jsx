import { useState , useEffect} from "react"

export default function HistorialTable({history} ){

  
    return ( 
        
        <table className='historical-table'>
            <thead>
                <tr className='score-historical-table'>
                    <th>Date</th>
                    <th>Player 1</th>
                    <th>Player 2</th>
                    <th>Winner</th>
                    <th>Quantity</th>
                </tr>
            </thead>
            <tbody className="historical-table-body">
                {history.map( (game , index ) => (
                <tr key = {index}>
                    <td>{game.date}</td>
                    <td>{game.playerNames.x}</td>
                    <td>{game.playerNames.o}</td>
                    <td>{game.winnerName}</td>
                    <td>{game.score.x} - {game.score.o}</td>
                </tr>
                ))}             
            </tbody>
        </table>
        
    )

}