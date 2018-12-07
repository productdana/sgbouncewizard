const selectDataHook = hook => `[data-test="${hook}"]`; // writes to component
const writeDataHook = hook => ({ "data-test": hook }); // writes to selectors file

// Adds objects with data-qahooks properties to be passed into React component props
// i.e. { key: { data-qahook: <some_qa_hook> }, ... }

const writeSelectorGenerator = Selectors =>
  Object.keys(Selectors)
    .map(key => ({
      [key]: writeDataHook(Selectors[key]),
    }))
    .reduce((accumulator, nextValue) => ({ ...accumulator, ...nextValue }));

// CSS selector version of the the data-qahooks attributes
// i.e. { key: '[data-qahook="<some_qa_hook>"]', ... }

const selectSelectorGenerator = Selectors =>
  Object.keys(Selectors)
    .map(key => ({
      [key]: selectDataHook(Selectors[key]),
    }))
    .reduce((accumulator, nextValue) => ({ ...accumulator, ...nextValue }));

export { selectDataHook, writeSelectorGenerator, selectSelectorGenerator };
