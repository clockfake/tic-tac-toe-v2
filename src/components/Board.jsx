import React from 'react';
import '../css/board.scss';
import imgO from '../imgs/O.png';
import imgX from '../imgs/X.png';

const Board = ({board, makeTurn}) => (
  <table className="game__board">
    <tbody>
    {board.map((row,rowIndex) => (
      <tr key = {rowIndex}>
        {row.map((j,colIndex) => {
          let cellState = null;
          if (j==1) cellState = imgX;
          if (j==2) cellState = imgO;
          return (
            <td key={colIndex} style={{backgroundImage: cellState}} className="game__board-cell" onClick={() => makeTurn(rowIndex,colIndex)}></td>
          )
        })}
      </tr>
      )
    )}
    </tbody>
  </table>
);

export default Board;
