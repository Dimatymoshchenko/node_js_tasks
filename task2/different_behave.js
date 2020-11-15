setTimeout(() => {
  console.log('timeout 1');
}, 0);

setImmediate(() => {
  console.log('immediate');
});

setTimeout(() => {
  console.log('timeout 2');
}, 0);
