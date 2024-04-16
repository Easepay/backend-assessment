# Backend Assessment

The backend assessment task focuses on evaluating the candidates' proficiency in designing, troubleshooting and debugging backend systems

Candidates will be tasked with setting up and troubleshooting a broken codebase, thus demonstrating their understanding of key concepts such as database management, API design, server-side scripting, and system architecture. The assessment will assess candidates' ability to navigate and maintain a codebase.

 Through this task, candidates will showcase their problem-solving skills and their capacity to deliver high-quality backend solutions that meet specified requirements and can scale with growing user demands.

## Dependencies

- [Nodejs v18 or greater](http://nodejs.org)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Getting Started

1. Clone the repo
```shell
git clone https://github.com/easepay/backend-assessment.git assessment
cd assessment
```

2. Install dependencies
```shell
npm install 
```

3. run the application
```shell
npm run start:dev
```

4. fix the bugs
See the [task](#task) section

5. commit and save


## Task 
1. Create a `.env` file from the env template  
2. Ensure the application starts successfully 
3. Ensure the application base URL returns `"Hey! Application up and Running!"`
4. Run the Database Migrations
5. Make a request to `http://localhost:3000/v1/waitlist`,  to add a user to the waitlist. The request body takes "email" and "fullname" fields
6. Implement a `PUT ` endpoint and update the email of the previously added user
7. The `GET` request returns incorrect data, fix the request to the `GET::http://localhost:3000/v1/waitlist?email=example-email@provide.com` to fetch the user's record 
8. Remove `data.id` property from the `GET::http://localhost:3000/v1/waitlist?email=example-email@provide.com` HTTP response
9. Make a  `DELETE` request to the `http://localhost:3000/v1/waitlist?email=example-email@provide.com` to remove the user's record 
10. Review changes
11. ``write a bash script that automates the deployment of the above application to a production environment``


## Section 2
This will be an oral / written conversation to gauge your understanding of Nextjs Fundamentals
1. `` How does NestJS handle dependency injection, and what are the benefits? Can you explain the difference between a provider and an injectable in NestJS??``
   
2. ``Can you walk me through how you would Dockerize a NestJS application that uses a separate API gateway and multiple microservices? How would you handle environment variables and configuration for each service?``

3. ``How would you use bash scripting to automate the testing and linting of a NestJS application?``
4. ``What is SQL injection, and how can it be prevented in NestJS?``

