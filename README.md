# EnerShare
A peer-to-peer energy marketplace powered by blockchain.

This project was built for a Software Engineering course (SE 4450) as a capstone project. It is a high-level depiction of an energy marketplace that is built using blockchain. It focuses on the transactions that users would make and how they would be committed to the blockchain. 

## Installing and Running The Project

Start by downloading the repository to your computer using `git clone`

### Frontend Setup

To setup the frontend, navigate to the `frontend/enershare` directory.

Install the frontend dependencies:

```
npm install
```

Run the project:

```
npm run start
```

### Backend Setup
<!-- I would suggest 2 types of backend setup, the one using mock js, and one without -->

- To run the backend server, navigate to Capstone/fabric-samples/asset-transfer-basic/application-javascript 
- enter the command 'node server.js'

### Blockchain Setup
- The first step is getting the binaries/config files that are needed to run the blockchain
- Enter this curl command on a ubuntu shell : curl -sSL https://bit.ly/2ysbOFE | bash -s
- Navigate into the fabric-samples folder and copy the config/ and bin/ folders into the Capstone fabric samples folder
- Navigate to the test-network folder in the Capstone project
- Run the command ./test.sh to run the shell script which stars the blockchain.

## Frontend Technologies

- **ReactJS**: Open-source front-end JavaScript library for building user interfaces
- **Styled-Components**: Library built for React to create component-level styles
- **Axios**: Promised based HTTP client, used to communicate with the backend endpoints
- **Formik**: Open-source React form library 
- **Yup**: JavaScript schema parser and validator
- **Recharts**: React charting library
- **JWT-Decode**: JWT token decoding library

## Backend Technologies
- **Node.JS**
- **mongoDB**
- **Express**

## Contributors
Yusra Irfan, Chris Devito, Nicholas Battel, and Phillip Truong
