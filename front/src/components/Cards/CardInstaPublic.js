import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Box, { BoxProps } from "@mui/material/Box";
import DownloadIcon from "@mui/icons-material/Download";
import axios from "axios";
import { saveAs } from "file-saver";
import {
  MdPublic,
  RiGitRepositoryPrivateFill,
  AiOutlineFileAdd,
} from "react-icons/all";

const CardInstaPublic = (props) => {
  const [nom, setNom] = useState(props.nom);
  const [description, setDescription] = useState(props.description);
  const [imaageUrl, setImageUrl] = useState(props.imgUrl);
  const [open, setOpen] = useState(false);
  const [priver, setPriver] = useState(props.priver);
  const [cacher, setCacher] = useState(props.cacher);

  
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
    
    </Card>
  );
};

export default CardInstaPublic;
