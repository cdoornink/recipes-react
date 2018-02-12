import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-firebase'

import recipeImages from '../../lib/recipe-images';
import onMenuImage from "../../images/fork-and-knife.png"
import onMenuImageBlue from "../../images/fork-and-knife-blue.png"


class Recipes extends Component {

  constructor() {
    super();

    this.state = {
      filterInput: '',
      onMenuFilter: false,
    }
  }

  onChangeHandler(e){
    this.setState({
      filterInput: e.target.value,
    });
  }

  toggleOnMenuFilter(e) {
    this.setState({
      onMenuFilter: !this.state.onMenuFilter
    });
  }

  filterOutRetiredRecipes(recipes) {
    return recipes.filter(recipe => !recipe.retired);
  }

  filterWithSearchInput(recipes) {
    return recipes.filter(recipe =>
      this.state.filterInput === '' ||
      recipe.title.toLowerCase().indexOf(this.state.filterInput.toLowerCase()) !== -1
    );
  }

  filterOnMenuRecipes(recipes) {
    return recipes.filter(recipe => recipe.onMenu && !recipe.isCooked);
  }

  filterRecipes(recipes) {
    recipes = this.filterOutRetiredRecipes(recipes);
    recipes = this.filterWithSearchInput(recipes);
    if (this.state.onMenuFilter) {
      recipes = this.filterOnMenuRecipes(recipes);
    }
    return recipes;
  }

  sortAlphabetically(recipes) {
    return recipes.sort((a, b) => {
      if (a.title < b.title) {
        return -1;
      }
      if (a.title > b.title) {
        return 1;
      }
      return 0;
    });
  }

  renderRecipes(recipes) {
    if(recipes) {
      let filteredRecipes = this.filterRecipes(recipes)

      filteredRecipes = this.sortAlphabetically(filteredRecipes)

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
        {this.state.onMenuFilter &&
          <button
            className="filter-button -selected"
            onClick={this.toggleOnMenuFilter.bind(this)}
          >
            <img className="on-menu-image" src={onMenuImageBlue} alt="Current menu only" />
            <div className="button-title">On current menu</div>
          </button>
        }
        {!this.state.onMenuFilter &&
          <button
            className="filter-button"
            onClick={this.toggleOnMenuFilter.bind(this)}
          >
            <img className="on-menu-image" src={onMenuImage} alt="Show current menu" />
            <div className="button-title">On current menu</div>
          </button>
        }
        {this.renderRecipes(this.props.recipes)}
      </div>
    );
  }
}

export default connect((props, ref) => ({
  recipes: 'recipes',
  // setValue: value => ref('counterValue').set(value)
}))(Recipes)
