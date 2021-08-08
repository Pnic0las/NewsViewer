import React, { Fragment } from "react";
import Card_News from "../components/Card_News"
import Grid from '@material-ui/core/Grid';
import { useAuth0 } from "../react-auth0-spa";
import { useState, useEffect } from "react"
import axios from "axios";

const Favoris = () => {

    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();
    const [tabsValue, setTabsValue] = React.useState([]);
    const [bool, setbool] = useState(false);

    console.log("favoris")
    useEffect(() => {
        var NewsArray = []
        if (bool === false) {
            
            setbool(true);
        }
        axios({
            method: 'post',
            url: 'http://127.0.0.1:8080/users/users/favori/favori',
            headers: {
                'Content-Type': 'application/json'
            },
            data: ({
                username: user.name,
            })
        }).then(res => {
            console.log(res.data)
            res.data.data.favoris.forEach(function (item) {
                var News = {};
                News["name"] = item.name;
                News["author"] = item.author;
                News["title"] = item.title;
                News["url"] = item.url;
                News["image"] = item.urlToImage;
                News["content"] = item.content;

                NewsArray.push(News);

            })
            console.log(NewsArray);
            setTabsValue(NewsArray);
        })
    },[bool]);

    return (
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
        </>
    )
}

export default Favoris;