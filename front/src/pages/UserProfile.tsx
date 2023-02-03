import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
import TopNav from "../components/UserProfile/TopNav";
import ViewDashboard from "../components/UserProfile/ViewDashboard";
import ProfileDetails from "../components/UserProfile/ProfileDetails";
import About from "../components/UserProfile/About";
import ProfileButtons from "../components/UserProfile/ProfileButtons";
import Highlights from "../components/UserProfile/Highlights";
import PostGrid from "../components/UserProfile/PostGrid";
import { GlobalStyle } from "../Styles/global";
import { SideBar } from "../components/Sidebar/Index";
import axios from "axios";
import { LoginContext } from "../context/AuthContext";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const URL = "http://localhost:8080/insta/users";

const ProfileWrapper = styled.div`
  background-color: #000;
  max-width: 600px;
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    display: none;
  }
`;

const UserProfile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [userInfos, setUserInfos] = useState<any>(null);
  const [imagesUser, setImagesUser] = useState<any[]>([]);
  const [videosUser, setVideosUser] = useState<any[]>([]);
  const { user, setUser } = useContext(LoginContext);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  useEffect(() => {
    console.log(firstName);
  }, [firstName]);
  useEffect(() => {
    getOwnuserInfos();
  }, []);
  const getOwnuserInfos = async () => {
    const response = await axios.get(`${URL}/findById/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    });
    console.log(response.data);
    setEmail(response.data.email);
    setFirstName(response.data.prenom);
    setLastName(response.data.nom);

    setUserInfos(response.data);
    setImagesUser(response.data.photos);
    setVideosUser(response.data.videos);
    setDescription(response.data.description);
  };
  const updateOwnUserInfos = async (id: number) => {
    const response = await axios.get(`${URL}/findById/${user?.id}`, {
      headers: {
        Authorization: `Bearer ${user?.jwt}`,
      },
    });
    await axios.put(
      `${URL}/${id}`,
      {
        nom: lastName,
        prenom: firstName,
        email: email,
        description: description,
      },
      {
        headers: {
          Authorization: `Bearer ${user?.jwt}`,
        },
      }
    );
    getOwnuserInfos();
    handleClose();
  };
  return (
    <>
      <SideBar />
      <GlobalStyle />
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              position: "absolute" as "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "white",
              border: "2px solid #000",
              boxShadow: 24,
              p: 4,
              borderRadius: "10px",
            }}
          >
            <Typography
              id="modal-modal-title"
              variant="h6"
              component="h2"
              color={"black"}
            >
              Saisissez les informations à modifier
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              <TextField
                fullWidth
                margin="normal"
                label="Prénom"
                color="success"
                placeholder={userInfos?.prenom}
                focused
                onChange={(e) => setFirstName(e.target.value)}
              />
              <TextField
                margin="normal"
                label="Nom"
                color="success"
                fullWidth
                placeholder={userInfos?.nom}
                focused
                onChange={(e) => setLastName(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Email"
                color="success"
                placeholder={userInfos?.email}
                focused
                onChange={(e) => setEmail(e.target.value)}
              />
              <TextField
                fullWidth
                margin="normal"
                label="Bio"
                multiline
                rows={4}
                color="success"
                placeholder={userInfos?.prenom}
                onChange={(e) => setDescription(e.target.value)}
                focused
              />
              <br></br>
              <Button
                variant="contained"
                color="success"
                onClick={(e) => updateOwnUserInfos(userInfos?.id)}
              >
                Valider
              </Button>{" "}
              <Button variant="contained" color="error" onClick={handleClose}>
                Annuler
              </Button>
            </Typography>
          </Box>
        </Modal>
      </div>
      <ProfileWrapper>
        <TopNav firstName={userInfos?.prenom} lastName={userInfos?.nom} />
        <ViewDashboard role={userInfos?.appRoles.roleName} />
        <ProfileDetails
          totalPhotos={imagesUser.length}
          totalVideos={videosUser.length}
        />
        <About
          firstName={userInfos?.prenom}
          lastName={userInfos?.nom}
          description={userInfos?.description}
        />
        <ProfileButtons onClick={handleOpen} />
        <Highlights />
        <PostGrid postImages={imagesUser} />
      </ProfileWrapper>
    </>
  );
};

export default UserProfile;
