import React from 'react';
import Edit from './Edit'
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';

class View extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      name: this.props.recipe.name,
      ingredients: this.props.recipe.ingredients,
      recipe: this.props.recipe
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
    this.filterIngredients = this.filterIngredients.bind(this);
  }

  handleChange(event) {
    const name = event.target.value;
    const ingredients = this.state.recipe.ingredients;
    this.setState({recipe: {name, ingredients}});
  }

  handleIngredientEdit(event) {
    const name = this.state.recipe.name;
    const ingredients = this.state.recipe.ingredients;
    const newState = ingredients.map((elem, idx) => {
      if (idx === +event.target.id) {
        return event.target.value;
      }

      return elem;
    });
    this.setState({recipe: {name, ingredients: newState}});
  }

  filterIngredients(ingred) {
    var ingredients = ingred.filter(function(elem) {
      if(elem !== '') {
        return elem;
      }
    })
    return ingredients;
  }

  handleKeyEvent(event) {
    if(event.keyCode == 13 && event.target.id == this.state.recipe.ingredients.length - 1) {
      this.addInput();
    }
  }

  //create a function that prompts the edit modal with an empty recipe name and at least one empty ingredient string
    //When user clicks save, the recipe is added to our AppData array so it can be rendered to the screen.

  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const ingredients = this.props.recipe.ingredients.map((elem, idx) => {
      if(elem !== '') {
        return (
          <li key={idx} id={idx}>{elem}</li>
        )
      }
    });
    return (
      <div>
        <Button
          bsStyle="info"
          onClick={this.open}>
          View
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form">
              <h2>{this.props.recipe.name}</h2>
              </div>
              <hr />
              <div className="form">
              {ingredients}
              <div className="form">
              <Edit recipe={this.props.recipe} editItem={this.props.editItem}>Edit</Edit>
              </div>
            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Go Back</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )}
}

Edit.propTypes = {
  recipe: React.PropTypes.object.isRequired,
  editItem: React.PropTypes.func.isRequired
}

module.exports = View;
