# Rindus task
### Introduction
This project is an API that provides current weather information and forecasts for cities. It allows users to retrieve weather data for a specific city, including the current weather conditions and the forecast for the upcoming days. The API utilizes mocked data to provide the weather information. Additionally, it calculates and provides the average temperature for the specified timeframe. Users can make requests to the API to obtain weather data for their desired cities.
### Project Support Features
* Public (non-authenticated) users can access all causes on the platform.
* Authenticated users can access to initial database filling.
* Provide pre commit and push check.
* Commitlint for make clear and readable commit messages.
### Installation Guide
* Clone this repository [here](https://github.com/RomSribn/rindus-task).
* Run yarn install to install all dependencies
* Create an .env file in your project root folder and add your variables. See .env.example for assistance.
### Usage
* Run yarn dev to start the application.
* Connect to the API using Postman on port 2348.
### API Endpoints
| HTTP Verbs | Endpoints | Action |
| --- | --- | --- |
| POST | /_init | To fill the database with mock data from src/api/_init/data/ |
| GET | /cities |  To retrieve all cities |
| GET | /condition | To retrieve all existing weather conditions |
| GET | /weather | To retrieve all weather from all existing cities |
| GET | /weather/:cityId | To retrieve weather of a single city |
### Technologies Used
* [NodeJS](https://nodejs.org/) This is a cross-platform runtime environment built on Chrome's V8 JavaScript engine used in running JavaScript codes on the server. It allows for installation and managing of dependencies and communication with databases.
* [ExpressJS](https://www.expresjs.org/) This is a NodeJS web application framework.
* [PostgreSQL](https://www.postgresql.org/) open source object-relational database system with over 35 years of active development that has earned it a strong reputation for reliability, feature robustness, and performance.
* [Webpack](https://webpack.js.org/) A free and open-source module bundler for JavaScript. Provides code on demand using the moniker code splitting.
* [Commitlint](https://github.com/conventional-changelog/commitlint/) Checks if your commit messages meet the [conventional commit format](https://conventionalcommits.org).
### Authors
* [Roman Sribnyi](https://github.com/RomSribn)
### License
This project is available for use under the MIT License.