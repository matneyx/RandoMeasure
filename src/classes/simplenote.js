import Vex from 'vexflow';

export default class SimpleNote {
  constructor(isNote, duration){
    this.isNote = isNote;
    this.duration = duration;
    this.clef = 'percussion';
    this.notes = ['B/4'];
  }

  get isSimpleNote() { return true; }

  asStaveNote() {
    const noteMath = {
      4: 'w',
      2: 'h',
      1: 'q',
      0.5: '8'
    };

    const { StaveNote } = Vex.Flow;

    return new StaveNote({
      clef: this.clef,
      keys: this.notes,
      duration: noteMath[this.duration] + (!this.isNote ? 'r' : '')
    });
  }
}
