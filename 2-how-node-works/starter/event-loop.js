setTimeout(() => {
    console.log("timer 1 finished");
}, 0);
setImmediate(() => {
    console.log("inm 1 finished");
});