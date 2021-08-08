import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { red } from '@material-ui/core/colors'
import { useAuth0 } from "../react-auth0-spa";
import axios from "axios"

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function MediaCard({ Newsdata }) {
  const classes = useStyles();
  const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();


  const AddtoFav = (username, Name, Image, Title, Content, Url, Author) => {
    // console.log(username)
    // console.log(Name)
    // console.log(Image)
    // console.log(Title)
    // console.log(Content)
    // console.log(Url)
    // console.log(Author)

    axios({
      method: 'post',
      url: 'http://127.0.0.1:8080/users/users/favori/',
      headers: {
        'Content-Type': 'application/json'
      },
      data: ({
        username: username,
        name: Name,
        author: Author,
        title: Title,
        url: Url,
        urlToImage: Image,
        content: Content,
      })
    }).then(res => {
      console.log(res)
    }).catch(function (error) {
      console.log(error);
    });



  }
  return (
    <Card className={classes.root}>
      <CardActionArea>
        <Typography variant="body2" color="textSecondary" component="p">
          {Newsdata.name}
        </Typography>
        <CardMedia
          className={classes.media}
          image={Newsdata.image}
          title={Newsdata.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {Newsdata.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {Newsdata.content}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {isAuthenticated && (
          <IconButton size="small" color="primary">
            <FavoriteIcon style={{ color: red[500] }} onClick={() => AddtoFav(user.name, Newsdata.name, Newsdata.image, Newsdata.title, Newsdata.content, Newsdata.url, Newsdata.author)} />
          </IconButton>
        )}
        <Button size="small" color="primary" href={Newsdata.url} target="_blank">
          Learn More
        </Button>
        <Typography variant="body2" color="textSecondary" component="p">
          Author :{Newsdata.author}
        </Typography>
      </CardActions>
    </Card>
  );
}
