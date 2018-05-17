/* Created by Alexander Nuikin (nukisman@gmail.com). */

export const multiTest = (
  testName,
  stateOrCreator,
  paramOrCreator,
  updates,
  createExpected,
  checkRefs = () => {}
) => {
  const createState = () =>
    typeof stateOrCreator === 'function' ? stateOrCreator() : stateOrCreator;
  const createParam = state =>
    typeof paramOrCreator === 'function'
      ? paramOrCreator(state)
      : paramOrCreator;
  updates.forEach((update, i) => {
    test(`${i}: ${testName}`, () => {
      const state = createState(); // todo: Freeze state
      const param = createParam(state); // todo: Freeze param
      const res = update(state, param);
      const expected = createExpected(state, param);
      expect(res).toEqual(expected);
      checkRefs(state, res, param);
    });
  });
};

export const cloneDeep = value => JSON.parse(JSON.stringify(value));
