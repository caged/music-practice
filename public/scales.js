import { Fretboard, Systems, GUITAR_TUNINGS } from "@moonwave99/fretboard.js";
import { select, selectAll } from "d3";

const boards = document.querySelectorAll(".fb");
const style = {
  filter: ({ inBox }) => inBox,
  text: ({ note, interval }) => interval,
  fill: ({ note, interval }) => {
    let color = "#000";
    if (interval === "1P") color = "#FE54C1";
    if (interval.match(/3/)) color = "#555";
    return color;
  },
  fontSize: 8,
};
for (const el of boards) {
  const { root, scale, box } = el.dataset;
  const fb = new Fretboard({
    el,
    dotStrokeWidth: 0,
    fretCount: box ? 15 : 24,
    dotSize: box ? 20 : 18,
    middleFretColor: "#333",
    scaleFrets: false,
    stringColor: "#aaa",
    fretColor: "#aaa",
    nutColor: "#333",
    fretNumbersMargin: 5,
    fretNumbersHeight: 10,
    scaleFrets: false,
    // tuning: GUITAR_TUNINGS.dropD
  });

  if (box === undefined) {
    fb.renderScale({
      root,
      type: scale,
    }).style({ ...style, filter: () => true });

    select(el).selectAll(".dot text").attr("fill", "white");
  } else {
    fb.renderScale({
      root,
      type: scale,
      box: { system: Systems.TNPS, box },
    }).style(style);

    // Below is work arounds for API limitations
    const fbel = select(el);
    const svg = fbel.select("svg");
    const position = +box + 2 > 7 ? +box + 2 - 7 : +box + 2;
    const [_, __, width, height] = svg.attr("viewBox").split(" ").map(Number);

    // Remove all nodes not in the box
    svg.selectAll(".dot:not(.dot-in-box)").remove();

    // Add the standardized position number
    svg
      .select(".fretboard-wrapper")
      .append("text")
      .attr("dy", -5)
      .text(`Position ${position}`);

    //
    svg.selectAll(".dot.dot-in-box text").attr("fill", "white");
  }
}
