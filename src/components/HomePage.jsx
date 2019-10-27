import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import ImageUploader from './ImgaeUploader/ImgaeUploader';
import './HomePage.scss';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

Moment.locale('en');
momentLocalizer();

class HomePage extends Component {
  state = {
    vehicle: {
      plate_number: '',
      VIN: '',
      license: '',
      location: '',
      datetime: null,
      displayImage: '',
      image: ''
    },
    isLoading: false,
    triggerUpload: false
  };

  handleInputChange = e => {
    const { name, value } = e.target;

    this.setState(state => ({
      ...state,
      vehicle: {
        ...state.vehicle,
        [name]: value
      }
    }));
  };

  handleChange = location => {
    this.setState({ ...this.state, vehicle: { ...this.state.vehicle, location } });
  };

  onSubmit = async e => {
    e.preventDefault();
    this.setState(state => ({
      isLoading: true
    }));
    if (!this.state.file) {
      this.finishReport();
      return;
    }
    this.setState({ triggerUpload: true });
  };

  searchVehicle = async e => {
    e.preventDefault();
    const result = await this.props.firebase.searchVehicles({ query: 'Color', value: 'Red' });
    console.log(result, 'result');
    console.log(this.state);
  };

  finishReport = async url => {
    const { vehicle: { plate_number, VIN } } = this.state;
    this.setState({ triggerUpload: false });
    await this.props.firebase.sendReport({ ...this.state.vehicle, imageUrl: url || '' });
    ToastsStore.success('Report send');
    this.props.firebase.app.functions()
    .httpsCallable('sendSMS')({
      message: `This vehicle has been reported lost please be on the look out\nCAR: HONDA\nVIN: ${VIN} \nPlate Number: ${plate_number}`
    });

    this.setState({ isLoading: false });
  };

  handleImageUpload = file => {
    this.setState({
      displayImage: URL.createObjectURL(file) || ''
    });
  };

  handleSelect = location => {
    this.setState({ ...this.state, vehicle: { ...this.state.vehicle, location } });
    geocodeByAddress(location)
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => this.setState({ location: `${lat},${lng}` }))
      .catch(error => console.error(error, 'error'));
  };

  render() {
    const { displayImage, triggerUpload, isLoading } = this.state;
    return (
      <div className="homepage">
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} lightBackground />

        <div className="container flex-fill pt-4">
          <h1 className="header-title display-4 text-center">Report your stolen car</h1>
          <div className="row-md-12 col-sm-12">
            <form className="homepage-form col" onSubmit={this.onSubmit}>
              <div className="form-row">
                <div className="form-group col-md-3 col-sm-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="plate_number"
                    onChange={this.handleInputChange}
                    placeholder="Plate number"
                  />
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="VIN"
                    placeholder="Enter VIN"
                    onChange={this.handleInputChange}
                  />
                </div>
                <div className="form-group col-md-3 col-sm-12">
                  <input
                    type="text"
                    className="form-control form-control-lg"
                    name="license"
                    placeholder="Drivers License"
                    onChange={this.handleInputChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col-md-6 col-sm-12">
                  <PlacesAutocomplete
                    value={this.state.vehicle.location}
                    onChange={this.handleChange}
                    onSelect={this.handleSelect}
                  >
                    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                      <div>
                        <input
                          {...getInputProps({
                            placeholder: 'Last seen location',
                            className: 'form-control form-control-lg'
                          })}
                        />
                        <div className="autocomplete-dropdown-container">
                          {loading && <div>Loading...</div>}
                          {suggestions.map(suggestion => {
                            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: '#fafafa',
                                  cursor: 'pointer',
                                  border: '1px solid #999',
                                  zIndex: '999999'
                                }
                              : {
                                  backgroundColor: '#ffffff',
                                  cursor: 'pointer',
                                  border: '1px solid #999',
                                  boxShadow: '1px 2px 2px #999',
                                  zIndex: '999999'
                                };
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style
                                })}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                </div>
                <div className="form-group col-md-6 col-sm-12">
                  <input
                    type="datetime-local"
                    className="form-control form-control-lg"
                    name="time"
                    placeholder="Time of theft"
                    value={this.state.datetime}
                    onChange={value =>
                      this.setState({
                        datetime: new Date(value)
                      })
                    }
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group col">
                  <button
                    type="submit"
                    className="btn btn-primary btn col-sm-12"
                    disabled={`${isLoading ? 'disabled' : ''}`}
                  >
                    SUBMIT REPORT
                    {isLoading && (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    )}
                  </button>
                </div>
                <div className="form-group col">
                  <ImageUploader
                    style={{ margin: 0 }}
                    triggerUpload={triggerUpload}
                    onChange={file => {
                      this.handleImageUpload(file);
                      this.setState(state => ({
                        ...state,
                        file,
                        imageUrl: ''
                      }));
                    }}
                    onUpload={url => {
                      this.finishReport(url);
                    }}
                  />
                </div>
              </div>
            </form>
            <div className="col">
              {displayImage && <img className="upload-image img-fluid" src={displayImage} alt="al" />}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withFirebase(HomePage);
