import React, { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Box, { BoxProps } from '@mui/material/Box';
import DownloadIcon from '@mui/icons-material/Download';
import { saveAs } from "file-saver";


const CardInsta = (props : any) => {
    
    const [nom,setNom] = useState(props.nom);
    const [description,setDescription] = useState(props.nom);
    const [imaageUrl,setImageUrl] = useState(props.nom);
    const [open, setOpen] = React.useState(false);
    const [openEdit, setOpenEdit] = React.useState(false);
    
    const handleClickOpen = (id : Number) => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const handleClickUpdate = (id : Number) => {
        setOpenEdit(true);
      };
    
      const handleCloseUpdate = () => {
        setOpenEdit(false);
      };

    const deleteImage = (id : Number)=> {
        //axios
    }

    const updateImage = (id : Number)=> {
        //axios
    }

    const downloadImage =  ()=> {
       saveAs(props.imgUrl,`${props.nom}.png`)
    } 

    useEffect( () => {
       
    },[]);

    return (
        <Card sx={{ maxWidth: 345 }} className='cardInsta'>
        <CardHeader
            avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                R
            </Avatar>
            }
            action={
            <IconButton aria-label="settings">
                <MoreVertIcon />
            </IconButton>
            }
            title={props.title}
            subheader={props.title}
        />
        <CardMedia
            component="img"
            height="194"
            image="https://unsplash.it/350/200"
            alt="Paella dish"
        />
        <CardContent>
            <Typography variant="body2" color="text.secondary">
                {props.content}
            </Typography>
        </CardContent>
        <CardActions disableSpacing>
            <IconButton aria-label="add to favorites">
                 <EditIcon onClick={()=> {handleClickUpdate(props.id)}}/>
            </IconButton>
            <IconButton aria-label="share">
                <DeleteIcon onClick={()=> {handleClickOpen(props.id)}} />
            </IconButton>
            <IconButton aria-label="share">
                <DownloadIcon onClick = {downloadImage} />
          
            </IconButton>
            
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
          <Button onClick={()=> {deleteImage(props.id)}} autoFocus>
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
            onChange={(e)=> {setNom(e.target.value)}}
            variant="standard"
          />
          <TextField
            margin="dense"
            name="description"
            label="Description du l'image"
            value={description}
            onChange={(e)=> {setDescription(e.target.value)}}
            fullWidth
            variant="standard"
            rows={6}
                        
          />
            <Box sx={{ display: 'flex',flexDirection: 'column' }}>
                <img
                    src={`${imaageUrl}`}
                    alt="hh"
                    loading="lazy"
                    id="img-update"
                />
                <div>
                    <Button variant="contained" component="label">
                        Upload
                    <input hidden accept="image/*" multiple type="file" />
                    </Button>
                    <IconButton color="primary" aria-label="upload picture" component="label" >
                    <input hidden accept="image/*" type="file"  onChange={(e)=> {setImageUrl(e.target.value)}} />
                    <PhotoCamera />
                    </IconButton>
                </div>
               
            </Box>
            
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseUpdate}>Annuler</Button>
          <Button onClick={()=> {updateImage(props.id)}}>Modifier</Button>
        </DialogActions>
      </Dialog>

    </Card>
    )
}

export default CardInsta