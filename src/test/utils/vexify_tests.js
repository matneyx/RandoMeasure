import { expect } from 'chai';
import Vex from 'vexflow';
import {
  vexify,
  convertBoolArrayToSimpleNoteArray,
  convertBoolToSimpleNote } from '../../utils/vexify';
import SimpleNote from '../../classes/simplenote';

describe('vexify.js', () => {
  describe("convertBoolToSimpleNote", () => {
    it("converts false bool to 8th rest", () => {
      const result = convertBoolToSimpleNote(false);

      expect(result.isNote).to.equal(false);
      expect(result.duration).to.equal(0.5);
    });

    it("converts true bool to 8th note", () => {
      var result = convertBoolToSimpleNote(true);

      expect(result.isNote).to.equal(true);
      expect(result.duration).to.equal(0.5);
    });
  });

  describe('convertBoolArrayToSimpleNoteArray', () => {
    it('converts bool array to simpleNote array', () => {
      const result = convertBoolArrayToSimpleNoteArray([true, true]);

      expect(result.length).to.equal(2);

      result.forEach(simpleNote => {
        expect(simpleNote.isNote).to.equal(true);
        expect(simpleNote.duration).to.equal(0.5);
      })
    });
  });

  describe("vexify", () => {
    const {StaveNote} = Vex.Flow;

    const compareNotes = (note1, note2) => {
      expect(note1.clef).to.equal(note2.clef);
      expect(note1.keys).to.deep.equal(note2.keys);
      expect(note1.duration).to.equal(note2.duration);
      expect(note1.noteType).to.equal(note2.noteType);
    };

    const rest = new StaveNote({
      clef: "percussion",
      keys: ["B/4"],
      duration: "8r"
    });

    const quarterRest = new StaveNote({
      clef: "percussion",
      keys: ["B/4"],
      duration: "qr"
    });

    const halfRest = new StaveNote({
      clef: "percussion",
      keys: ["B/4"],
      duration: "hr"
    });

    const note = new StaveNote({
      clef: "percussion",
      keys: ["B/4"],
      duration: "8"
    });

    it("converts true bool to note output", () => {
      const result = vexify(true);

      compareNotes(result, note);
    });

    it("converts false bool to rest output", () => {
      const result = vexify(false);

      compareNotes(result, rest);
    });

    it("converts array of true bools to array of notes", () => {
      const expected = new Array(8).fill(note);

      const result = vexify(new Array(8).fill(true));

      expect(result.length).to.equal(8);

      for(let i = 0; i < result.length; i++) {
        compareNotes(result[i], expected[i]);
      }
    });

    it("converts array of two false bools to array with single quarter rest", () => {
      const expected = new Array(1).fill(quarterRest);

      const result = vexify(new Array(2).fill(false));

      expect(result.length).to.equal(1);

      for(let i = 0; i < result.length; i++) {
        compareNotes(result[i], expected[i]);
      }
    });

    it("converts array of alternating false/true bools a proper skank (rest, note, rest, note, etc.)", () => {
      const expected = [ rest, note, rest, note, rest, note, rest, note ];

      const result = vexify([false, true,false, true,false, true,false, true]);

      expect(result.length).to.equal(8);

      for(let i = 0; i < result.length; i++) {
        compareNotes(result[i], expected[i]);
      }
    });

    it("converts two consecutive 8th rests into a quarter rest", () => {
      const result = vexify([false, false]);

      expect(result.length).to.equal(1);

      compareNotes(result[0], quarterRest);
    });

    it("converts two consecutive quarter rests into a half rest", () => {
      const quarterNote = new SimpleNote(false, 1);

      const result = vexify([quarterNote, quarterNote]);

      expect(result.length).to.equal(1);

      compareNotes(result[0], halfRest);
    });
  });
});
