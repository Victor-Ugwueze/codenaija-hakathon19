import _ from 'lodash';
import React, { Component } from 'react';

import './style.css';
import { withFirebase } from '../../firebase';

class ImageUploader extends Component {
  state = {
    file: {},
  };

  constructor(props) {
    super(props);
    this.fileInputRef = React.createRef();
  }

  async componentDidUpdate(prevProps) {
    const { triggerUpload } = this.props;
    if (!_.isEqual(prevProps, this.props)) {
      if (triggerUpload) {
        await this.upload();
      }
    }
  }

  handleFiles = (event) => {
    const { onChange } = this.props;
    event.preventDefault();
    if (event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type.toLowerCase().includes('image')) {
        this.setState((state) => {
          return {
            ...state,
            file,
          };
        });
        onChange(file);
      }
    }
  };

  triggerFileSelection = () => {
    this.fileInputRef.current.click();
  };

  upload = async () => {
    const { file } = this.state;
    const { firebase, onUpload } = this.props;

    try {
      if (typeof file === 'string') {
        onUpload({ url: file });
        return;
      }

      const url = await firebase.uploadToFirebase(file);

      onUpload(url);
    } catch (error) {
      console.log('Error(ImageUploader): Failed to upload the image:');
      console.log({ error, file });
    }
  };

  render() {
    const { file } = this.state;

    return (
      <div className='image-uploader' onClick={this.triggerFileSelection}>
        {file.name ? file.name : `Click or drag image here to upload`}
        <input
          accept='image/*'
          multiple
          name='car'
          type='file'
          id='fileElem'
          ref={this.fileInputRef}
          onChange={this.handleFiles}
        />
      </div>
    );
  }
}

export default withFirebase(ImageUploader);
