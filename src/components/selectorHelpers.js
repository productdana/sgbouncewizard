const selectDataHook = hook => `[data-test="${hook}"]`; // read in test files for CSS selectors
const writeDataHook = hook => ({ "data-test": hook }); // writes to React components

// Adds objects with data-test properties to be passed into React component props
// i.e. { key: { data-test: <some-test-hook> }, ... }
const writeSelectorGenerator = Selectors =>
  Object.keys(Selectors)
    .map(key => ({
      [key]: writeDataHook(Selectors[key]),
    }))
    .reduce((accumulator, nextValue) => ({ ...accumulator, ...nextValue }));

// CSS selector version of the the data-test attributes
// i.e. { key: '[data-test="<some-test-hook>"]', ... }
const selectSelectorGenerator = Selectors =>
  Object.keys(Selectors)
    .map(key => ({
      [key]: selectDataHook(Selectors[key]),
    }))
    .reduce((accumulator, nextValue) => ({ ...accumulator, ...nextValue }));

export { selectDataHook, writeSelectorGenerator, selectSelectorGenerator };
