//requires the main stylesheet from Sass sourcemap
require('./main.scss');

//Left to go:
//  1.) Create "cards" that users can click on to get the rest of the data
//  2.) Add another field which is the instruction fields
//  3.) Plan for a more permanment setLocalStorage

//Important React Modules
import React from 'react';
import {render} from 'react-dom';
import Recipes from './Recipes';
import Add from './Add';
// import { Button } from 'react-bootstrap';

const initialState = {
  recipes: [
    {
      name: 'Cereal',
      ingredients: ['cornflakes', 'milk', 'sugar', 'spoon']
    },
    {
      name: 'Fried Rice',
      ingredients: ['rice', 'egg yolk', 'peas', 'carrots', 'onion']
    }
  ]
}

class App extends React.Component {
  constructor(props) {
    super(props);
    if (!localStorage.getItem('appState')) {
      localStorage.setItem('appState', JSON.stringify(initialState));
    }
    this.state = JSON.parse(localStorage.getItem('appState'));
    this.editRecipeName = this.editRecipeName.bind(this);
    this.setLocalStorage = this.setLocalStorage.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
  }

  setLocalStorage () {
    localStorage.setItem('appState', JSON.stringify(this.state));
  }

  editRecipeName(oldName, newItem) {
    const oldState = this.state.recipes;
    const newState = oldState.map(elem => {
      if (elem.name === oldName) {
        return newItem;
      }
      return elem;
    });
    this.setState({recipes: newState});
  }


  addRecipe(newItem) {
    const newState = [...this.state.recipes, newItem];
    if(newState[newState.length -1 ].name == '') {
      newState[newState.length -1 ].name = 'Unnamed Recipe';
    }
    if(newState[newState.length -1].ingredients.length <= 1 ) {
      newState[newState.length -1].ingredients[0] = 'No ingredients listed'
    }

    this.setState({ recipes: newState })
  }

  deleteRecipe(name) {
    const newState = this.state.recipes.filter(elem => elem.name !== name);
    this.setState({recipes: newState});
  }

  render() {
    this.setLocalStorage();

    const display = this.state.recipes.map((elem, idx) => {
      return (
          <Recipes editItem={this.editRecipeName} delete={this.deleteRecipe} key={idx} recipe={elem}/>
    )
    })

    return (
      <div>
        <div className="recipes">
          {display}
        </div>
        <Add editItem={this.addRecipe} key={0}>Add Recipe</Add>
      </div>
    )
  }
}



render(<App />, document.getElementById('app'))
