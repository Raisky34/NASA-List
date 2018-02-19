import React, { Component, PropTypes } from 'react';
import ReactDom from 'react-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';

import * as actions from './actions';
import * as selectors from './mainPageSelectors';
import * as routes from '../../routes/constants';
import { strings } from "../../localization/Localization";

class MainPage extends Component {
  state ={
    stars: {},
    loading: true,
  }

  componentWillMount() {
    this.props.getStars(null, () => {
      this.setState({ loading: false });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.stars !== this.props.stars) {
      this.setState({ stars: nextProps.stars.toJS() });
    }
  }

  componentWillUnmount() {
    this.props.clearData();
  }

  _preCompareitems(nearEarthObjects) {
    return Object.keys(nearEarthObjects).map(key => ({ [key]: nearEarthObjects[key] }));
  }

  render() {
    const {
      stars: {
        nearEarthObjects,
      },
      loading,
    } = this.state;

    const isCouldData = !!nearEarthObjects;
    let items = [];
    if (nearEarthObjects) {
      items = this._preCompareitems(nearEarthObjects);
    }
    return (
      <div className='hold-transition'>
        <div className='_title'>
          {strings.pages.main}
        </div>
        <div className='_stars-list'>
          {loading && !isCouldData && <div>Loading...</div>}
          {!loading && !isCouldData && <div>No data</div>}
          {
            items.map((item) => {
              return Object.keys(item).map(key => {
                return <div className='list-group' key={key}>
                  {
                    item[key].map((star) => {
                      return <div className='list-group-item list-group-item-action flex-column align-items-start' key={star.neoReferenceId}>
                      <div className="d-flex w-100 justify-content-between">
                          <h5 className="mb-1">
                            <Link to={`${routes.DETAILS}/${star.neoReferenceId}`}>{star.name}</Link>
                          </h5>
                        </div>
                        <p className="mb-1 _info">
                          <span>{strings.stars.absoluteMagnitude}: {star.absoluteMagnitudeH}</span>
                          <span>{strings.stars.isPotentiallyHazardousAsteroid}: {star.isPotentiallyHazardousAsteroid ? 'Yes' : 'No'}</span>
                        </p>
                      </div>
                    })
                  }
                </div>
              });
            })
          }
        </div>
        
      </div>
    )
  }
}

MainPage.contextTypes = {
  router: React.PropTypes.object.isRequired
};

const mapStateToProps = createStructuredSelector({
  stars: selectors.selectStars(),
});

const mapDispatchToProps = (dispatch) => ({
  getStars: (data, onComplete) => dispatch(actions.getStars(data, onComplete)),
  clearData: () => dispatch(actions.clearData()),
  dispatch,
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage)
