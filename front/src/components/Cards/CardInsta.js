import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { saveAs } from "file-saver";
import {
  MdPublic,
  RiGitRepositoryPrivateFill,
  AiOutlineFileAdd,
} from "react-icons/all";

const CardInsta = (props) => {
  const [nom, setNom] = useState(props.nom);
  const [description, setDescription] = useState(props.description);
  const [imaageUrl, setImageUrl] = useState(props.imgUrl);
  const [open, setOpen] = useState(false);
  const [priver, setPriver] = useState(props.priver);
  const [openEdit, setOpenEdit] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);

  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickUpdate = (id) => {
    setOpenEdit(true);
  };

  const handleCloseUpdate = () => {
    setOpenEdit(false);
  };

  const handleClickOpenAdd = () => {
    setOpenAdd(true);
  };

  const handleClickCloseAdd = () => {
    setOpenAdd(false);
  };

  const deleteImage = (id) => {
    axios
      .delete(`${props.api}/insta/photos/${id}`, {
        headers: { Authorization: `Bearer ${props.currentUser.jwt}` },
      })
      .then((response) => {
        if (response.status === 200) {
          props.getImages();
          setOpen(false);
        }
      });
  };

  const updateImage = (id) => {
    var imagedata = document?.querySelector('input[type="file"]')?.files[0];
    let datasPath = {
      path: imagedata,
    };
    axios
      .post(`${props.api}/insta/photos/path`, datasPath, {
        headers: {
          Authorization: `Bearer ${props.currentUser.jwt}`,
          "Content-Type": "multipart/form-data",
          accept: "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log();
          props.getImages();
          setOpenAdd(false);
          let datas = {
            nom: nom,
            priver: priver,
            description: description,
            urlPhoto: response.data,
          };
          axios
            .put(`${props.api}/insta/photos/${id}`, datas, {
              headers: { Authorization: `Bearer ${props.currentUser.jwt}` },
            })
            .then((response) => {
              if (response.status === 200) {
                props.getImages();
                setOpenAdd(false);
              }
            });
        }
      });
  };

  const addImage = () => {
    var data = new FormData();
    var imagedata = document?.querySelector('input[type="file"]')?.files[0];

    data.append("imagedata", imagedata);

    let datasPath = {
      path: imagedata,
    };
    let path = "ok";
    axios
      .post(`${props.api}/insta/photos/path`, datasPath, {
        headers: {
          Authorization: `Bearer ${props.currentUser.jwt}`,
          "Content-Type": "multipart/form-data",
          accept: "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          props.getImages();
          setOpenAdd(false);
          let datas = {
            user: "nom",
            nom: nom,
            priver: true,
            cacher: false,
            creationData: Date.now(),
            description: description,
            urlPhoto: response.data,
          };
          axios
            .post(`${props.api}/insta/photos`, datas, {
              headers: { Authorization: `Bearer ${props.currentUser.jwt}` },
            })
            .then((response) => {
              if (response.status === 200) {
                props.getImages();
                setOpenAdd(false);
              }
            });
        }
      });

    console.log(data.get("imagedata"));
  };
  const downloadImage = () => {
    saveAs(props.imgUrl, `${props.nom}.png`);
  };

  useEffect(() => {}, []);

  return (
    <Card sx={{ maxWidth: 345 }} className="cardInsta">
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        title={props.nom}
        subheader={props.user}
      />
      <CardMedia
        component="img"
        height="194"
        image={`${props.imgUrl}/350/200`}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <EditIcon
            onClick={() => {
              handleClickUpdate(props.id);
            }}
          />
        </IconButton>
        <IconButton aria-label="share">
          <DeleteIcon
            onClick={() => {
              handleClickOpen(props.id);
            }}
          />
        </IconButton>
        <IconButton aria-label="share">
          <DownloadIcon onClick={downloadImage} />
        </IconButton>

        {priver ? (
          <IconButton aria-label="share right-priver-public">
            <RiGitRepositoryPrivateFill />
          </IconButton>
        ) : (
          <IconButton aria-label="share right-priver-public">
            <MdPublic />
          </IconButton>
        )}
      </CardActions>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {`Supprimer l'image ${props.nom}`}
        </DialogTitle>

        <DialogActions>
          <Button onClick={handleClose}>Annuler</Button>
          <Button
            onClick={() => {
              deleteImage(props.id);
            }}
            autoFocus
          >
            Accepter
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog open={openEdit} onClose={handleCloseUpdate}>
        <DialogTitle>Modifier l'image {props.nom}</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom d'image"
            type="text"
            fullWidth
            value={nom}
            onChange={(e) => {
              setNom(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            margin="dense"
            name="description"
            label="Description du l'image"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
            variant="standard"
            rows={6}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <img src={`${imaageUrl}`} alt="hh" loading="lazy" id="img-update" />
            <div>
              <Button variant="contained" component="label">
                T??l??charger
                <input accept="image/*" multiple type="file" name="photo" />
              </Button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Annuler</Button>
          <Button
            onClick={() => {
              updateImage(props.id);
            }}
          >
            Modifier
          </Button>
        </DialogActions>
      </Dialog>
      <IconButton aria-label="share">
        <AiOutlineFileAdd
          onClick={() => {
            handleClickOpenAdd();
          }}
        />
      </IconButton>
      <Dialog open={openAdd} onClose={handleCloseUpdate}>
        <DialogTitle>Ajouter une image</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nom d'image"
            type="text"
            fullWidth
            onChange={(e) => {
              setNom(e.target.value);
            }}
            variant="standard"
          />
          <TextField
            margin="dense"
            name="description"
            label="Description du l'image"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            fullWidth
            variant="standard"
            rows={6}
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <div>
              <Button variant="contained" component="label">
                T??l??charger
                <input accept="image/*" multiple type="file" name="photo" />
              </Button>
            </div>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClickCloseAdd}>Annuler</Button>
          <Button
            onClick={() => {
              addImage();
            }}
          >
            Ajouter
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default CardInsta;
