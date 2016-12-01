import React from 'react';
import { Button } from 'react-bootstrap';
import View from './View';

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
  
  render() {
    return (
      <div>
        <h3>
          {this.props.recipe.name}
        </h3>
        <div>
          <View recipe={this.props.recipe} editItem={this.props.editItem} >Edit</View>
          <Button bsStyle="danger" onClick={this.deleteItem}>Delete</Button>
        </div>
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
