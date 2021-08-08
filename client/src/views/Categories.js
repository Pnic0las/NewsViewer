import  React from "react";
import {useState, useEffect} from "react"
import Fav from '../components/Fav'
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button'
import Card_News from "../components/Card_News";
import axios from "axios";

function Catego () {

    const [bool, setbool] = useState(true);
    const [choix, setchoix] = useState();

    const [tabsValue, setTabsValue] = React.useState([]);

    useEffect(() => {
        var NewsArray = []
        axios.get("https://newsapi.org/v2/top-headlines?category="+choix+"&apiKey=d60440710b1641e6a5fcfe0ffb3a3767")
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
      },[choix])

    return(
        <>
            {bool && (
            <Fav bool={setbool} setchoix={setchoix} />
            )}
            {!bool && (
                <>
                <Grid container justify="center" spacing={4}>
                <>
                  {
                    tabsValue.map(function (item, index) {
                      return (
                        <Grid key={index} item>
          
                          <Card_News Newsdata={item} />
                        </Grid>
                      )
                    })
                  }
                </>
              </Grid>
              <Button onClick={() => setbool(true)}>Back to choices </Button>
              </>
            )}
        </>
    )
}

export default Catego;