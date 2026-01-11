const cvQueue = require("../queues/cvQueus");
const processCVAnalysis = require("../processors/cvAnalysis.processor");

cvQueue.process(2, processCVAnalysis);

console.log("🎧 CV Worker started");
