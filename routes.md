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
- Update User
- 

---------------------------------------------------------------------

#### Create Account/Register an Account
	POST http://localhost:8000/api/users
	-Fields: username, password 
	-Authorization: none
	-Returns:{
			"_id": "622c08211c919e1ccb135709",
			"username": "chacen",
			"userPosts": [],
			"savedPosts": [],
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmMwODIxMWM5MTllMWNjYjEzNTcwOSIsImlhdCI6MTY0NzA1MjgzMywiZXhwIjoxNjQ5NjQ0ODMzfQ.o5-NS5YS7moH0jzV9Wg3Vce2kBMB25fgCbruGgfZ9rc"
			}
	  	or	{"message": "User Already Exists","stack": "....."}			
	  	or	{"message": "Please Add All Fields": "....."}			

---------------------------------------------------------------------
#### Get current user info  // protected so don't need to use user id but you need the jwt from login or register
	GET http://localhost:8000/api/users/me
	- Fields: none
	- Authorization: JWT
	- Returns:{
			"id": "622c08211c919e1ccb135709",
			"username": "chacen",
			"userPosts": [],
			"savedPosts": []
			}
		or  {"message": "Access Not Authorized - Token Invlaid","stack": "....."}	
		or  {"message": "Access Not Authorized - No Token","stack": "....."}	

----------------------------------------------------------------
#### Login
	POST http://localhost:8000/api/users/login
	- Fields: username, password 
	- Authorization: none
	- Returns:{
			"_id": "622c087c1c919e1ccb135711",
			"username": "daven",
			"userPosts": [],
			"savedPosts": [],
			"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMmMwODdjMWM5MTllMWNjYjEzNTcxMSIsImlhdCI6MTY0NzA1NTYzOSwiZXhwIjoxNjQ5NjQ3NjM5fQ.Sdg1j2lxoQVUuwCfG9_QkwIJT_AyXgee83O36ZJArX4"
			}
		or  {"message": "Invalid Credentials","stack": "....."}	
			
----------------------------------------------------------------
#### Delete User
	DELETE http://localhost:8000/api/users/id
	- Fields: id
	- Authorization: JWT 
	- Returns:{


			}
----------------------------------------------------------------
#### Update User
	PUT http://localhost:8000/api/users/id
	- Fields:  
	- Authorization: 
	- Returns:{

			}





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