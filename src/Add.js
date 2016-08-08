import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import keydown from 'react-keydown';


class Add extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      originalName: '',
      originalIngredients: '',
      recipe: {
        name: '',
        ingredients:['']
      }
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
    this.completeEdit = this.completeEdit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.removeInput = this.removeInput.bind(this);
    this.cancelAdd = this.cancelAdd.bind(this);
    this.addInput = this.addInput.bind(this);
    this.handleIngredientEdit = this.handleIngredientEdit.bind(this);
    this.handleKeyEvent = this.handleKeyEvent.bind(this);
  }


  handleKeyEvent(event) {
    console.log(event.target.id);
    if(event.keyCode == 13 && event.target.id == this.state.recipe.ingredients.length - 1) {
      this.addInput();
    }
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

  completeEdit() {
    //Need to update parent div with new items.
    this.close();
    this.props.editItem(this.state.recipe);
    this.setState({ recipe: {name: '', ingredients: [''] }})
  }

  //Create a function that when users clicks cancel in the edit screen, all changes are discarded and recipe becomes original prior to the prompt for edit.
  cancelAdd() {
    const name = '';
    const ingredients = [''];
    this.setState({recipe: {name, ingredients}});
    this.close()
  }
  //create a function that prompts the edit modal with an empty recipe name and at least one empty ingredient string
    //When user clicks save, the recipe is added to our AppData array so it can be rendered to the screen.

  addInput() {
    const name = this.state.recipe.name;
    const ingredients = this.state.recipe.ingredients;
    const recipe = {name, ingredients: [...ingredients, ""]};
    //this.props.editItem(this.state.originalName, recipe);
    this.setState({recipe})
  }

  addInputKey(event) {
    console.log("enter key was entered")
    if(event.charCode == 13) {
      this.addInput();
    }
  }

  removeInput() {
    const name = this.state.recipe.name;
    const ingredients = this.state.recipe.ingredients.slice(0, -1);
    const recipe = {name, ingredients};
    if(this.state.recipe.ingredients.length >= 2) {
      this.setState({recipe});
    }
  }


  close() {
    this.setState({ showModal: false });
  }

  open() {
    this.setState({ showModal: true });
  }

  render() {
    const ingredients = this.state.recipe.ingredients.map((elem, idx) => {
      return <input name="ingredients"
        id={idx}
        key={idx} type="text"
        onChange={this.handleIngredientEdit}
        value={elem}
        onKeyDown={this.handleKeyEvent}
        autoFocus={true} />
    });

    return (
      <div>
        <Button
          bsStyle="success"
          onClick={this.open}>
          Add Recipe
        </Button>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Add a new Recipe</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="form">
            <label htmlFor="recipe">name</label>
            <input type="text" value={this.state.recipe.name} onChange={this.handleChange} />
            </div>
            <hr />
            <div className="form">
            <label htmlFor="ingredients">ingredients</label>
            {ingredients}
            <Button bsStyle="success" onClick={this.addInput}>Add</Button>
            <Button bsStyle="danger" onClick={this.removeInput}>Remove</Button>

            </div>

          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.completeEdit}>Save</Button>
            <Button onClick={this.cancelAdd}>Cancel</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )}
}

Add.propTypes = {
  editItem: React.PropTypes.func.isRequired
}

module.exports = Add;
