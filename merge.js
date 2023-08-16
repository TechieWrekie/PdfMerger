const PDFMerger = require('pdf-merger-js');


const pdfmerger = async (p1,p2) => {
    var merger = new PDFMerger();
    let d = new Date().getTime()
  await merger.add(p1);  //merge all pages. parameter is the path to file and filename.
  await merger.add(p2);
  await merger.save(`public/${d}.pdf`); //save under given name and reset the internal document
  return d
  // Export the merged PDF as a nodejs Buffer
  // const mergedPdfBuffer = await merger.saveAsBuffer();
  // fs.writeSync('merged.pdf', mergedPdfBuffer);
}

module.exports = {pdfmerger}