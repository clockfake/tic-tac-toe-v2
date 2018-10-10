import React from 'react';
import '../css/Board.css';
import imgO from '../imgs/O.png';
import imgX from '../imgs/X.png';

const Board = ({board, makeTurn}) => (
  <table className="game__board">
    <tbody className="game__table">
    {board.map((row,rowIndex) => (
      <tr key = {rowIndex}>
        {row.map((cell,colIndex) => (
            <td
              key={colIndex}
              style={{backgroundImage: `url(${cell === 1 ? imgX : cell === 2 ? imgO : ''})`}}
              className="game__board-cell"
              onClick={() => makeTurn(rowIndex,colIndex)}
            />
          )
        )}
      </tr>
      )
    )}
    </tbody>
  </table>
);

export default Board;
