import { Button, Modal, Row, Col, Form, FormControl } from 'react-bootstrap';
import { withRouter } from 'react-router-dom/cjs/react-router-dom';
import { useState } from 'react';
import api from '../../api';
import SuccessToast from '../SuccessToast';
import './EditProfileModal.css';

function EditProfileModal({
  userData,
  editUser,
  toggleModal,
  isShowing }) {

  const [show, setShow] = useState(false)
  const [profileUpdated, setProfileUpdated] = useState(false)

  const addModalLeave = () => {
    document.querySelector('#editProfileModal').classList.add('modalLeave');
    // delay effect
    setTimeout(() => {
      toggleModal();
      setShow(false)
      setProfileUpdated(false)
    }, 800);
  }

  const onSubmitUpdateProfile = async (e) => {
    e.preventDefault();
    const payload = new FormData(e.target);
    payload.append('userId', userData._id);
    const editProfile = await (await api.editUser(payload));
    setShow(!show)
    setProfileUpdated(!profileUpdated)
    // delay effect
    setTimeout(() => {
      if (editProfile.data.success) editUser(editProfile.data.userInfo);
      addModalLeave();
    }, 2000);
  };

  return (
    <>
      <Modal
        id="editProfileModal"
        size="lg"
        backdrop="static"
        animation={false}
        centered
        show={isShowing}
        onHide={toggleModal}
      >
        <Modal.Header>
          <Modal.Title style={{ margin: 'auto' }}>
            {
              profileUpdated
                ? <SuccessToast show={show} body="Your profile has been successfully updated" />
                : <h3>Edit Profile</h3>
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="ui large form"
            onSubmit={(e) => onSubmitUpdateProfile(e)}
            encType="multipart/form-data"
          >
            <div className="ui stacked segment">
              {/* FIRSTNAME INPUT */}
              <Form.Group>
                <Form.Label as={Col} sm={4} className="mt-3">First Name:</Form.Label>
                <Col sm={8}>
                  <FormControl
                    type="text"
                    name="firstName"
                    placeholder={userData.firstName}
                    disabled={profileUpdated}
                    required
                  />
                </Col>
              </Form.Group>
              {/* LASTNAME INPUT */}
              <Form.Group>
                <Form.Label as={Col} sm={4}>Last Name:</Form.Label>
                <Col sm={8}>
                  <FormControl
                    type="text"
                    name="lastName"
                    placeholder={userData.lastName}
                    disabled={profileUpdated}
                    required
                  />
                </Col>
              </Form.Group>
              {/* USERNAME/EMAIL INPUT */}
              <Form.Group>
                <Form.Label as={Col} sm={4}>Email:</Form.Label>
                <Col sm={8}>
                  <FormControl
                    type="text"
                    name="email"
                    placeholder={userData.email}
                    value={userData.email}
                    readOnly
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
                  disabled={profileUpdated}
                  type="submit">Save Changes</Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default withRouter(EditProfileModal);
