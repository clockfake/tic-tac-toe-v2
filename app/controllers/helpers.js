const maxRows = 24;
const maxCols = 24;

export default (board,check_row,check_col) => {
	for (let i=0;i<5;i++) {
  	let c1;
    let c2;
    let c3;
    let c4;
    let c5;
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
    c1=board[check_row-4+i][check_col];
    c2=board[check_row-3+i][check_col];
    c3=board[check_row-2+i][check_col];
    c4=board[check_row-1+i][check_col];
    c5=board[+check_row+i][check_col];
    	if (wincondition(c1,c2,c3,c4,c5)) return true;
    }

    //diagonal right down check
    if((check_row-4+i>=0) && (+check_row+i<maxRows) && (check_col-4+i>=0) && (+check_col+i<maxCols)) {
    c1=board[check_row-4+i][check_col-4+i];
    c2=board[check_row-3+i][check_col-3+i];
    c3=board[check_row-2+i][check_col-2+i];
    c4=board[check_row-1+i][check_col-1+i];
    c5=board[+check_row+i][+check_col+i];
  	 if (wincondition(c1,c2,c3,c4,c5)) return true;
    }

    //diagonal right up check
    if((+check_row+4-i<maxRows) && (check_row-i>=0) && (check_col-4+i>=0) && (+check_col+i<maxCols)) {
    c1=board[+check_row+4-i][check_col-4+i];
    c2=board[+check_row+3-i][check_col-3+i];
    c3=board[+check_row+2-i][check_col-2+i];
    c4=board[+check_row+1-i][check_col-1+i];
    c5=board[check_row-i][+check_col+i];
  	 if (wincondition(c1,c2,c3,c4,c5)) return true;
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
