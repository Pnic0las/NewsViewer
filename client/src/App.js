import React, {useEffect } from "react";
import { Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";
import axios from "axios";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Profile from "./views/Profile";
import Catego from "./views/Categories";
import { useAuth0 } from "./react-auth0-spa";
import history from "./utils/history";
import Mag from "./views/Mag"
import WorldMap from "./views/Map"
import Favoris from "./views/Favoris"
import Fav from "./components/Fav"

import Theme from "./views/Theme"
// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();


const App = () => {
  const { loading, user, isAuthenticated } = useAuth0();
  var userInfo;
  const [tabsValue, setTabsValue] = React.useState([]);

  useEffect(() => {
      var NewsArray = []
      axios.get("https://newsapi.org/v2/top-headlines?country=us&apiKey=d60440710b1641e6a5fcfe0ffb3a3767")
        .then(res => {
          res.data.articles.forEach(function(item) {
            var News = {};
            News["name"] = item.source.name;
            News["author"] = item.author;
            News["title"] = item.title;
            News["description"] = item.description;
            News["url"] = item.url;
            News["image"] = item.urlToImage;
            News["content"] = item.content;
    
            NewsArray.push(News);
            
          })
          console.log(NewsArray);
          setTabsValue(NewsArray);
        })
    },[])
  
    
  if (loading) {
    return <Loading />;
  }

  if (isAuthenticated) {
    const data = {
      "name": user.name,
      "mail": user.email
    }
    console.log("Logged In ! omg", data);

    axios.post(
      "http://localhost:8080/users",
      data,
      {
        "headers": {
          "Content-Type": "application/json"
        }
      })
      .then(response => {
        userInfo = response.data.data.id;
        console.log("USER INFO =" , userInfo);
      })
      .catch(error => {
        console.log(error);
        // alert("Log in Failed !\nPlease refresh this page and re-log in")
      });
  }


  return (
    <Router history={history}>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact render={(props) => <Home {...props} Newsdata ={tabsValue} />} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/fav" component={Catego}/>
            <PrivateRoute path="/mag" component={Mag} />
            <Route path="/map" component={WorldMap} />
            <Route path="/Theme" component={Theme} />
            <PrivateRoute path="/favoris" component={Favoris} />
          </Switch>
        </Container>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
