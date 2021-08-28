# Problem Statement

Here at Lob we work with addresses quite a lot. Our users want a user-friendly way to search their address books and manage the addresses in them.

To get started we have partially built a solution including a front-end with a mock-up of the final solution. It's complete with a menu system and visual samples of how it should look but it's missing all of the user interactions and it's not hooked up to the back-end.

We've also partially built an API server to get you started. Right now all it does is say "Hello world!" but we've done some of the heavy lifting and implemented an address controller complete with CRUD & a full-text search. This controller uses a redis instance as the database - you are welcome to keep this design or implement a different one. Either way you'll have time to explain your choice in the follow-up call.

Your task is to design and build the API to power the address manager and then wire up the front end to use the API. You can use any technology or design patterns you find suitable for the task, but prefer consistency with the existing code.

The front-end is built with `next.js` and it's using `Tailwind CSS` as it's utility library. You'll also find some bare-boned components to help get you started.

**Requirements**

- Design an address management API.
- Build the API (using the provided components).
- Update the front-end to be interactive and integrate with your server.
  - The address book should show every user with their address as a `card`.
  - As you type in the search bar, the `cards` will start narrowing down to ones that match.
  - Clicking on the `Add Address` button should toggle the form editor and clicking on `Save` should save a new user's address.
  - Clicking the `Edit` button should toggle the form editor and clicking on `Save` should close the form editor
  - When you click on `Delete` the user should get deleted.

**Acceptance Criteria**
We will walk through a complete demo of your solution. The front-end must integrate with your back-end & all CRUD actions + search should work.
Before your phone interview, please zip up your solution and send it back.

**_We will be asking for you to develop a small incremental feature during the call, so make sure it is easy and comfortable to modify and run your code in your environment for the call._**

# Getting Started

## Pre-reqs

You must have docker and docker-compose running on your system, which you can get [here](https://www.docker.com/products/docker-desktop) for windows & mac.

## To run

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
