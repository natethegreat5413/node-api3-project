const express = require('express');
const Users = require('./userDb')
const Posts = require('../posts/postDb')

const router = express.Router();

router.post('/', validateUser, (req, res) => {
  // do your magic!
  Users.insert(req.body)
    .then(add => {
      res.status(201).json({ add })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
});

router.post('/:id/posts', validateUserId, validatePost, (req, res) => {
  // do your magic!
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
});

router.get('/', (req, res) => {
  // do your magic!
  Users.get()
  .then(user => {
    res.status(200).json(user)
  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
});

router.get('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.getById(req.params.id)
    .then(user => {
      res.status(200).json({user})
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
});

router.get('/:id/posts', validateUserId, (req, res) => {
  // do your magic!
  Posts.getById(req.params.id)
    .then(post => {
      res.status(200).json({ post })
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
});

router.delete('/:id', validateUserId, (req, res) => {
  // do your magic!
  Users.remove(req.params.id)
    .then(user => {
      res.status(200).end()
    })
});

router.put('/:id', validateUserId, (req, res) => {
  // do your magic!
  const changes = req.body
  Users.update(req.params.id, changes)
    .then(user => {
      res.status(200).json({user})
    })
    .catch(error => {
      res.status(500).json({ error: error.message })
    })
});

//custom middleware

function validateUserId(req, res, next) {
  // do your magic!
  Users.getById(req.params.id)
  .then(user => {
    if(user){
      req.user = user
      next()
    }else{
      res.status(400).json({ message: 'invalid user id' })
    }
  })
  .catch(error => {
    res.status(500).json({ error: error.message })
  })
}

function validateUser(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ message: 'missing user data' })
  }else if(!req.body.name){
    res.status(400).json({ message: 'missing required name field' })
  }
  next()
}

function validatePost(req, res, next) {
  // do your magic!
  if(!req.body){
    res.status(400).json({ message: 'missing post data' })
  }else if(!req.body.text){
    res.status(400).json({ message: 'missing required text field' })
  }
  next()
}

module.exports = router;







// const express = require('express');

// const Users = require('./userDb')
// const Posts = require('../posts/postDb')

// const router = express.Router();

// router.post('/', validateUser, (req, res) => {
//   // do your magic!
//   Users.insert(req.body)
//   .then(user => {
//     res.status(201).json({user})
//   })
//   .catch(error => {
//     res.status(500).json({ error: "could not post user" })
//   })
// });

// router.post("/:id/posts",[validateUserId, validatePost], (req, res) => {
//   // do your magic!
//   const post = req.body;
//   // console.log(req.body)
//   post.user_id = req.params.id
//   Posts.insert(post)
//     .then(post => {
//       res.status(201).json(post);
//     })
//     .catch((error) => {
//       console.log(error);
//       console.log(req.body); 
//       res.status(500).json({ error: "could not post comment" });
//     });

// });

// router.get('/', (req, res) => {
//   // do your magic!
//   Users.get()
//   .then(users => {
//     res.status(200).json({ users })
//   })
//   .catch(error => {
//     res.status(500).json({ error: "could not get users"})
//   })
// });

// router.get('/:id', validateUserId, (req, res) => {
//   // do your magic! 
//   Users.getById(req.params.id)
//   .then(users => {
//     res.status(200).json({ users })
//   })
//   .catch(error => {
//     res.status(500).json({ error: "could not get users" })
//   })
// });

// router.get('/:id/posts', validateUserId, (req, res) => {
//   // do your magic!
//   Users.getUserPosts(req.user.id)
//   .then(users => {
//     console.log(users)
//     res.status(200).json({ users })
//   })
//   .catch(error => {
//     res.status(500).json({ error: "could not get posts"})
//   })
// });

// router.delete('/:id', validateUserId, (req, res) => {
//   // do your magic!

//   Users.remove(req.user.id)
//   .then(recordsDeleted => {
//     res.status(200).json({ recordsDeleted })
//   })
//   .catch(error => {
//     res.status(500).json({ error: "could not delete user" })
//   })
// });

// router.put('/:id', validateUserId, (req, res) => {
//   // do your magic!

//   Users.update(req.user.id, req.body)
//   .then(recordsUpdated => {
//     res.status(200).json({ recordsUpdated })
//   })
//   .catch(error => {
//     res.status(500).json({ error: "could not update user" })
//   })
// });

// //custom middleware

// function validateUserId(req, res, next) {
//   // do your magic!
//   const id = req.params.id;

//   Users.getById(id)
//     .then((userObject) => {
//       if (userObject) {
//         req.user = userObject;
//         next();
//       } else {
//         res.status(400).json({ message: "invalid user id" });
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//       res.status(500).json({ error: "could not validate ID" });
//     });
// }

// function validateUser(req, res, next) {
//   // do your magic!
//   if (!req.body) {
//     res.status(400).json({ message: "missing user data" })
//   } else if (!req.body.name) {
//     res.status(400).json({ message: "missing required name field" })
//   }
//   next()
// }

// function validatePost(req, res, next) {
//   // do your magic!
//   if(!req.body) {
//     res.status(400).json({ message: "missing post data" })
//   } else if (!req.body.text) {
//     res.status(400).json({ message: "missing required text field" })
//   }

//   next()
// }

// module.exports = router;
