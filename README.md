# Address Book Manager
![demo](https://github.com/jmalva/AddressBookManager/blob/main/demo/demo.png)
### Searching for term `pine`
![search](https://github.com/jmalva/AddressBookManager/blob/main/demo/demo-search.png)
### Editing `Mrs. Claus`'s information
![Edit](https://github.com/jmalva/AddressBookManager/blob/main/demo/demo-edit.png)
# About
This addressbook manager was originally created as part of a company's take-home, however I decided to take it a step further and implement more features. The only requirements were to design and build the API. I kept the original address controllers and redis database, but I did make a few modifications. The front-end is built with `next.js` and uses `Tailwind CSS` as it's utility library. 

**Features**

- Designed and built an address management API (using the provided components: input/card).
- Updated the front-end to be interactive and integrated with my server.
  - The address book shows every user with their address as a `card`.
  - As you type in the search bar, the `cards` will narrow down to ones that match.
  - Clicking on the `Add Address` or `Edit` button toggles the form editor and clicking on `Save` saves/edits a new user's address.
  - When you click on `Delete` the user is deleted.
  - Added clear button to clear Search form and refresh page.
  - Added pagination to make it easier to navigate your contacts.


# Getting Started

## Pre-reqs

You must have docker and docker-compose running on your system, which you can get [here](https://www.docker.com/products/docker-desktop) for windows & mac.
Clone the repo `git clone https://github.com/jmalva/AddressBookManager.git`

## To run
1. open docker
2. run ```sudo docker-compose up```

Your changes will automatically reflect in both the server and the client.

You can find your client at
http://localhost:3000/address-book/
and your server at
http://localhost:3001/address-book/

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
