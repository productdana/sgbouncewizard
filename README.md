# sgbouncewizard

UCI Capstone 2018-19 bounce wizard

## Setup

Before running, make sure you have two environmental files are the root of the project.
File1: .env
Contains: API_URL=http://localhost:3000
File2: .env.mock
Contains: API_URL=http://localhost:3004

## Starting Front End w/ json-server

1. run "npm run dev:mock"
2. run "npm run json-server"

## Starting Front End w/ Docker Container

Please make sure the backend service and mySQL docker container are running prior to running the front end application.

1. run "npm run dev"
