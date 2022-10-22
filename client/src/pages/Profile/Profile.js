import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import './Profile.css';
import { Container, Row, Col } from 'react-bootstrap';
import EditProfileModal from '../../components/EditProfileModal';
import NotLoggedInRedirect from '../../components/NotLoggedInRedirect';
import { NavContainer } from '../../redux/containers';
import api from '../../api';
import Footer from '../../components/Footer';
import EditPhotoModal from '../../components/EditPhotoModal';
import ProfileInfoCard from '../../components/Profile/ProfileInfoCard';
import ProfileStats from '../../components/Profile/ProfileStats';
import DeactivateAccountModal from '../../components/DeactivateAccountModal';

function Profile({
  updateScores,
  userData,
  editUser,
  editUserPhoto
}) {

  const [isShowingProfileModal, setIsShowingProfileModal] = useState(null)
  const [isShowingPhotoModal, setIsShowingPhotoModal] = useState(null)
  const [isShowingDeactivationModal, setIsShowingDeactivationModal] = useState(null)

  const getScoreAverages = async () => {
    const userEmail = userData.email;
    const userScoreAverage = await (await api.profileScoreAverages(userEmail));
    const { average } = userScoreAverage.data;
    updateScores(average);
  }

  const toggleEditProfileModal = () => {
    const showing = isShowingProfileModal
    setIsShowingProfileModal(!showing)
  }

  const toggleEditPhotoModal = () => {
    const showing = isShowingPhotoModal
    setIsShowingPhotoModal(!showing)
  }

  const toggleDeactivationModal = () => {
    const showing = isShowingDeactivationModal
    setIsShowingDeactivationModal(!showing)
  }

  useEffect(() => {
    getScoreAverages()
  }, [])

  return (
    <>
      <NotLoggedInRedirect>
        <NavContainer />
        <Container fluid>
          <Row className="mb-5 justify-content-center" id="profileDiv">
            <Col lg={8}>
              {/* Half Rule */}
              <h5 className="section-title ui horizontal header divider mt-5"><i className="bar chart icon" />Profile</h5>
              {/* Personal Info Card */}
              <ProfileInfoCard
                toggleEditProfileModal={toggleEditProfileModal}
                toggleEditPhotoModal={toggleEditPhotoModal}
                toggleDeactivation={toggleDeactivationModal}
              />
              {/* Half Rule */}
              <h5 className="section-title ui horizontal header divider"><i className="bar chart icon" />Stats</h5>
              {/* Personal Profile Stats/Custom Progress Bars */}
              <ProfileStats />
            </Col>
          </Row>
          <EditPhotoModal
            editUserPhoto={editUserPhoto}
            userData={userData}
            toggleModal={toggleEditPhotoModal}
            isShowing={isShowingPhotoModal}
          />
          <EditProfileModal
            editUser={editUser}
            userData={userData}
            toggleModal={toggleEditProfileModal}
            isShowing={isShowingProfileModal}
          />
          <DeactivateAccountModal
            userData={userData}
            toggleModal={toggleDeactivationModal}
            isShowing={isShowingDeactivationModal}
          />
        </Container>
        <Footer />
      </NotLoggedInRedirect>
    </>
  );
}


export default withRouter(Profile);
