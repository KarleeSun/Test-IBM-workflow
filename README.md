# VetDB

## Index

- [Overview](#overview)
- [GanttChart](#ganttchart)
- [Tech Stack](#techstack)
- [Stakeholders](#stakeholders)
- [Requirements](#requirements)
- [Designs](#designs)
- [User stories](#user-stories)
- [Frontend](#frontend)
- [Backend](#backend)
- [Database](#database)
- [Deployment guide](#deployment-guide)


---

## Overview

This is SPE group 39, building a full stack application that should allow the users (veterinary school students) to more easily find placements. The existing system is currently a folder of unmaintainable PDF files with contact information. We propose a solution that uses a database to house the information, a frontend for students and administrators separately to do their activities, and finally a backend to handle requests.

## GanttChart

[Here](https://uob-my.sharepoint.com/:x:/g/personal/rg21171_bristol_ac_uk/EXB1vzU3bc9PjnPBPkcItIwBKKtsa-HWQkgBQ3BjOMpzxQ?e=alnQlW) is our GanttChart indicating key dates and milestones of our project.

## Tech Stack

Our solution uses the following technologies:

- Front-end: React-TypeScript app
- Backend: Node.js Server
- Database: MongoDB

## Set up instructions

Note that the project is not yet production-ready

1. Clone this repository with `git clone git@github.com:spe-uob/2022-VetDB.git`

2. Navigate into the cloned repo `cd 2022-VetDB`

3. For the front-end, `cd frontend | npm start`

   - see more instructions [here](https://github.com/spe-uob/2022-VetDB/tree/main/frontend#getting-started-with-create-react-app)

4. For the backend, `cd backend`

   - Please do not open IntelliJ in the root directory, but in the `backend` folder
   - This is where the pom.xml is located, as well as the .idea folder

## Stakeholders

- Vet School (Lecturers & Administrators) – These people will impact the system as they will be in charge of the adding, removal, or editing of elements in the database. They will want it to be easy to use so that it reduces the amount of stress on the admin team, and they want any EMS site that is out of date to be filtered out automatically so that the database remains up to date with minimal admin work.
- Veterinary Students – These people will need access to the system in order to choose their EMS placements. They will want the database to be easy to read, and would benefit from being able to search the list based on different preference such as what type of placement it is (i.e. Poultry, Lambing, etc.), or where the farm/veterinary practice is so that they can pick somewhere closer to home, allowing them to save money on travel and accommodation.
- University of Bristol – All the data in the database will be under GDPR regulations so the University will have an interest in ensuring that the database is very secure so that they don’t come under any scrutiny or have their reputation tarnished. If this project is very successful, then other universities may want to use our system, and to do this it would be critical that our system is secure.
- Farms/Veterinary Practices – They will have an interest in making sure the system is secure so that their data is not at any risk. Also, they will want it to be easy for them to change any of their details because for example, if their contact details change, they will still want to receive any communications about EMS placements. Furthermore, they will want to be able to remove themselves from the database so that if for any reason they no longer want to partake in the EMS placements, then they can stop being messaged by student vets.

## Requirements

The client requires a web app in order to display the placement options for students.
It should be searchable by location and have many filters, like placement type (dairy, poultry), accomodation (live in, AirBNB, or can stay at home).

Key aspects include:

1. Database with actual placement data
2. REST API to interface the Database and allow requests to be sent through
3. Login system for students and administrators
4. Forms for farmers to apply, edit information and remove placement option from database
5. UoB Vet school only for now.

## Designs

- For the design process, we are using Figma due to ease of use in order to wireframe and map out what certain aspects of the frontend should look like
- The User Interface design is found [here](https://www.figma.com/file/WrCRgPmR6lbtXAGqlcIjPQ/Untitled?node-id=0%3A1)
- This link will give a read-only access, and you can navigate to other pages with the menu button at the top-left
- Alternatively, we have images of our designs [here](https://github.com/spe-uob/2022-VetDB/tree/main/ui-designs), which may not be updated.

## User Stories

- Vet School(Lecturer/ Administator) - As an administrator I want to have all out of date SPAs to be automatically archived to reduce the burden on my role.
- Vet Student - As a vet student, I want to see where the farm is so that I can pick a placement close to home, and therefore save money on travel and accomodation.
- Farm/Veterinary Practice - As a farmer, I want to be able to change my contact details so that I can keep receiving EMS applications from vet students.

## Frontend

Our frontend will consist of a React application, which can be found [here](https://github.com/spe-uob/2022-VetDB/tree/main/frontend#getting-started-with-create-react-app), bootstrapped via Create React App. We are using TypeScript to improve developer productivity, React Router for client side routing, Material UI components to hasten the styling process, and to also give a Google-like look to the application

## Backend

Our backend will use a Node.js application, serving the React bundle and listening for any API calls. It will mainly interface the database and also handle authentication to differentiate between students and administrators. The backend can be found [here](https://github.com/spe-uob/2022-VetDB/tree/main/backend)

## Database

Our database was primarily designed for MySQL, however since the issue with IBM cloud free usage hasn't been sorted out. We created a database on MongoDB Cloud. The database can be found [here](https://github.com/spe-uob/2022-VetDB/tree/main/database)


## Deployment Guide
Our application is deployed onto IBM cloud by using docker image and container registry. Frontend and backend are deployed as separate application uder the project VetDB. Dockerfile for frontend and backend can be found in the frontend and backend folder respectively.
To deploy a newer version onto IBM cloud, you could following the following steps:

Direct to the frondend/backend folder and do:

### Build docker image:

```
ibmcloud login
ibmcloud cr login
```
If using MacOS or linux:
```
docker build --platform linux/amd64 -t vetdb-[frontend/backend]:latest .      
```
If using Windows:
```
docker build -t vetdb-[frontend/backend]:latest .      
```
### Tag the image
```
docker tag vetdb-frontend uk.icr.io/2022-vetdb/vetdb-[frontend/backend]:latest
```

### Push the image to container registry
```
docker push uk.icr.io/2022-vetdb/vetdb-[frontend/backend]:latest        
```

### Deploy onto IBM cloud Code Engine
After login to IBM cloud website, go to [Code Engine Webpage](https://cloud.ibm.com/codeengine/), and then go to project -> VetDB -> applications -> frontend/backend -> configurations -> Edit and create new revision -> Configure image, configure accourdingly and click on Save and create.