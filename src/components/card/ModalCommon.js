
import React  from 'react';
const ModalCommon = (props) => {
  const { handleCloseModal, content} = props
  return (
    <>
     <div className="modal" id="myModal" onClick={handleCloseModal}>
  <div className="modal-dialog">
    <div className="modal-content">

    
      <div className="modal-header">
        <h4 className="modal-title">Tracker</h4>
        <button type="button" className="close" data-dismiss="modal" onClick={handleCloseModal}>×</button>
      </div>

 
      <div className="modal-body">
        {content}
      </div>

    
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={handleCloseModal}>Close</button>
      </div>

    </div>
  </div>
  </div>
  </> );
}
 
export default ModalCommon;