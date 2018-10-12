# Moblize User list CRUD app.

<p align="center">
<img src="/public/img/Moblize_userList.png" title="CRUD app screenshot." alt="Moblize user list CRUD app." width="550" style="border:solid 1px black;">
</p>

This is a simple CRUD application built using the MEAN Stack. 
For simplicty I have chosen to use an [mlab.com](https://mlab.com) mongodb instance. If you would like to test this app you will need your own free mlab account.

#### Features:
1. Create new users by adding `First Last name`, and `email`. The script checks to ensure no duplicate emials exisit before adding the new user.
2. Read the existing list of users from the db.
3. Update an existing user's name or email.
4. Delete existing users from the db, one at a time.

#### Possible feature improvements:
1. Add the ability to sort by name or email.
2. Add search capability.
3. Add bulk delete capability.
4. Error alerts when a duplicate email is entered.


## Build for production

1. _Clone the repo_
2. _Run `npm i` inside project folder to install all app dependencies from package.json_
3. _Run `ng build` to build the angular project._
4. _OPTIONAL: Create a `.env` file in the project root folder:  `touch .env && echo 'MONGO_URL="mongodb://<dbuser>:<dbpassword>@ds121593.mlab.com:21593/moblizeuserbase"' > .env`_
5. _in`.env` replace `<dbuser>` and `<dbpassword>` with your mlab mongodb username and password._
7. _Run `nodemon app.js`_
8. _Go to `localhost:8801` in your preferred browser._


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 6.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
