# Nature social network app

## Table of contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Setup](#setup)

## General Info

This is a mini social network for nature lovers, where users can share content about interesting locations.<br> It was built using React.js and JSON-server with JSON-authentication as fake backend.

## Technologies

- React JS(Context API and props used to manage data flow, React router used for routing)
- JSON-server and JSON-server-auth
- Scss

## Features:

1. App has two user types: regular user and admin. They can register and login.

2. Admin:

   - Can review all users,
   - Can block regular user and remove block (Blocked user can't login),
   - Can filter users on Admin page by status or type of user,
   - Has all the rest of regular user features,

3. Regular user:
   - Create post that contains: name, place, description, accessabillity, type and date it was created,
   - Can leave reactions to post (positive or negative, but only one of those),
   - Can comment post, and can delete comment user created and every comment on users post,
   - Single post overview with ability to read comments, leave comment or leave reaction to post,
   - Clicking on users link will lead to that users Profile page,
   - User can delete his own post

## Setup

To run this project:

- **NOTE** Its important to run JSON-server and JSON-server-auth on localhost 3000 because URL routes

- Clone repo:

```
$ git clone https://github.com/stefanskoricdev/nature-social-media.git
```

- Switch to directory:

```
$ cd nature-social-media
```

Run JSON-server and JSON-server-auth:

```
$ json-server --watch ./src/services/db.json -m ./node_modules/json-server-auth
```

- Install it locally using npm:

```
$ npm install
```

-Run locally:

```
$ npm install
```
