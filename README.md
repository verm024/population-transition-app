# English Description

Name: Muhammad Naufal Arkan Rafii

Application ID: 17714-24709-95543-2448

## Project Description

### Application Name

人口推移アプリ (Population Transition App)

### Application Description

人口推移アプリ is a web application that can be used to view the population transition chart of some prefectures in Japan. This project was built to fulfill the requirement (code check) of Yumemi Co Ltd. frontend engineer job application.

### Live URL

https://verm024.github.io/population-transition-app

## Technologies Used

- Frontend framework: ReactJS (with native HTML and CSS)
- Programming language: Typescript
- Version control system: Github
- Project management: Github Kanban
- Application deployment: Github Pages
- End-to-end testing: Cypress
- Additional NPM modules: axios, prettier, eslint, rand-seed, react-redux, recharts

## Development Environment

Please run the command `npm start` to start the development mode.

### Environment Variables

- REACT_APP_API_KEY: It is a secret, please use your own Resas API key
- REACT_APP_RESAS_BASE_URL: `https://opendata.resas-portal.go.jp`

## Testing

Here is a tutorial about how to run the end-to-end testing script.

- Run the application in developer mode using the command `npm start`
- Run the command `npm run cypress:open` to open Cypress GUI
- Choose the `E2E Testing` option
- Choose Chrome as the browser and click `Start E2E Testing in Chrome`
- Open the Specs tab and click on the script named `cypress/e2e/spec.cy.ts`
- Please wait until the tests are finished
