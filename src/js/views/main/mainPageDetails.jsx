import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import * as actions from './actions';
import * as selectors from './mainPageSelectors';
import * as routes from '../../routes/constants';
import { strings } from "../../localization/Localization";

class MainPageDetails extends Component {
  state = {
    star: {},
    loading: true,
  }

  componentWillMount() {
    const { routeParams: { uuid } } = this.props;
    this.props.getStar(uuid, () => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.star !== this.props.star) {
      this.setState({ star: nextProps.star.toJS() });
    }
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  render() {
    const {
      star,
      star: {
        orbitalData,
        closeApproachData,
        estimatedDiameter,
        absoluteMagnitudeH,
        isPotentiallyHazardousAsteroid,
      },
      loading,
    } = this.state;

    const isCouldData = !!orbitalData || !!closeApproachData || !!estimatedDiameter || !!absoluteMagnitudeH || !!isPotentiallyHazardousAsteroid;
    return (
      <div className="hold-transition">
        <div className="_header">
          <div className="_left">
            <Link className="_prev" to={routes.ROOT}>
                <i className="material-icons">arrow_back</i>
            </Link>
          </div>
          <div>Star name: {star.name}</div>
        </div>
        {loading && !isCouldData && <div>Loading...</div>}
        {!loading && !isCouldData && <div>No data</div>}
        <div className='_info-block'>
          <ul className='list-group'>
            {absoluteMagnitudeH && <li className='list-group-item'>{strings.stars.absoluteMagnitude}: {absoluteMagnitudeH}</li>}
            {isPotentiallyHazardousAsteroid && <li className='list-group-item'>{strings.stars.isPotentiallyHazardousAsteroid}: {isPotentiallyHazardousAsteroid ? 'Yes' : 'No'}</li>}
            {
              orbitalData &&
                <li className='list-group-item'>
                  <b>Orbital Data:</b>
                  <ul className='list-group'>
                    <li className='list-group-item'>{strings.stars.inclination}: {orbitalData.inclination}</li>
                    <li className='list-group-item'>{strings.stars.perihelionArgument}: {orbitalData.perihelionArgument}</li>
                    <li className='list-group-item'>{strings.stars.orbitUncertainty}: {orbitalData.orbitUncertainty}</li>
                    <li className='list-group-item'>{strings.stars.minimumOrbitIntersection}: {orbitalData.minimumOrbitIntersection}</li>
                    <li className='list-group-item'>{strings.stars.orbitDeterminationDate}: {orbitalData.orbitDeterminationDate}</li>
                    <li className='list-group-item'>{strings.stars.epochOsculation}: {orbitalData.epochOsculation}</li>
                    <li className='list-group-item'>{strings.stars.eccentricity}: {orbitalData.eccentricity}</li>
                    <li className='list-group-item'>{strings.stars.jupiterTisserandInvariant}: {orbitalData.jupiterTisserandInvariant}</li>
                    <li className='list-group-item'>{strings.stars.semiMajorAxis}: {orbitalData.semiMajorAxis}</li>
                    <li className='list-group-item'>{strings.stars.perihelionTime}: {orbitalData.perihelionTime}</li>
                    <li className='list-group-item'>{strings.stars.ascendingNodeLongitude}: {orbitalData.ascendingNodeLongitude}</li>
                    <li className='list-group-item'>{strings.stars.orbitalPeriod}: {orbitalData.orbitalPeriod}</li>
                    <li className='list-group-item'>{strings.stars.equinox}: {orbitalData.equinox}</li>
                    <li className='list-group-item'>{strings.stars.perihelionDistance}: {orbitalData.perihelionDistance}</li>
                    <li className='list-group-item'>{strings.stars.meanMotion}: {orbitalData.meanMotion}</li>
                    <li className='list-group-item'>{strings.stars.aphelionDistance}: {orbitalData.aphelionDistance}</li>
                    <li className='list-group-item'>{strings.stars.meanAnomaly}: {orbitalData.meanAnomaly}</li>
                  </ul>
                </li>
            }
            {
              closeApproachData && 
                <li className='list-group-item'>
                  <b>{strings.stars.closeApproachData}:</b>
                    {
                      closeApproachData.map((item, index) => {
                        const { relativeVelocity, missDistance } = item;
                        return <ul className='list-group' key={`closeApproachData/${index}`}>
                          <li className='list-group-item'>{strings.stars.closeApproachDate}: {item.closeApproachDate}</li>
                          <li className='list-group-item'>{strings.stars.orbitingBody}: {item.orbitingBody}</li>
                          {
                            relativeVelocity &&
                              <li className='list-group-item'>
                                <b>{strings.stars.relotiveVelocity}</b>
                                <ul className='list-group'>
                                  <li className='list-group-item'>{strings.stars.kilometersPerSecond}: {relativeVelocity.kilometersPerSecond}</li>
                                  <li className='list-group-item'>{strings.stars.kilometersPerHour}: {relativeVelocity.kilometersPerHour}</li>
                                  <li className='list-group-item'>{strings.stars.milesPerHour}: {relativeVelocity.milesPerHour}</li>
                                </ul>
                              </li>
                          }
                          {
                            missDistance &&
                              <li className='list-group-item'>
                                <b>{strings.stars.missDistance}</b>
                                <ul className='list-group'>
                                  <li className='list-group-item'>{strings.stars.astronomical}: {missDistance.astronomical}</li>
                                  <li className='list-group-item'>{strings.stars.lunar}: {missDistance.lunar}</li>
                                  <li className='list-group-item'>{strings.stars.kilometers}: {missDistance.kilometers}</li>
                                  <li className='list-group-item'>{strings.stars.miles}: {missDistance.miles}</li>
                                </ul>
                              </li>
                          }
                        </ul>
                      })
                    }
                </li>
            }
            {
              estimatedDiameter &&
                <li className='list-group-item'>
                  <b>{strings.stars.estimatedDiameter}:</b>
                    <ul className='list-group'>
                      <li className='list-group-item'>
                        <b>{strings.stars.kilometers}:</b>
                        <ul className='list-group'>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMin}: {estimatedDiameter.kilometers.estimatedDiameterMin}</li>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMax}: {estimatedDiameter.kilometers.estimatedDiameterMax}</li>
                        </ul>
                      </li>
                      <li className='list-group-item'>
                        <b>{strings.stars.meters}:</b>
                        <ul className='list-group'>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMin}: {estimatedDiameter.meters.estimatedDiameterMin}</li>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMax}: {estimatedDiameter.meters.estimatedDiameterMax}</li>
                        </ul>
                      </li>
                      <li className='list-group-item'>
                        <b>{strings.stars.miles}:</b>
                        <ul className='list-group'>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMin}: {estimatedDiameter.miles.estimatedDiameterMin}</li>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMax}: {estimatedDiameter.miles.estimatedDiameterMax}</li>
                        </ul>
                      </li>
                      <li className='list-group-item'>
                        <b>{strings.stars.feet}:</b>
                        <ul className='list-group'>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMin}: {estimatedDiameter.feet.estimatedDiameterMin}</li>
                          <li className='list-group-item'>{strings.stars.estimatedDiameterMax}: {estimatedDiameter.feet.estimatedDiameterMax}</li>
                        </ul>
                      </li>
                    </ul>
                  </li>
            }
          </ul>
        </div>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  star: selectors.selectCurrentStar(),
});

const mapDispatchToProps = (dispatch) => ({
  getStar: (uuid, onComplete) => dispatch(actions.getStar(uuid, onComplete)),
  clearData: () => dispatch(actions.clearData()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPageDetails);
