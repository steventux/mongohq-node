mongohq-node
============

A very simple [NodeJS](http://nodejs.org/) cms app with [MongooseJS](http://mongoosejs.com/) hookup to [MongoHQ](https://www.mongohq.com) and search using [Bonsai Elasticsearch](http://www.bonsai.io/).

## Deploy
Developed with [Heroku](https://www.heroku.com/) deployment in mind, all you need to get started is to install the [mongohq](https://addons.heroku.com/mongohq) and [bonsai](https://addons.heroku.com/bonsai) addons for your app.

## Tests
  `$ mocha -R spec test/**/**`

### User needs

- As an admin user I would like to be authenticated.
- As an admin user I would like to add new pages to the webapp.
- As an admin user I would like to edit pages using markdown.
- As a user I would like to search the site.

## See it in action
An example application can be seen running [here](http://laingsolutions.com).
