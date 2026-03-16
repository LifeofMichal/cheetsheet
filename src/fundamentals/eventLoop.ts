function eventLoopRunner() {
  let output: unknown[] = [];

  output.push("start");

  const obj = {
    regular: function () {
      output.push(`regular`);
    },
    arrow: () => {
      output.push(`arrow`);
    },
    nested: function () {
      output.push(`nested start`);

      for (var i = 0; i < 2; i++) {
        let y = i;

        // macro
        setTimeout(function () {
          output.push(`timeout regular var: ${i}`);
        }, 0);

        // macro
        setTimeout(() => {
          output.push(`timeout arrow let: ${y}`);
        }, 0);

        // micro
        Promise.resolve().then(() => {
          output.push(`promise var: ${i}`);
        });

        (() => {
          output.push(`iife arrow var: ${i}`);
        })();
      }
    },
  };

  obj.regular();
  obj.arrow();
  obj.nested();

  output.push("end");

  return output;
}

export { eventLoopRunner };
