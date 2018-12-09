# AVTOSERVIS

A friend who has a car workshop has asked us to make a application,
which will allow him to record the current stock of parts in the warehouse,
show when a customer is booked and what needs to be purchased.
At the moment, he has to do it all by himself,
and he often runs out of supplies or books two costumers at the same time,
therefore he would like to have this process automated.

[Our app hosted on heroku](http://avtoservis.herokuapp.com/)

Our application can be used on phones, tablets or computers.

Our application supports:

| Functionality              |                                              Description                                               |                                                                                  Link |
| -------------------------- | :----------------------------------------------------------------------------------------------------: | ------------------------------------------------------------------------------------: |
| Employee login page        |                                     Allows the employees to login                                      |                [Login](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/login.pug?at=master) |
| Employee registration page |                                    Allows new employees to register                                    |      [Registration](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/register.pug?at=master) |
| List of supplies           |                                    A list of all available supplies                                    | [List of supplies](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/inventory.pug?at=master) |
| Add supplies               |                   Allows the employees to add a new element to the list of supplies                    |                  [ Add](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/inventory.pug?at=master) |
| Delete supplies            |     Allows the employees to delete elements from the list of supplies that are no longer available     |                [Delete](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/inventory.pug?at=master) |
| Edit supplies              | Allows the employees to edit the quantity, type and description of a element from the list of supplies |                 [ Edit](https://bitbucket.org/bc7608/sp-v1/src/master/docs/edit.html) |
| Search through supplies    |                              Allows searching through available supplies                               |                [Search](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/services.pug?at=master) |
| Master-detail              |                                    Details about available supplies                                    |    [Master-detail](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/services.pug?at=master) |
| External source            |             Connects to the mapfit external source and shows the location of the workshop              |   [ External source](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/contact.pug?at=master) |
| Contact form               |                              Allows the costumers to contact the company                               |       [Contact form](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/contact.pug?at=master) |
| Services                   |				Allows the employees to see which services have to be done and who ordered them           |   [Services](https://bitbucket.org/bc7608/sp-v1/src/master/api/views/services.pug?at=master)   |

# Validation patterns

## All of the following inputs are required(cannot be empty)

## Login page

### Email

Valid email must match this regular expression `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;`

### Password

Valid password must be at least 8 charters long and contain at least one lowercase letter, one uppercase letter and a number

## Registration page

### Firstname

Valid firstname must contain only letters

### Lastname

Valid lastname must contain only letters

### Email

Valid email must match this regular expression `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;`

### Password

Valid password must be at least 8 charters long and contain at least one lowercase letter, one uppercase letter and a number. Also user must confirm the password by entering it again. Both passwords must match

## Inventory add page

### Itemname

Valid itemanme must contain only letters

### Description

Description can be at most 500 characters long

### Quantity

Has to be a number(integer)

## Service add page

### Firstname

Valid firstname must contain only letters

### Lastname

Valid lastname must contain only letters

### Email

Valid email must match this regular expression `/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;`

### Phone number

Phone number must match this regular expression `/^\+[1-9]{1}[0-9]{3,14}$/;`

### Time

If not prompted with browser in built function for choosing date and time, input must bi in this form:`yyyy-mm-dd hh:hh`

### Type

User must pick one of the types possible for service

## Installation

-   install mongodb
-   run mongodb `mongod` and create database avtoservice `use avtoservice`
-   open terminal move to dir with app
-   install dependencies with `npm install`
-   use command `npm start` to start the app
-   app is running on url `localhost:3000`
