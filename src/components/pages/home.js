import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-firebase'

import recipeImages from '../../lib/recipe-images';

class Recipes extends Component {

  constructor() {
    super();

    this.state = {
      filterInput: ''
    }
  }

  onChangeHandler(e){
    this.setState({
      filterInput: e.target.value,
    })
  }

  renderRecipes(recipes) {
    if(recipes) {
      let filteredRecipes = recipes.filter(recipe => {
        if (recipe.retired) {
          return false
        }

        if (this.state.filterInput === '' ) {
          return true
        }

        return recipe.title.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1
      });

      return filteredRecipes.map(recipe =>
        <Link className="recipe-grid-item" key={recipe.id} to={`recipe/${recipe.id}`}>
          <div className="image" style={{backgroundImage: `url(${recipeImages[recipe.id]})`}}></div>
          <div className="title">
            {recipe.title}
          </div>
        </Link>
      )
    } else {
      return <div className="loading-message"> loading recipes... </div>
    }
  }

  render() {
    return (
      <div className="recipes main">
        <input
          className="filter"
          value={this.state.filterInput}
          type="text"
          onChange={this.onChangeHandler.bind(this)}
          placeholder="Search for a recipe"
        />
        {this.renderRecipes(this.props.recipes)}
      </div>
    );
  }
}

export default connect((props, ref) => ({
  recipes: 'recipes',
  // setValue: value => ref('counterValue').set(value)
}))(Recipes)
