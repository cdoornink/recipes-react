import React, { Component } from "react";
import { connect } from 'react-firebase';

import recipeImages from '../../lib/recipe-images';

class Recipes extends Component {
  constructor() {
    super();

    this.state = {
      recipe: null
    }
  }

  componentWillReceiveProps(nextProps) {
      if (!this.props.recipes && nextProps.recipes) {
        this.setState({'recipe': nextProps.recipes.find(recipe => recipe.id === this.props.match.params.id)});

      }
  }

  render() {
    let { recipe } = this.state;

    console.log(recipe);
    return (
      <div className="recipe-page main">
        {recipe &&
          <div className="recipe">
            <div className="image" style={{backgroundImage: `url(${recipeImages[recipe.id]})`}}></div>
            <div className="title">{recipe.title}</div>
            <div className="ingredients-list">
              <div className="title">INGREDIENTS</div>
              {recipe.ingredients.map( (ingredient, i) =>
                <div
                  key={i}
                  className={`ingredient ${ingredient.section && "section"}`}
                >
                  <span className="amount">
                    {ingredient.amount}
                  </span>{' '}
                  <span className="name">
                    {ingredient.name}
                  </span>
                  {ingredient.section &&
                    <span className="section">
                      {ingredient.section.toUpperCase()}:
                    </span>
                  }
                </div>
              )}
            </div>
            <div className="instructions">
              <div className="title">DIRECTIONS</div>
              {recipe.instructions.map( (instruction, i) =>
                <div key={i} className="instruction">
                  {instruction}
                </div>
              )}
            </div>

          </div>
        }
        {!recipe &&
          <div className="loading-message"> loading yummy recipe... </div>
        }
      </div>
    );
  }
}

export default connect((props, ref) => ({
  recipes: 'recipes',
  // setValue: value => ref('counterValue').set(value)
}))(Recipes)
