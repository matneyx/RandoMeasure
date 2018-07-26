import { expect } from 'chai';
import { randoMeasure } from '../../utils/randoMeasure';

describe("RandoMeasure", () => {
  it("ouputs array of 8 bools", () => {
    const result = randoMeasure();

    expect(result.length).to.equal(8);

    for (let i = 0; i < result.length; i++) {
      expect(typeof(result[i])).to.equal('boolean');
    }
  });

  it("outputs array of random bools", () => {
    const result = randoMeasure();

    let atLeastOneElementDifferent = false;
    for (let i = 1; i < result.length; i++) {
      if(result[i] !== result[i - 1]) atLeastOneElementDifferent = true;
    }

    expect(atLeastOneElementDifferent).to.equal(true);
  })
});
