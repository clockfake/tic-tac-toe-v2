const maxRows = 24;
const maxCols = 24;

export default (board,check_row,check_col) => {
	for (let i=0;i<5;i++) {
  	//horisontal check
    if((check_col-4+i>=0) && (+check_col+i<maxCols)) {
  	 if (wincondition(board[check_row][+check_col-4+i],
			 board[check_row][+check_col-3+i],
			 board[check_row][+check_col-2+i],
			 board[check_row][+check_col-1+i],
			 board[check_row][+check_col+i]
		 )) return true;
     }

    //vertical check
    if((check_row-4+i>=0) && (+check_row+i<maxRows)) {
    	if (wincondition(
				board[check_row-4+i][check_col],
				board[check_row-3+i][check_col],
				board[check_row-2+i][check_col],
				board[check_row-1+i][check_col],
				board[+check_row+i][check_col])) return true;
    }

    //diagonal right down check
    if((check_row-4+i>=0) && (+check_row+i<maxRows) && (check_col-4+i>=0) && (+check_col+i<maxCols)) {
  	 if (wincondition(
			 board[check_row-4+i][check_col-4+i],
			 board[check_row-3+i][check_col-3+i],
			 board[check_row-2+i][check_col-2+i],
			 board[check_row-1+i][check_col-1+i],
			 board[+check_row+i][+check_col+i])) return true;
    }

    //diagonal right up check
    if((+check_row+4-i<maxRows) && (check_row-i>=0) && (check_col-4+i>=0) && (+check_col+i<maxCols)) {
  	 if (wincondition(
			 board[+check_row+4-i][check_col-4+i],
			 board[+check_row+3-i][check_col-3+i],
			 board[+check_row+2-i][check_col-2+i],
			 board[+check_row+1-i][check_col-1+i],
			 board[check_row-i][+check_col+i])) return true;
    }
  }
  return false;
}

const wincondition = (cell1,cell2,cell3,cell4,cell5) => (
  (cell1 == cell2) &&
  (cell1 == cell3) &&
  (cell1 == cell4) &&
  (cell1 == cell5)
);
