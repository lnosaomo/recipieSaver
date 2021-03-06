import React, { Fragment, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ContactContext from '../../context/recipe/recipeContext';
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
import M from 'materialize-css/dist/js/materialize.min.js';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const RecipieItem = ({ recipie, id }) => {
  const recipeContext = useContext(ContactContext);
  const authContext = useContext(AuthContext);
  const { isAuthenticated } = authContext;
  const { currentFoodName, addContact } = recipeContext;

  const { contactAdded, contacts } = recipeContext;

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
      <CardHeader title={recipie.recipe.label} />

      <CardMedia
        className={classes.media}
        image={recipie.recipe.image}
        title='Paella dish'
        onClick={handleExpandClick}
      />
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>
          Calories : {recipie.recipe.calories.toFixed()}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Number of Ingredients : {recipie.recipe.ingredientLines.length}
        </Typography>
        <Typography variant='body2' color='textSecondary' component='p'>
          Source : {recipie.recipe.source}
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
          href={isAuthenticated ? '#' : '#'}
          onClick={() => {
            if (isAuthenticated) {
              addContact(recipie.recipe);
            } else {
              M.toast({ html: 'You must be logged in to save a recipe' });
            }
          }}
        >
          Save recipe
        </Button>
      </CardActions>
      <Collapse in={expanded} timeout='auto' unmountOnExit>
        <CardContent>
          <strong>Ingredients List:</strong>
          <Typography variant='body2' color='textSecondary' component='p'>
            {recipie.recipe.ingredientLines.map(line => (
              <li>{line}</li>
            ))}
          </Typography>
          {''}
          <Button
            size='small'
            color='primary'
            onClick={() => {
              window.open(`${recipie.recipe.url}`, '_blank');
            }}
          >
            Get Instructions
          </Button>
        </CardContent>
      </Collapse>
    </Card>
  );
};

export default RecipieItem;
