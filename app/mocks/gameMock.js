export default class gameMock {
  generateArrays() {
    let arr = [];
    for (let i = 0; i<24; i++) {
      const row = new Array(24).fill(0);
      arr.push(row);
    }
    return arr;
  }

  constructor() {
    this.board=this.generateArrays();
    this.status = 'hosted';
    this.currentTurn = false;
    this.playerX = null;
    this.playerO = null;
    this._id = '101';
  }

  save() {
    return null;
  }
}
