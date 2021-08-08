var express = require('express');
var router = express.Router();
var User = require('../shema')
var writeResponse = require('../utils/writeResponse');

/* GET ALL users listing. */
router.get('/', async (req, res) => {
  const users = await User.find()
  res.status(200).json(writeResponse(true, "Data Found", users))
});

router.post("/users/favori/favori", async (req, res) => {
  const id = req.body.username;

  console.log(id);
  User.findOne(
    {
      "info.name": id
    },
    function (err, user) {
      if (err)
        res.status(500).json(writeResponse(false, "Cannot get favori"));
      else {
        console.log(user);
        if (user) {
            res.status(200).json(writeResponse(true, "Favori log success", {
              "id": user._id,
              "favoris": user.favoris,
            }));
        }
        else {
          res.status(404).json(writeResponse(false, "Cannot find this user"));
        }
      }
    }
  )
})

router.post("/theme/theme", async (req, res) => {
  const id = req.body.id;

  console.log("TEEEEEEEEEEST");
  User.findOne(
    {
      "info.name": id
    },
    function (err, user) {
      if (err)
        res.status(500).json(writeResponse(false, "Cannot get favori"));
      else {
        console.log(user);
        if (user) {
            res.status(200).json(writeResponse(true, "Favori log success", {
              "info.name": user.info.name,
              "theme": user.theme,
            }));
        }
        else {
          res.status(404).json(writeResponse(false, "Cannot find this user"));
        }
      }
    }
  )
})

router.get("/theme/", async (req, res) => {
  const id = req.body.id;

  console.log("TEEEEEEEEEEST");
  User.findOne(
    {
      "info.name": id
    },
    function (err, user) {
      if (err)
        res.status(500).json(writeResponse(false, "Cannot get favori"));
      else {
        console.log(user);
        if (user) {
            res.status(200).json(writeResponse(true, "Favori log success", {
              "info.name": user.info.name,
              "theme": user.theme,
            }));
        }
        else {
          res.status(404).json(writeResponse(false, "Cannot find this user"));
        }
      }
    }
  )
})

/* POST */
router.post('/users/favori', async (req, res) => {
  const name = req.body.name;
  const author = req.body.author;
  const title = req.body.title;
  const url = req.body.url;
  const urlToImage = req.body.urlToImage;
  const Content = req.body.content;
  const id = req.body.username;
  const data = {
    "name": name,
    "author": author,
    "title": title,
    "url": url,
    "urlToImage": urlToImage,
    "content": Content
  }

  if (!name) {
    res.status(401).json(writeResponse(false, "Name are missing"));
    return
  }
  User.find (
    {
      "info.name": id,
      "favoris.name": {
        $in: name
      }
    },
    function (err, success) {
      if (err)
        res.status(500).json(writeResponse(false, "Cannot find this user1", err))
      else {
        console.log(success)
        if (success && success.length == 0) {
          console.log(name)
          User.updateOne(
            { "info.name": id},
            {
              $push: {
                "favoris": {
                  name: name,
                  author: author,
                  title: title,
                  url: url,
                  urlToImage: urlToImage,
                  content: Content
                }
              }
            },
            function(error, model) {
              if (error) {
                res.status(500).json(writeResponse(false, "Cannot create new fav", error))
              }
              else {
                //console.log(model);
                if (model.n == 0)
                  res.status(404).json(writeResponse(false, "Cannot find this user2", error))
                else if (model.nModified == 0)
                  res.status(400).json(writeResponse(false, "Invalid name", name))
                else
                  res.status(201).json(writeResponse(true, "New fav added successfully", data));
              }
            }
          );
        }
        else
          res.status(400).json(writeResponse(false, "Fav already exist", name));
      }
    }
  )
});

