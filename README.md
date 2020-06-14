# LAB - Class 15

## Project: authenticated-api-server

### Author: Esra'a Mamoun

### Links and Resources

- [submission PR](https://github.com/EsraaMamoun-401-advanced-javascript/authenticated-api-server/pull/1)
- [ci/cd](https://github.com/EsraaMamoun-401-advanced-javascript/authenticated-api-server/actions) (GitHub Actions)
<!-- - [back-end server url](http://xyz.com) (when applicable) -->
<!-- - [front-end application](http://xyz.com) (when applicable) -->
- [Heroku](https://lab-auth-api.herokuapp.com/)

### Setup

#### Routs
- http://localhost:3000/signup  ===> POST
- http://localhost:3000/signin  ===> POST
- http://localhost:3000/users   ===> GET
- http://localhost:3000/        ====Redirect to====>  http://localhost:3000/aouth   
- http://localhost:3000/secret  ===> GET
- http://localhost:3000/read    ===> GET
- http://localhost:3000/add     ===> POST
- http://localhost:3000/change  ===> PUT
- http://localhost:3000/remove  ===> DELETE
- http://localhost:3000/api/v1/categories
- http://localhost:3000/api/v1/products

#### `.env` 
- PORT=3000
- MONGODB_URI=mongodb://localhost:27017/lab-auth
- SECRET=mysecrettokenkeyesraa
- TOKEN_SERVER=https://github.com/login/oauth/access_token
- REMOTE_API=https://api.github.com/user
- CLIENT_ID=eec574886e4a374e01a2
- CLIENT_SECRET=9dccdaa431716687516f025e0d38765cdd682373
- API_SERVER=http://localhost:3000/oauth

### Modules
- categories.collection.js
- basic-auth-middleware.js
- products-collection.js
- categories-schema.js
- oauth-middleware.js
- products-schema.js
- acl-middleware.js
- extra-routes.js
- bearer-auth.js
- server.js
- model.js
- users.js
- 404.js
- 500.js
- v1.js

### Packages
- @code-fellows/supergoose
- jsonwebtoken
- superagent
- mongoose
- express
- base-64
- dotenv
- eslint
- morgan
- bcrypt
- cors
- jest

#### How to initialize/run your application (where applicable)

- `node index.js`
<!-- #### How to use your library (where applicable)
- Lint Tests: `npm run lint` -->

#### Tests

* How do you run tests?
 > - Jest test: `npm test` - to run the test for two files 
 > - console.log
<!-- - Any tests of note?
- Describe any tests that you did not complete, skipped, etc -->

#### UML
![UML](./img/UML.jpeg)