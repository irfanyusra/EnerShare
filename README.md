# EnerShare
A peer-to-peer energy marketplace powered by blockchain.

This project was built for a Software Engineering course (SE 4450) as a capstone project. It is a high-level depiction of an energy marketplace that is built using blockchain. It focuses on the energy transactions that users would make and how they would be validated through peers and committed to the blockchain. 

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

- To run the backend server, navigate to `fabric-samples/asset-transfer-basic/application-javascript` 
- Run the server 
```
node server.js
```

### Blockchain Setup 
- Set up Ubuntu on Windows or stand-alone
- Binaries/config files are needed to run the blockchain which can be downloaded from HyperLedger Fabric documentation
- Enter this curl command on a ubuntu shell: `curl -sSL https://bit.ly/2ysbOFE | bash -s`
- Navigate into the `fabric-samples` folder and copy the config/ and bin/ folders into the Capstone fabric samples folder
- Navigate to the `fabric-samples/test-network` and run the command `./test.sh` to run the shell script which starts the blockchain.

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
