//coding-platform/src/app/coding/codeworker.js
self.onmessage = function(e) {
    const code = e.data;
    try {
      const result = eval(code);
      self.postMessage(result !== undefined ? result.toString() : 'Code executed successfully');
    } catch (error) {
      self.postMessage(`Error: ${error.message}`);
    }
  };