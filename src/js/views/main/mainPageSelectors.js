import { createSelector } from 'reselect';

const selectDomain = () => (state) => state['stars'];

const selectStars = () => createSelector(
  selectDomain(),
  (state) => state.get('data')
);

const selectCurrentStar = () => createSelector(
  selectDomain(),
  (state) => state.get('currentStar')
);

export {
  selectDomain,
  selectStars,
  selectCurrentStar,
};
