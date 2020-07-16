import React, { useContext } from 'react';
import ContactContext from '../../context/recipe/recipeContext';
import { Link } from 'react-router-dom';
import AuthContext from '../../context/auth/authContext';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';

import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const ContactItem = ({ contact, id }) => {
  const recipeContext = useContext(ContactContext);
  const { deleteContact, setCurrent, clearCurrent } = recipeContext;

  const { _id, label, url, ingredientLines, image, source, calories } = contact;

  const onDelete = () => {
    deleteContact(_id);
  };

  const useStyles = makeStyles(theme => ({
    root: {
      maxWidth: 345
    },
    media: {
      height: 0,
      paddingTop: '56.25%' // 16:9
    },
    expand: {
      transform: 'rotate(0deg)',
      marginLeft: 'auto',
      transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest
      })
    },
    expandOpen: {
      transform: 'rotate(180deg)'
    },
    avatar: {
      backgroundColor: red[500]
    }
  }));

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card className={classes.root}>
      <CardHeader title={label} />

      <CardMedia
        className={classes.media}
        image={image}
        title='Paella dish'
        onClick={handleExpandClick}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          Calories : {calories.toFixed()}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Number of Ingredients : {ingredientLines.length}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Source : {source}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label='show more'
        >
          <ExpandMoreIcon />
        </IconButton>
        <Button
          size='small'
          color='primary'
          onClick={() => {
            onDelete();
          }}
        >
          Delete
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <strong>Ingredients List:</strong>
          <Typography variant='body2' color='textSecondary' component='p'>
            {ingredientLines.map(line => (
              <li>{line}</li>
            ))}
          </Typography>
          {''}
          <Button
            size='small'
            color='primary'
            onClick={() => {
              window.open(`${url}`, '_blank');
            }}
          >
            Get Instructions
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default ContactItem;
