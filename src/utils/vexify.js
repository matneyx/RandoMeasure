import SimpleNote from '../classes/simplenote';

export const vexify = input => {
  if(Array.isArray(input)) {
    let noteArray;

    if(input[0].isSimpleNote) {
      noteArray = input;
    } else {
      noteArray = convertBoolArrayToSimpleNoteArray(input);
    }

    const noteArrayWithCombinedRests = combineRests(noteArray);

    let returnArray = [];
    noteArrayWithCombinedRests.forEach(note => returnArray.push(vexify(note)));
    return returnArray;
  }

  if(input.isSimpleNote) {
    return input.asStaveNote();
  }

  return new SimpleNote(input, 0.5)
    .asStaveNote();
};

const combineRests = input => {
  if(!Array.isArray(input)
    || !input[0].isSimpleNote) return;

  let returnArray = [];

  for(let i = 0; i < input.length; i++) {

    if(!input[i].isNote) {
      let j = i + 1;

      while(input.length !== 1
        && j < input.length
        && !input[j].isNote) {
        input[i].duration = input[i].duration + input[j].duration;

        input.splice(j, 1);
      }
    }

    returnArray.push(input[i]);
  }

  return returnArray;
}

export const convertBoolArrayToSimpleNoteArray = input => {
  if(!Array.isArray(input)) return;

  let returnArray = [];

  input.forEach(bool => returnArray.push(convertBoolToSimpleNote(bool)));

  return returnArray;
}

export const convertBoolToSimpleNote = bool =>  new SimpleNote(bool, 0.5);
