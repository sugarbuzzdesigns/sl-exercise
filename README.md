# Demo

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.7.

## Follow these steps to run this project locally
- Clone this repo locally `git clone git@github.com:sugarbuzzdesigns/sl-exercise.git`
- CD into the newly created directory `cd sl-exercise`
- Install dependencies by running `npm install`
- Start a local server by running `npm start`
- Open your browser and navigate to `http://localhost:4200/`
	

## Known UX/UI issues
- Sort by date only works in main inbox and not while viewing messages by tag or messages that have been archived or deleted. 
- Deleted and archived messages still show when messages are filtered by tag


## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Technical Debt
- Refactoring of messages service and messages component is needed to help with communication between the services and other possible components. 
- Messages component should be broken down into more modules. Currently, all logic, html, and css for the entire app is located in one component. Ideally, there would at least be a separate menu component and message list component. 
