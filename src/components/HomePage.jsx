import React, { Component } from 'react';
import { withFirebase } from '../firebase';
import ImageUploader from './ImgaeUploader/ImgaeUploader';
import './HomePage.scss';
import { DateTimePicker } from 'react-widgets';
import Moment from 'moment';
import momentLocalizer from 'react-widgets-moment';
import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';

Moment.locale('en');
momentLocalizer();

class HomePage extends Component {
  state = {
    vehicle: {
      plate_number: '',
      vin: '',
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
    this.setState({ triggerUpload: false });
    await this.props.firebase.sendReport({ ...this.state.vehicle, imageUrl: url || '' });
    ToastsStore.success('Report send');
    // this.props.firebase.app.functions()
    // .httpsCallable('sendSMS')({
    //   message: "This vehicle has been reported lost please be on the look out\nCAR: HONDA\nVIN: 86528HTE88\nPLATE NUMBER: EKY769JK"
    //   // message: 'A car with this number has been reported stolen'
    // });

    this.setState({ isLoading: false });
  };

  handleImageUpload = file => {
    this.setState({
      displayImage: URL.createObjectURL(file) || ''
    });
  };
  render() {
    const { displayImage, triggerUpload, isLoading } = this.state;
    return (
      <div className="homepage">
        <ToastsContainer store={ToastsStore} position={ToastsContainerPosition.TOP_RIGHT} lightBackground />

        <div className="container flex-fill pt-4">
          <h1 className="header-title display-4 text-center">Report your stolen car</h1>
          <form className="homepage-form" onSubmit={this.onSubmit}>
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
                <input
                  type="text"
                  className="form-control form-control-lg"
                  name="location"
                  placeholder="Enter last seen location"
                  onChange={this.handleInputChange}
                />
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
              <div className="col">{displayImage && <img className="upload-image" src={displayImage} alt="al" />}</div>
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
                    <div class="spinner-border" role="status">
                      <span class="sr-only">Loading...</span>
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
        </div>
      </div>
    );
  }
}

export default withFirebase(HomePage);
