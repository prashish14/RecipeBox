import React from 'react';
import { Button } from 'react-bootstrap';
import Edit from './Edit';

class Recipes extends React.Component {
  constructor() {
    super();
    this.state = {
      showEdit: false,
      recipe: null
    }
    this.deleteItem = this.deleteItem.bind(this);
  }

  deleteItem() {
    this.props.delete(this.props.recipe.name);
  }
  
  //a method that will add another recipe to our AppData array. 
 
  render() {
    const ingredients = this.props.recipe.ingredients.map((elem, idx) => {
      return (
        <li key={idx}>{elem}</li>
      )
    });

    return (
      <div>
        <h1>
          {this.props.recipe.name}
        </h1>
        <ul>
          { ingredients }
        </ul>
        <Edit recipe={this.props.recipe} editItem={this.props.editItem} >Edit</Edit>
        <Button bsStyle="danger" onClick={this.deleteItem}>Delete</Button>
        //Add Recipe button that stays fixed to the screen and is easy to navigate
      </div>
    );
  }
}

Recipes.propTypes = {
  recipe : React.PropTypes.object.isRequired,
  editItem: React.PropTypes.func.isRequired,
  delete: React.PropTypes.func.isRequired
};

module.exports = Recipes;