router.post('/theme', async (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  const data = {
    "name": name
  }
  
  console.log("POST : NEW CATEGORIE ", req.body);
  console.log(name)
  console.log("IDDDDDDD  " + id)

  if (!name) {
    res.status(401).json(writeResponse(false, "Name are missing"));
    return
  }
  User.find (
    {
      "info.name": id,
      "theme.name": {
        $in: name
      }
    },
    function (err, success) {
      if (err) {
        console.log("lol");
        res.status(500).json(writeResponse(false, "Cannot find this user", err))
      }
      else {
        console.log(success)
        if (success && success.length == 0) {
          console.log(name)
          User.updateOne(
            { "info.name": id},
            {
              $push: {
                "theme": {
                  name: name
                }
              }
            },
            function(error, model) {
              console.log(error);
              if (error) {
                res.status(500).json(writeResponse(false, "Cannot add fav theme", error))
              }
              else {
                //console.log(model);
                if (model.n == 0)
                  res.status(404).json(writeResponse(false, "Cannot find this user", "error"))
                else if (model.nModified == 0)
                  res.status(400).json(writeResponse(false, "Invalid name", name))
                else
                  res.status(201).json(writeResponse(true, "New theme added successfully", data));
              }
            }
          );
        }
        else
          res.status(400).json(writeResponse(false, "Theme already exist", name));
      }
    }
  )
});

/* ADD NEW USER */
router.post('/', async (req, res) => {
  console.log("POST : NEW USER ", req.body);
  const name = req.body.name;
  var mail = req.body.mail;

  if (!name) {
    res.status(401).json(writeResponse(false, "Name or email are missing"));
    return
  }

  if (!mail) {
    mail = name + "@undefined.com"
  }

  User.find(
    {
      "info.mail": {
        $in: mail
      }
    },
    function (err, success) {
      if (err)
        res.status(500).json(writeResponse(false, "Cannot find this user", err))
      else {
        if (success && success.length == 0) {
          const new_user = new User({
            info: {
              name: name,
              mail: mail,
            }
          })
          new_user.save(function (error, model) {
            if (error)
              res.status(500).json(writeResponse(false, "Cannot create user", error))
            else
              res.status(201).json(writeResponse(true, "New user added successfully", {
                "id": new_user._id,
                "name": new_user.info.name,
                "mail": new_user.info.mail,
                "favoris": [],
                "theme": [],
              }));
          })
        }
        else {
          var userInfo = [];
          success.forEach(function (value) {
            userInfo = {
              info: value.info,
              id: value._id,
              favoris: [],
              theme: [],
            };
          });
          res.status(200).json(writeResponse(true, "Data found", userInfo))
        }
      }
    }
  )
});


/* DELETE User */

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const suppr = await User.deleteOne({ _id: id });
  res.status(204).json(writeResponse(true, "User successfully deleted", suppr));
})

router.delete('/:id/favori/', async(req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const data = {
    "name": name
  }

  if (!name) {
    res.status(401).json(writeResponse(false, "Name are missing"));
    return
  }
  User.find (
    {
      _id: id,
      "favoris.name": {
        $in: name
      }
    },
    function (err, success) {
      if (err)
      res.status(500).json(writeResponse(false, "Cannot find this user", err))
      else {
        console.log(success)
        if (success && success.length == 0) {
          res.status(400).json(writeResponse(false, "Fav don't exist", name));
        }
        else {
          console.log(name)
          User.updateOne(
            { _id: id},
            {
              $pull: {
                "favoris": {
                  name: name
                }
              }
            },
            function(error, model) {
              if (error) {
                res.status(500).json(writeResponse(false, "Cannot delete this fav", error))
              }
              else {
                //console.log(model);
                if (model.n == 0)
                  res.status(404).json(writeResponse(false, "Cannot find this user", { "userId": userId }))
                else if (model.nModified == 0)
                  res.status(400).json(writeResponse(false, "Invalid name", name))
                else
                  res.status(201).json(writeResponse(true, "fav deleted successfully", data));
              }
            }
          );
        }
      }
    }
  )
})

router.delete('/:id/theme/', async(req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const data = {
    "name": name
  }

  console.log(name)
  if (!name) {
    res.status(401).json(writeResponse(false, "Name are missing"));
    return
  }
  User.find (
    {
      _id: id,
      "theme.name": {
        $in: name
      }
    },
    function (err, success) {
      if (err)
      res.status(500).json(writeResponse(false, "Cannot find this user", err))
      else {
        console.log(success)
        if (success && success.length == 0) {
          res.status(400).json(writeResponse(false, "theme don't exist", name));
        }
        else {
          User.updateOne(
            { _id: id},
            {
              $pull: {
                "theme": {
                  name: name
                }
              }
            },
            function(error, model) {
              if (error) {
                res.status(500).json(writeResponse(false, "Cannot delete this theme", error))
              }
              else {
                //console.log(model);
                if (model.n == 0)
                  res.status(404).json(writeResponse(false, "Cannot find this user", { "userId": userId }))
                else if (model.nModified == 0)
                  res.status(400).json(writeResponse(false, "Invalid name", name))
                else
                  res.status(201).json(writeResponse(true, "theme deleted successfully", data));
              }
            }
          );
        }
      }
    }
  )
})

