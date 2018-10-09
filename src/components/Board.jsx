import React from 'react';
import '../css/Board.css';
import imgO from '../imgs/O.png';
import imgX from '../imgs/X.png';

const Board = ({board, makeTurn}) => (
  <table className="game__board">
    <tbody>
    {board.map((row,rowIndex) => (
      <tr key = {rowIndex}>
        {row.map((cell,colIndex) => {
          let cellState = null;
          if (cell===1) cellState = imgX;
          if (cell===2) cellState = imgO;
          return (
            <td
              key={colIndex}
              style={{backgroundImage: `url(${cellState})`}}
              className="game__board-cell"
              onClick={() => makeTurn(rowIndex,colIndex)}
            />
          )
        })}
      </tr>
      )
    )}
    </tbody>
  </table>
);

export default Board;
