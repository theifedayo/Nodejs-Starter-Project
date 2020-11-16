
# Auth API

### Desc


### Install
To install packages in package.json file, run

	$ npm install 


## Requests-check
Check various endpoints using POSTMAN using the schema below

POST [Register Route](http://localhost:5000/api/v1/register)

	{
		"username": <username>,
		"email": <email>,
		"password": <password>
	}


POST [Login Route](http://localhost:5000/api/v1/login)

	{
		"username": <username>,
		"password": <password>
	}

JWT generated should be placed in headers:
	Authorization : Bearer <token>

GET [Stories Route](http://localhost:5000/api/v1/stories)

POST & PUT [Route](http://localhost:3000/api/v1/stories) - Token required

	{
		"story": <story>
	}

DELETE [Route](http://localhost:3000/api/v1/stories/<id>) - Token required


## Built With
Built with javascript - Nodejs
