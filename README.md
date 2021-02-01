# SpeedersCoaching

## Description

_Duration: 2 Week Sprint_

Speeders Coaching is an application for coaches and runners!

Coaches can keep track of their athletes and assign workouts and track whether or not the athlete has finished their workouts. Coaches can also post tips to the tips and tricks board.

Athletes can check their workout schedule and mark complete. Athletes can check the tips and tricks board to see answers to FAQ. Athletes must fill out a multi-step registration to give coaches the information to best create a plan to fit their needs.

Both coaches and athletes can view and participate in the message board and encourage each other.

## Screen Shots

<img width="1337" alt="Screen Shot 2021-01-31 at 5 49 00 PM" src="https://user-images.githubusercontent.com/69406113/106402009-212e1800-63ed-11eb-8b52-8892dd8a6844.png">

<img width="1323" alt="Screen Shot 2021-01-31 at 5 49 18 PM" src="https://user-images.githubusercontent.com/69406113/106402022-3014ca80-63ed-11eb-9368-2fcfc8987da8.png">

<img width="1331" alt="Screen Shot 2021-01-31 at 5 50 45 PM" src="https://user-images.githubusercontent.com/69406113/106402036-3efb7d00-63ed-11eb-97b5-1ac950bc2cdf.png">

<img width="1332" alt="Screen Shot 2021-01-31 at 5 51 12 PM" src="https://user-images.githubusercontent.com/69406113/106402054-4c186c00-63ed-11eb-90c1-d2c108693cae.png">

<img width="1334" alt="Screen Shot 2021-01-31 at 5 51 26 PM" src="https://user-images.githubusercontent.com/69406113/106402063-59355b00-63ed-11eb-9f8a-9ce0e9816dd5.png">

<img width="1337" alt="Screen Shot 2021-01-31 at 5 52 02 PM" src="https://user-images.githubusercontent.com/69406113/106402071-66524a00-63ed-11eb-8e59-055387f73825.png">

### Prerequisites

- [React.js](https://reactjs.org)
- [Node.js](https://nodejs.org/en/)
- [PostgreSQL](https://www.postgresql.org)

## Installation

1. Create a database named `Speeders_Coaching`,
2. The queries in the `database.sql` file are set up to create all the necessary tables and populate the tables to allow the application to run correctly. The project is built with [PostgreSQL](https://www.postgresql.org/download/), so you will need to make sure to have that installed. I recommend using Postico to run those queries as that was used to create the queries.
3. Open up your editor of choice and run an `npm install`
4. Run `npm run server` in your terminal
5. Run `npm run client` in your terminal
6. The `npm run client` command will open up a new browser tab for you!

## Usage

1. You must register as a coach or an athlete. Only coaches have the ability to invite athletes to sign up.
2. Once a coach signs in, they will see a list of their athletes. You can click on the athletes to see more information about each athlete.
3. One of the tabs for the athlete details is `Assign Workout` which is where a coach would assign a workout to an athlete.
4. Click on the `Menu` button in the top right corner to go to Tips & Tricks or the Message Board.
5. Coaches can post a new tip under the appropriate category.
6. Anyone can post on the message board!
7. When an athlete signs in, they will see their calendar of workouts. Clicking on a workout will take the athlete to details of that workout.

## Built With

JavaScript
React
Redux
Redux-Saga
Axios
Node.js
Express
PostgreSQL
Material-UI
SweetAlert
Luxon
Nodemailer
Heroku

## Acknowledgement

Thanks to [Prime Digital Academy](www.primeacademy.io) who equipped and helped me to make this application a reality.

## Support

If you have suggestions or issues, please email me: [Sarah Peters](sarahnpeters@gmail.com).
