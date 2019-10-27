import React, { useState } from 'react';

const LandingPage = () => {
  const [plateNo, setPlateNo] = useState('');
  const [vin, setVin] = useState('');
  const [license, setLicense] = useState('');
  const [location, setLocation] = useState('');
  const [time, setTime] = useState('');

  return (
    <div className="landing-page">
      <h1 className="display-4">Report your stolen car</h1>
      <form>
        <input className="form-control" type="text" name="plateNo" value={plateNo} onChange={setPlateNo} placeholder="Plate number" />
        <input className="form-control" type="text" name="vin" value={vin} onChange={setVin} placeholder="VIN" />
        <input className="form-control" type="text" name="license" value={license} onChange={setLicense} placeholder="Drivers license" />
        <input className="form-control" type="text" name="location" value={location} onChange={setLocation} placeholder="Last seen" />
        <input className="form-control" type="datetime-local" name="time" value={time} onChange={setTime} placeholder="Time of theft" />
        <button className="btn btn-primary btn-lg" type="submit">REPORT</button>
      </form>
    </div>
  );
};

export default LandingPage;
