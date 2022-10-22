/* eslint no-shadow: 0 */
import { useState } from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom/cjs/react-router-dom.min';
import { logoutUser } from '../../redux/actions'
import initialState from '../../redux/initialState'
import api from '../../api';

function DeactivateAccountModal({
    userData,
    history,
    toggleModal,
    isShowing,
    logoutUser
}) {

    const [accountDeleted, setAccountDeleted] = useState('null')
    const [show, setShow] = useState('null')

    const onDeactivate = async (e) => {
        e.preventDefault();
        const deleteAccount = await (await api.deleteAccount(userData._id));
        if (!deleteAccount) throw new Error('There was a problem deleting your account.')
        setAccountDeleted(!accountDeleted)
        setShow(!show)
        setTimeout(() => {
            setAccountDeleted(false)
            setShow(false)
            logoutUser(initialState)
            history.push('/')
        }, 2000);
    };

    const addModalLeave = () => {
        document.querySelector('#editDeactivationModal').classList.add('modalLeave');
        setTimeout(() => {
            toggleModal();
            setShow(false)
        }, 800);
    }

    return (
        <>
            <Modal id="editDeactivationModal" size="lg" backdrop="static" animation={false} centered show={isShowing} onHide={toggleModal}>
                <Modal.Header>
                    <Modal.Title style={{ margin: 'auto' }}>
                        <h3>Are you sure you want to Deactivate your account?</h3>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="ui stacked segment text-center">
                        <h4>Please be advised <b>THIS ACTION CANNOT BE REVERSED</b>!</h4>
                    </div>
                    <Row className="justify-content-end">
                        <Col lg={2}>
                            <Button
                                className="btn-block"
                                variant="dark"
                                onClick={addModalLeave}>Cancel</Button>
                        </Col>
                        <Col lg={3}>
                            <Button
                                className="btn-block"
                                variant="danger"
                                disabled={!accountDeleted}
                                onClick={onDeactivate}
                                type="submit">Deactivate Account</Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}


export default connect(({ userData }) => ({ userData }), ({ logoutUser }))(withRouter(DeactivateAccountModal));

