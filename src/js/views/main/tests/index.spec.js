import expect from 'expect';
import { fromJS, List } from 'immutable';

import configureStore from '../../../store/configureStore';
import * as constants from '../constants';


const store = configureStore();

describe('empty', () => {

  it('should initialize', () => {
    const actual = store.getState();
    const expected = {
      routing: {
        locationBeforeTransitions: null
      },
      stars: fromJS({
        data: fromJS(),
        currentStar: List(),
        currentStarError: List(),
      })
    };

    expect(actual).toEqual(expected);
  });

  it('should work reducer', () => {
    const actions = [
      {
        type: constants.GET_STARS,
        response: {
          nearEarthObjects: { value: 1 },
        }
      },
      {
        type: constants.GET_STAR,
        response: {
          orbitalData: { value: 1 },
          closeApproachData: { value: 2 },
          estimatedDiameter: { value: 3 },
          absoluteMagnitudeH: 20,
          isPotentiallyHazardousAsteroid: false,
        }
      },
    ];

    actions.forEach(action => store.dispatch(action));

    const actual = store.getState();
    const expected = fromJS({
      data: fromJS({
        nearEarthObjects: fromJS({ value: 1 }),
      }),
      currentStar: fromJS({
        orbitalData: { value: 1 },
        closeApproachData: { value: 2 },
        estimatedDiameter: { value: 3 },
        absoluteMagnitudeH: 20,
        isPotentiallyHazardousAsteroid: false,
      }),
      currentStarError: List(),
    });
    
    expect(actual.stars).toEqual(expected);
  });
});
