# Endpoints

## Table of Contents
* [Users Routes](#user-routes)
  - a
  - a
  - a
* [Goals Routes](#goals-routes)
  - a
  - a
  - a



## Users Routes api/Users/.... 

---------------------------------------------------------------------

###	Test Accounts
	username: chacen
	password: 1234

	username: daven
	password: 1234
	
---------------------------------------------------------------------

- Create Account
- Get current user info by JWT
- Login
- Delete current user by JWT
- Update Username
- Update Password

---------------------------------------------------------------------

#### Create Account/Register an Account - Public
	POST http://localhost:8000/api/users
	-Fields: username, password 
	-Authorization: none
	-Returns: Status 200 OK  // account created, info returned
			{
			"_id": "622c08211c919e1ccb135709",
			"username": "chacen",
			"userPosts": [],
			"savedPosts": [],
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmMwODIxMWM5MTllMWNjYjEzNTcwOSIsImlhdCI6MTY0NzA1MjgzMywiZXhwIjoxNjQ5NjQ0ODMzfQ.o5-NS5YS7moH0jzV9Wg3Vce2kBMB25fgCbruGgfZ9rc"
			}
		Status 400 Bad Request
	  		{"message": "User Already Exists","stack": "....."}			
	  	or	{"message": "Please Add All Fields", "stack": "....."}			
	  	or	{"message": "Could Not Create User - Invalid Entry", "stack": "....."}			

---------------------------------------------------------------------
#### Get current user info - Private  
	GET http://localhost:8000/api/users/me
	- Fields: none
	- Authorization: JWT
	- Returns: Status 200 OK  // return current user info
			{
			"_id": "622c08211c919e1ccb135709",
			"username": "chacen",
			"userPosts": [],
			"savedPosts": []
			}
		Status 400 Bad Request	
			{"message": "Access Not Authorized - Token Invlaid", "stack": "....."}	
		or  {"message": "Access Not Authorized - No Token", "stack": "....."}	

----------------------------------------------------------------
#### Login - Public
	POST http://localhost:8000/api/users/login
	- Fields: username, password 
	- Authorization: none
	- Returns: Status 200 OK  // login info returned
			{
			"_id": "622c087c1c919e1ccb135711",
			"username": "daven",
			"userPosts": [],
			"savedPosts": [],
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmMwODdjMWM5MTllMWNjYjEzNTcxMSIsImlhdCI6MTY0NzA1NTYzOSwiZXhwIjoxNjQ5NjQ3NjM5fQ.Sdg1j2lxoQVUuwCfG9_QkwIJT_AyXgee83O36ZJArX4"
			}
		Status 400 Bad Request
			{"message": "Invalid Credentials","stack": "....."}	
			
----------------------------------------------------------------
#### Delete User - Private
	DELETE http://localhost:8000/api/users/id
	- Fields: none
	- Authorization: JWT 
	- Returns: Status 200 OK  // user deleted
			{
    		"message": "User Deleted",
    		"deletedUser": {
				"_id": "622c29fa2331db3d76b7e8ba",
				"username": "daven",
				"password": "$2a$10$gynU4G7fUM8dNidRv7nTM.sxXZwojSI5Oo3PxnuqUYhJl62.PlZIm",
				"userPosts": [],
				"savedPosts": [],
				"createdAt": "2022-03-12T05:04:58.406Z",
				"updatedAt": "2022-03-12T05:04:58.406Z",
				"__v": 0
    			}
			}
		Status 400 Bad Request	
		    {"message": "Access Not Authorized - Token Invlaid","stack": "....."}	
		or  {"message": "Access Not Authorized - No Token","stack": "....."}
		or 	{"message": "Cannot read properties of null (reading 'id')","stack": "...." } // should never get this one unless you use a real token with a already deleted account

----------------------------------------------------------------
#### Update Username - Private
	PUT http://localhost:8000/api/users/username
	- Fields: username
	- Authorization: JWT
	- Returns: Status 200 OK    // updated user - new username
			{
    		"message": "Updated Username",
    		"updatedUser": {
				"_id": "622c2bb0fcccfb05b0efd55d",
				"username": "daven2",    
				"password": "$2a$10$sKp3IbYR5XtlFzYyqSuS..hg3WZOlsNsoBaNLMuHtrHSvBYGwvIMi",
				"userPosts": [],
				"savedPosts": [],
				"createdAt": "2022-03-12T05:12:16.738Z",
				"updatedAt": "2022-03-12T05:26:49.550Z",
				"__v": 0
    			}
			}
		Status 400 Bad Request	
			{"message": "Please Add New Username","stack": "...."}
		or  {"message": "Access Not Authorized - Token Invlaid","stack": "....."}	
		or  {"message": "Access Not Authorized - No Token","stack": "....."}

----------------------------------------------------------------
#### Update Password - Private
	PUT http://localhost:8000/api/users/password
	- Fields: password
	- Authorization: JWT
	- Returns: Status 200 OK    //updated user - new password
			{
    		"message": "Updated Password",
    		"updatedUser": {
				"_id": "622c2bb0fcccfb05b0efd55d",
				"username": "daven",
				"password": "$2a$10$Undl5WS4TBhu/bAPZjQwqOf93dZlNKyQKekEXG8P6DzV4DKf/AnKG",
				"userPosts": [],
				"savedPosts": [],
				"createdAt": "2022-03-12T05:12:16.738Z",
				"updatedAt": "2022-03-12T05:26:49.550Z",
				"__v": 0
    			}
			}
		Status 400 Bad Request	
			{"message": "Please Add New Password","stack": "...."}
		or  {"message": "Access Not Authorized - Token Invlaid","stack": "....."}	
		or  {"message": "Access Not Authorized - No Token","stack": "....."}


<br/><br/>
<br/><br/>
## UserPosts Routes api/UserPosts/.... 
-  

---------------------------------------------------------------------

<br/><br/>
<br/><br/>
----------------------------------------------------------------

## Goals Routes api/posts/....

- gets all posts
- get post by post id
- get post by user id
- update post 


----------------------------------------------------------------
#### Name
	Method http://localhost:8000/api/users
	- Fields:  
	- Authorization: 
	- Returns:{

			}