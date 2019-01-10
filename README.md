# sgbouncewizard

UCI Capstone 2018-19 Bounce Wizard

### Team Members:

- Kristen DeVore
- Joseph Bustamante
- Cody Han
- Khuong Tiet
- Gevorg Gabrielyan
- Kenny Matsudo

## Setup

Before running, make sure you have the proper environmental files and endpoints configured. Please contact team members for more information.

## Starting Front End w/ json-server

This runs the application with a json database stored locally. No backend service is required.

1. `$ npm run dev:mock`
2. `$ npm run json-server`

## Starting Front End w/ Docker Container

Please make sure the backend service and mySQL docker container are running prior to running the front end application.

- `$ npm run dev`

## Running Storybook

> Storybook is a UI development environment and playground for UI components. The tool enables users to create components independently and showcase components interactively in an isolated development environment.

`$ npm run storybook`

## Running Jest

> Jest is used by Facebook to test all JavaScript code including React applications.

In order to run tests:

`$ npm run test`

In order to update snapshots:

`$ npm run test -- -u`

## Running Cypress

> Cypress is a next generation front end testing tool built for the modern web.

Cypress mimics user actions in a browser to perform tests such as successfully logging in, creating bounce rules, and deleting bounce rules.

#### Using Json-Server

- `$ npm run cypress`:`open`:`mock`

#### Using Docker Container

- `$ npm run cypress`:`open`

This opens up a Cypress application containing various tests categorized by pages. Clicking on any of the \*.spec.js files will begin the test.
