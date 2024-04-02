# Social Network API

## Description:

This is an API for a social network web application where users can share their thoughts, react to friends' thoughts, and create a friend list. It uses Express.js for routing, a MongoDB database, the Mongoose ODM, and Moment.js to format timestamps.


## User Story

```md
AS A social media startup
I WANT an API for my social network that uses a NoSQL database
SO THAT my website can handle large amounts of unstructured data
```

## Acceptance Criteria

```md
GIVEN a social network API
WHEN I enter the command to invoke the application
THEN my server is started and the Mongoose models are synced to the MongoDB database
WHEN I open API GET routes in Insomnia for users and thoughts
THEN the data for each of these routes is displayed in a formatted JSON
WHEN I test API POST, PUT, and DELETE routes in Insomnia
THEN I am able to successfully create, update, and delete users and thoughts in my database
WHEN I test API POST and DELETE routes in Insomnia
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list
```

## Installation
- Download or clone repository to use this application on local machine.
- Node.js and MongoDB is required to run the application
- To install necessary dependencies, navigate to the root directory and run the following command: ``` npm i ```

## Usage
For more information - Please visit the following video on how the application works:

[Social Network API -User route](https://www.loom.com/share/e17df7674a564907ada0902abc9049bb?sid=3362a1d7-3928-4b89-9286-c7a3b960b748)

[Social Network API -Thouht route](https://www.loom.com/share/eb9f093c787349b6937b29a065833e7c?sid=b27f95b7-4d9f-4c42-b5a3-33a3efd807aa)



## Credits

- USYD-Bootcamp (week 18 class NoSQL activities)