# FootballCoin backend

## How to run backend

### Setup config
Create `config.js` file in the project root:
```
module.exports = {
	MONGODB_CONNECTION: 'mongodb://localhost:27017/footballcoin', // mongo connection string
	SERVER_PORT: 4000 // server port where server is running
};

