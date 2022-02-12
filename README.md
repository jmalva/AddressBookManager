# Description

Address controller complete with CRUD & a full-text search was implemented. This controller uses a redis instance as the database.
The front-end is built with `next.js` and uses `Tailwind CSS` as it's utility library. 

**Requirements**

- Designed an address management API.
- Build the API (using the provided components).
- Updated the front-end to be interactive and integrated with my server.
  - The address book shows every user with their address as a `card`.
  - As you type in the search bar, the `cards` will narrow down to ones that match.
  - Clicking on the `Add Address` or `Edit` button toggles the form editor and clicking on `Save` saves/edits a new user's address.
  - When you click on `Delete` the user is deleted.


# Getting Started

## Pre-reqs

You must have docker and docker-compose running on your system, which you can get [here](https://www.docker.com/products/docker-desktop) for windows & mac.

## To run

open docker

```sh
sudo docker-compose up
```

Your changes will automatically reflect in both the server and the client.

You can find your client at
http://localhost:3000
and your server at
http://localhost:3001

## To run the server tests

```sh
docker-compose run --rm server npx mocha
```

## To work inside the container

First start the servers with

```sh
docker-compose up
```

then in a new terminal

```sh
docker-compose exec <server | client> /bin/bash
# eg
docker-compose exec server /bin/bash
docker-compose exec client /bin/bash
```
