
import Vex from 'vexflow';

import React, {Component} from 'react';

const {
    Accidental,
    Formatter,
    Stave,
    StaveNote,
    Renderer,
    Beam
} = Vex.Flow;

export default class componentName extends Component  {
  render() {
    return <div ref="outer" style={{
        border: "2px blue solid",
        padding: 10,
        borderRadius: 10,
        display: "inline-block",
    }}>
    </div>;
  }
  componentDidMount() {
      const {notation, time} = this.props;
      var beams = Beam.generateBeams(notation);

      const width = 300;

      const stave = new Stave(0, 0, width);  // x, y, width
      stave.addClef("percussion");
      if (time) stave.addTimeSignature(time);

      const svgContainer = document.createElement('div');
      const renderer = new Renderer(svgContainer, Renderer.Backends.SVG);
      const ctx = renderer.getContext();

      stave.setContext(ctx).draw();
      const bb = Formatter.FormatAndDraw(ctx, stave, notation);
      beams.forEach(b => b.setContext(ctx).draw());

      const padding = 10;
      const half = padding / 2;
      svgContainer.style.height = Math.max(120, bb.h + padding) + "px";
      svgContainer.style.width = (width + (padding * 2)) + "px";
      svgContainer.style.position = "relative";
      svgContainer.style.display = "inlineBlock";

      this.refs.outer.appendChild(svgContainer);
  }
}
