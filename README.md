# URL SHORTENING SERVICE 
This is backend application project which provides URL shortening service using NodeJS ,ExpressJS , MySQL.User can submit a long URL and obtaion a unique short URl which can be used to access the long URL website

## Problem Statement
To develop a backend web service which, when given a long URL as input, returns a short link, and redirects that short link back to the original URL.

## Problem Description
### URL Input
•  An endpoint where a user can submit a long URL and get back a short link.
### Short Link
•  Visiting the short link must redirect the user to the original URL.
•  Each generated short code must be unique.
•  An invalid URL or an unknown short code must return a clear error.
•  (Bonus) Track how many times each short link has been visited.

## Tech Stack Used

1. NodeJS
2. ExpressJS
3. MySQL

## Instruction for backend setup

```bash
cd URLShorteningApp
#install dependencies
npm install
#start the application
npm start
```
## Database setup

```sql
	create database urlservicedb;
	use urlservicedb;
	create table urltable (
	id INT auto_increment primary key,
	longurl varchar(100) not null,
	shorturl varchar(50) not null  unique,
	visits int default 0
	);
```
__MySQLSetup__

setup the configurations by creating `.env` file  in config folder and edit the following,
```env
HOST="localhost"
USER="root"
PASSWORD="yourpassword"
DATABASENAME="urlservicedb"
PORT=5000
```
## Features

- Generate unique short URLs
- Redirect short URLs to original URLs
- Prevent duplicate URL entries
- Validate URL format
- Track visit counts
- Provide URL statistics endpoint

# ROUTES

1. GET http://localhost:5000/  - To get all URLS
2. GET http://localhost:5000/stats/:shorturl - To get statistics about the shorturl
3. POST http://localhost:5000/shorturls - To get shorturl for the given longurl
4. GET http://localhost:5000/:shorturl - To get the longurl for the given shorturl (automatically redirects the user to the longurl)

__1.  GET http://localhost:5000/__

• This api returns all the URLS saved In the databases in list of JS object format.
• Sample formats [
  {
    "id": 1,
    "longurl": "https://www.amazon.in/",
    "shorturl": "web1",
    "visits": 1
  },
  {
    "id": 2,
    "longurl": "https://www.google.com/",
    "shorturl": "web2",
    "visits": 0
  }
]

__2. GET http://localhost:5000/stat/:shorturl__
• This api returns the statistics of the shorturl .
• It tells number of visitors visited the shorturl.
• The ":shorturl" is a Parameter .
• The sample output for http://localhost:5000/stat/web2
{
    "id": 2,
    "longurl": "https://www.google.com/",
    "shorturl": "web2",
    "visits": 0
}

__3. POST http://localhost:5000/shorturls__

• This api returns shorturl for the given longurl.
• The longurl is passed in the "body" of the "request" as {"longurl":"www.google.com"}.
• It validates the URL format and save it to the database and generate a unique shorturl which can be used to access the longurl website.
• Short codes are generated sequentially using the latest database ID.
Examples:
web1
web2
web3
This guarantees uniqueness while keeping the implementation simple.
• If the URL is invalid ,it throws exception and returns status 400.
• If the longurl is already present in the database , then it will notify the user and prevents duplicate
• Finally it return the shorturl as {shorturl:`http://localhost:${PORT}/${shorturl}`}

__4.GET http://localhost:5000/:shorturl__
• This api redirects to the longurl website when the user visits the shorturl
• The shorturl is passed as parameter
• The input format is http://localhost:5000/web2.
• If the the given shorturl is not found in the database then it will return 404 NOT FOUND status
• If it is found then the corresponding longurl is redirected automatically

# FRAMEWORKS AND LIBRARIES

In this project i used NodeJS with ExpressJS framework along with MySQL
• ExpressJS - ExpressJS is a javascript web framework used for rapid web development ,managing routes and middleware.
• It hides the low level implementation of api abstracts complexity
• Nodemon - Nodemon is a library used to start the node server, it watches the files and folders for any change , if change is detected then it will rebuild the application
• mysql2 : For making DB connections , pooling ,query excecution.


