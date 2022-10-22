import { Button, Modal, Row, Col, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import api from '../../api';
import './EditPhotoModal.css';
import SuccessToast from '../SuccessToast';

function EditPhotoModal({
  toggleModal,
  isShowing,
  userData,
  editUserPhoto,
}) {

  const [show, setShow] = useState(false)
  const [photoUpdated, setPhotoUpdated] = useState(false)

  const addModalLeave = () => {
    document.querySelector('#editPhotoModal').classList.add('modalLeave');
    setTimeout(() => {
      toggleModal();
      setShow(false)
    }, 800);
  }

  const onSubmitUpdateProfile = async (e) => {
    e.preventDefault();
    const payload = new FormData(e.target);
    payload.append('userId', userData._id);
    const editPhoto = await (await api.editPhoto(payload));
    /* eslint-disable-next-line no-console */
    if (!editPhoto.data.success) console.log('There was an error setting your user photo!');
    setPhotoUpdated(!photoUpdated)
    setShow(!show)
    setTimeout(() => {
      setPhotoUpdated(false)
      setShow(false)
      if (editPhoto.data.success) editUserPhoto(editPhoto.data.userInfo);
      addModalLeave();
    }, 2000);
  };

  return (
    <>
      <Modal id="editPhotoModal" size="lg" backdrop="static" animation={false} centered show={isShowing} onHide={toggleModal}>
        <Modal.Header>
          <Modal.Title style={{ margin: 'auto' }}>
            {
              photoUpdated
                ? <SuccessToast show={show} body="Your photo has been successfully updated" />
                : <h3>Please select a new image</h3>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="ui large form" onSubmit={(e) => onSubmitUpdateProfile(e)} encType="multipart/form-data">
            <div className="ui stacked segment">
              {/* USER PHOTO INPUT */}
              <Form.Group>
                <Form.Label as={Col} sm={4}>(Optional) Profile Picture:</Form.Label>
                <Col sm={8}>
                  <FormControl
                    type="file"
                    accept="image/*"
                    name="userImage"
                    required
                  />
                </Col>
              </Form.Group>
            </div>
            <Row className="justify-content-end">
              <Col lg={2}>
                <Button
                  className="btn-block"
                  variant="dark"
                  onClick={addModalLeave}>Close</Button>
              </Col>
              <Col lg={3}>
                <Button
                  className="btn-block"
                  variant="success"
                  disabled={photoUpdated}
                  type="submit">Save Changes</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditPhotoModal;
