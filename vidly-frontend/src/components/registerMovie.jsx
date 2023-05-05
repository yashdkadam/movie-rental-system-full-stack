import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { getMovie, saveMovie } from "./../services/fakeMovieService";

class RegisterForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      numberInStock: "",
      dailyRentalRate: "",
    },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label("numberInStock"),
    dailyRentalRate: Joi.number()
      .required()
      .min(0)
      .max(10)
      .label("dailyRentalRate"),
  };

  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const moviesId = this.props.match.params.id;
    console.log(this.props.match.params.id);
    if (moviesId === "new") return;

    const movie = getMovie(moviesId);
    console.log(movie);
    if (!movie) return this.props.history.replace("not-found");

    this.setState({ data: this.mapToViewModel(movie) });
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
  };

  render() {
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("Title", "title")}
          {this.renderSelect("Genre", "genreId", this.state.genres)}
          {this.renderInput("Stock", "stock")}
          {this.renderInput("Rate", "rate")}

          {this.renderButton("Login")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
