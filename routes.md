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
----------------------------------------------------------------

## Goals Routes api/posts/....

- gets all posts
- get post by post id
- get post by user id
- update post 


----------------------------------------------------------------
#### createPost - Private  (also update post id in userPost array of the user)
	Method http://localhost:8000/api/post
	- Fields: imgPath, caption, theme. medium  //can add more later  
	- Authorization: JWT
	- Returns:{    Status 200 OK   // creates post and updates userPost array
			"user": "622c08211c919e1ccb135709",
			"imgPath": "22.png",
			"caption": "this is a caption",
			"comments": [],
			"ratings": [],
			"numLikes": 0,
			"theme": "space",
			"medium": "photo",
			"tags": [],
			"_id": "6237f51d7c8743e31157bf1a",
			"createdAt": "2022-03-21T03:46:37.034Z",
			"updatedAt": "2022-03-21T03:46:37.034Z",
			"__v": 0
			}
		
		

#### getPost - public
	Method http://localhost:8000/api/posts/id
	- Fields:  id
	- Authorization: 
	- Returns:{ Status 200 OK   // jsut gets a post
			"_id": "6237fee84f63fab94eb8e146",
			"user": "622c08211c919e1ccb135709",
			"imgPath": "22.png22",
			"caption": "this is a caption22",
			"comments": [],
			"ratings": [],
			"numLikes": 0,
			"theme": "space22",
			"medium": "photo22",
			"tags": [],
			"createdAt": "2022-03-21T04:28:24.472Z",
			"updatedAt": "2022-03-21T04:28:24.472Z",
			"__v": 0
			}
		Status 400 Bad Request
			{"message": "Please enter a Post id","stack": "... }
		or	{"message": "Please enter valid Post id","stack": "... }
		or	{"message": "post not found","stack": "... }



#### deletePost - Private
	Method http://localhost:8000/api/posts/id
	- Fields:  id
	- Authorization: jwt
	- Returns:{
				"message": "post deleted",
				"post": {
					"_id": "623801aea2fb01496181dae3",
					"user": "622c08211c919e1ccb135709",
					"imgPath": "22.png22",
					"caption": "this is a caption22",
					"comments": [],
					"ratings": [],
					"numLikes": 0,
					"theme": "space22",
					"medium": "photo22",
					"tags": [],
					"createdAt": "2022-03-21T04:40:14.825Z",
					"updatedAt": "2022-03-21T04:40:14.825Z",
					"__v": 0
				},
				"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"6237fba241e253a12b1a4085",
						"623801aea2fb01496181dae3"
					],
					"savedPosts": [],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-21T04:40:14.870Z",
					"__v": 0
				}
			}
		Status 400 Bad Request
			{"message": "post not found","stack": "... }

		Status 401 notAuthorized 
			{"message": "User not found","stack": "... }
		or	{"message": "User not authorized","stack": "... }
		


#### getAllPosts - Public
	Method http://localhost:8000/api/posts
	- Fields:  none
	- Authorization: none
	- Returns:[  // array of posts returns empty array [] if there are no posts
				{
					"_id": "623803231d1f4a44c1429e47",
					"user": "622c08211c919e1ccb135709",
					"imgPath": "22.png22",
					"caption": "this is a caption22",
					"comments": [],
					"ratings": [],
					"numLikes": 0,
					"theme": "space22",
					"medium": "photo22",
					"tags": [],
					"createdAt": "2022-03-21T04:46:27.419Z",
					"updatedAt": "2022-03-21T04:46:27.419Z",
					"__v": 0
				},
				{
					"_id": "623803401d1f4a44c1429e4d",
					"user": "622c08211c919e1ccb135709",
					"imgPath": "22.png",
					"caption": "this is a caption",
					"comments": [],
					"ratings": [],
					"numLikes": 0,
					"theme": "space",
					"medium": "photo",
					"tags": [],
					"createdAt": "2022-03-21T04:46:56.328Z",
					"updatedAt": "2022-03-21T04:46:56.328Z",
					"__v": 0
				}
			]






#### Name
	Method http://localhost:8000/api/posts
	- Fields:  
	- Authorization: 
	- Returns:{

			}