router.put('/users/favori', async (req, res) => {
  const id = req.body.username;
  const name = req.body.name;
  const newn = req.body.newn;
  const data = {
    "name": name
  }

  if (!name)
    res.status(401).json(writeResponse(false, "User informations are missing"));
  else {
    User.find(
      {
        "user.info": id,
        "favoris.name": {
          $in: name
        }
      },
      function (err, success) {
        if (err)
          res.status(500).json(writeResponse(false, "Cannot find this user", err))
        else {
          console.log(id)
          if (success && success.length == 0) {
            res.status(400).json(writeResponse(false, "favori don't exist", name));
          }
          else {
            User.updateOne(
              { "user.info": id },
              {
                $set: {
                  "favoris": {
                    name: newn
                  }
                }
              },
              function (error, model) {
                if (error) {
                  res.status(500).json(writeResponse(false, "Cannot change favori", error))
                }
                else {
                  //console.log(model);
                  if (model.n == 0)
                    res.status(404).json(writeResponse(false, "Cannot find this user", "userid"))
                    else if (model.nModified == 0)
                    res.status(400).json(writeResponse(false, "Invalid name", name))
                  else
                  res.status(201).json(writeResponse(true, "favori changed successfully", data));
                }
              }
              );
            }
        }
      }
    )
  }
})

router.put('/:id/theme', async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  const newn = req.body.newn;
  const data = {
    "name": name
  }

  if (!name)
    res.status(401).json(writeResponse(false, "User informations are missing"));
  else {
    User.find(
      {
        _id: id,
        "theme.name": {
          $in: name
        }
      },
      function (err, success) {
        if (err)
          res.status(500).json(writeResponse(false, "Cannot find this user", err))
        else {
          console.log(id)
          if (success && success.length == 0) {
            res.status(400).json(writeResponse(false, "theme don't exist", name));
          }
          else {
            User.updateOne(
              { _id: id },
              {
                $set: {
                  "theme": {
                    name: newn
                  }
                }
              },
              function (error, model) {
                if (error) {
                  res.status(500).json(writeResponse(false, "Cannot change theme", error))
                }
                else {
                  //console.log(model);
                  if (model.n == 0)
                    res.status(404).json(writeResponse(false, "Cannot find this user", "userid"))
                    else if (model.nModified == 0)
                    res.status(400).json(writeResponse(false, "Invalid name", name))
                  else
                  res.status(201).json(writeResponse(true, "Theme changed successfully", data));
                }
              }
              );
            }
        }
      }
    )
  }
})

router.put('/:id/', async (req, res) => {
  const id = req.params.id;
  const mail = req.body.mail;
  const name = req.body.name;
  const nmail = req.body.nmail;
  const nname = req.body.nname;
  const data = {
    "name": name
  }

  console.log(name);
  console.log(mail);
  console.log(id);


  if (!name)
    res.status(401).json(writeResponse(false, "User informations are missing"));
  else {
    User.find(
      {
        _id: id,
        "info.name": name,
        "info.mail": mail,
      },
      function (err, success) {
        if (err)
          res.status(500).json(writeResponse(false, "Cannot find this user", err))
        else {
          console.log(id)
          if (success && success.length == 0) {
            res.status(400).json(writeResponse(false, "user don't exist", name));
          }
          else {
                User.updateOne(
                  { _id: id },
                  {
                    $set: {
                      "info": {
                        name: nname,
                        mail: nmail,
                      }
                    }
                  },
                  function (error, model) {
                    if (error) {
                      res.status(500).json(writeResponse(false, "Cannot change User info", error))
                    }
                    else {
                      //console.log(model);
                      if (model.n == 0)
                        res.status(404).json(writeResponse(false, "Cannot find this user", "userid"))
                        else if (model.nModified == 0)
                        res.status(400).json(writeResponse(false, "Invalid name", name))
                      else
                      res.status(201).json(writeResponse(true, "User info changed successfully", data));
                    }
                  }
                  );
            }
        }
      }
    )
  }
})



module.exports = router;