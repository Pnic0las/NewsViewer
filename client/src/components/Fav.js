
import React, { Component } from "react";
import Checkbox from "./Checkbox";
import "../choix.css"
import { useState, useEffect } from "react"
import axios from "axios";
import { useAuth0 } from "../react-auth0-spa";

const OPTIONS = ["business", "general", "health", "science", "sports", "technology"];

var ThemeArray = [];

class Fav extends Component {
  state = {
    checkboxes: OPTIONS.reduce(
      (options, option) => ({
        ...options,
        [option]: false
      }),
      {}
    ),
    CHOIX: []
  };

  selectAllCheckboxes = isSelected => {
    Object.keys(this.state.checkboxes).forEach(checkbox => {
      this.setState(prevState => ({
        checkboxes: {
          ...prevState.checkboxes,
          [checkbox]: isSelected
        }
      }));
    });
  };

  selectAll = () => this.selectAllCheckboxes(true);

  deselectAll = () => this.selectAllCheckboxes(false);

  handleCheckboxChange = changeEvent => {
    const { name } = changeEvent.target;

    this.setState(prevState => ({
      checkboxes: {
        ...prevState.checkboxes,
        [name]: !prevState.checkboxes[name]
      }
    }));
  };

  getInfo = () => {
    const user = "Gence Kylian";
    var data = {
      "id": user,
    }
    axios.post(
      "http://localhost:8080/users/theme/theme",
      data,
      {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        response.data.data.theme.forEach(function (item) {
          var Theme = {};
          Theme["name"] = item.name;
          ThemeArray.push(Theme);
        })
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
      console.log("TESSSSSSSSSSSST");
      console.log(ThemeArray);
      this.setState(ThemeArray);
  };

  postInfo = (name) => {
    const user = "Gence Kylian";
    var data = {
      "name": name,
      "id": user,
    }
    axios.post(
      "http://localhost:8080/users/theme",
      data,
      {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  handleFormSubmit = formSubmitEvent => {
    var tmpch = []
    var tab = []
    formSubmitEvent.preventDefault();

    Object.keys(this.state.checkboxes)
      .filter(checkbox => this.state.checkboxes[checkbox])
      .forEach(checkbox => {
        this.postInfo(checkbox);
        tmpch.push(checkbox);
      });
    if (tmpch.length == 1) {
      this.getInfo();
      console.log(ThemeArray);
      this.setState({ CHOIX: tmpch })
      console.log(ThemeArray);
    }
    else{
      alert("WARNING : You can only select 1 purpose !")
    }
  };


  createCheckbox = option => (
    <Checkbox
      label={option}
      isSelected={this.state.checkboxes[option]}
      onCheckboxChange={this.handleCheckboxChange}
      key={option}
    />
  );

  createCheckboxes = () => OPTIONS.map(this.createCheckbox);

  onSubmit = (choice) => {
    this.props.setchoix(choice)
    this.props.bool(false)
  }

  render() {
    return (
      <div className="container">
        <h1 id="ttc">What is your choice ?</h1>
        <div className="row mt-5">
          <div className="col-sm-12">
            <form onSubmit={this.handleFormSubmit}>
              {this.createCheckboxes()}
              <div className="form-group mt-2">

                <button type="submit" className="btn btn-primary">
                  Choose
                </button>
              </div>
            </form>
          </div>
        </div>
        <div id="box1"><h4>Your choice is : <br></br><br></br>{this.state.CHOIX.map(choice => { return (<button  id="bouton1" key={choice} onClick={() => this.onSubmit(choice)} >{choice}</button>) })}</h4></div>
      </div>
    );
  }
}

export default Fav;