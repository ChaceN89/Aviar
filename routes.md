# Endpoints

## Table of Contents

* [Users Routes](#user-routes)
	- Create Account/Register an Account
	- Get current user info 
	- Login
	- Delete User
	- Update Username
	- Update Password

<br>

* [Post Routes](#post-routes)
	- create Post
	- get Post by id
	- deletePost
	- getAllPosts
	- getPostsByTerm
	- addComment
	- increase likes on post 
	- remove comment -- not finished (probably not needed)

<br>

* [Collection Routes](#collection-routes)
	- add collection with post
	- add collection
	- get collections
	- update collection name
	- delete collection
	- add post to collection
	- remove post from collection
	- getCollectionNames -- not finished (probably not needed)
	- getCollectionPosts -- not finished (probably not needed)

<br>

---------------------------------------------------------------------
###	Test Accounts
	username: chacen
	password: 1234

	username: testing
	password: 123

---------------------------------------------------------------------

<br><br>

## Users Routes api/Users/.... 

---------------------------------------------------------------------

- Create Account
- Get current user info by JWT
- Login
- Delete current user by JWT
- Update Username
- Update Password

---------------------------------------------------------------------

<details><summary>CreateUserAccount</summary>

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

</details>

---------------------------------------------------------------------

<details><summary>Create Current User</summary>

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

</details>

---------------------------------------------------------------------

<details><summary>Login</summary>

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
			
</details>

---------------------------------------------------------------------



<details><summary>Delete User</summary>

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

</details>

---------------------------------------------------------------------

<details><summary>Update Username</summary>

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

</details>

---------------------------------------------------------------------

<details><summary>Update Password</summary>

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

</details>


----------------------------------------------------------------
<br><br>

## Post Routes api/posts/....

- create Post
- get Post by id
- deletePost
- getAllPosts
- getPostsByTerm
- addComment
- increase likes on post 
- remove comment (not done and probbaly not needed)


----------------------------------------------------------------

<details><summary>Create Post</summary>


#### createPost - Private  (also update post id in userPost array of the user)
	POST http://localhost:8000/api/posts
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
		
</details>

----------------------------------------------------------------

<details><summary>Get Post</summary>	

#### getPost - public
	GET http://localhost:8000/api/posts/id
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

</details>

----------------------------------------------------------------

<details><summary>Delete Post</summary>

#### deletePost - Private
	DELETE http://localhost:8000/api/posts/id
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
		
</details>

----------------------------------------------------------------

<details><summary>Get All Posts</summary>

#### getAllPosts - Public
	GET http://localhost:8000/api/posts
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


</details>

----------------------------------------------------------------

<details><summary>Search for Posts by term in caption</summary>

#### getPostsByTerm - public
	returns all posts where caption contains the key word term
	GET http://localhost:8000/api/posts/search
	- Fields: term
	- Authorization: none 
	- Returns:[  // array of returned posts
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
		Status 400 Bad Request
			{"message": "no search Term","stack": "... }

</details>

----------------------------------------------------------------

<details><summary>Add comment to post</summary>

#### addComment -private
	POST http://localhost:8000/api/posts/comment/id
	- Fields:  id, comment
	- Authorization: JWT
	- Returns:{  200 status ok  // doens't retrun latest object but updates database
								// if you do 3rd comment it will return the folowing
				"_id": "62380b392ccc8b476ca10a12",
				"user": "622c08211c919e1ccb135709",
				"imgPath": "22.png",
				"caption": "this",
				"comments": [
					"1st comment",
					"2nd comment"
				],
				"ratings": [],
				"numLikes": 0,
				"theme": "space",
				"medium": "photo",
				"tags": [],
				"createdAt": "2022-03-21T05:20:57.702Z",
				"updatedAt": "2022-03-21T05:45:32.895Z",
				"__v": 0
			}
		Status 400 Bad Request
			{"message": "Need Post information","stack": "... }
		or	{"message": "Post not found","stack": "... }

</details>

----------------------------------------------------------------


<details><summary>AddLike to Post</summary>

#### Add like to post - public  - not attached to any specific user - simple
	METHOD http://localhost:8000/api/posts
	- Fields:  id
	- Authorization: none
	- Returns:{  200 status ok  
				"message": "added like to post",
				"post": {
					"acknowledged": true,
					"modifiedCount": 1,
					"upsertedId": null,
					"upsertedCount": 0,
					"matchedCount": 1
				}
			}
		Status 400 Bad Request
			{"message": "Need post ID","stack": "... }

</details>

----------------------------------------------------------------
<br><br>


## Collection Routes api/Collections/.... 
- add collection with post
- add collection
- get collections
- update collection name
- delete collection
- add post to collection
- remove post from collection



----------------------------------------------------------------

<details><summary>Add Collection with initial post</summary>

#### Add Collection and Post - private
	POST http://localhost:8000/api/Collections/post
	- Fields:  name, id
	- Authorization: JWT
	- Returns:{   200 status ok    // adds post id to 
				"message": "collection added",
				"postid": "623803231d1f4a44c1429e47",
				"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"623803231d1f4a44c1429e47",
						"623803401d1f4a44c1429e4d",
						"62380b242ccc8b476ca10a0c",
						"62380b392ccc8b476ca10a12"
					],
					"savedPosts": [
						{
							"collectionName": "collection1",
							"PostList": [
								"623803231d1f4a44c1429e47"
							],
							"_id": "6238fcdf95e9a340f292e8d2"
						}
					],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-21T22:31:59.781Z",
					"__v": 0
				}
			}
		Status 400 Bad Request
			{"message": "Need to add name or id","stack": "... }
		or	{"message": "Please enter valid Post id","stack": "... }			

</details>

----------------------------------------------------------------

<details><summary>Add empty Collection </summary>

#### Add Collection -private
	POST http://localhost:8000/api/Collections/post
	- Fields:  name, id
	- Authorization: JWT
	- Returns:{   200 status ok    
				"message": "collection added",
				"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"623803231d1f4a44c1429e47",
						"623803401d1f4a44c1429e4d",
						"62380b242ccc8b476ca10a0c",
						"62380b392ccc8b476ca10a12"
					],
					"savedPosts": [
						{
							"collectionName": "collection1",
							"PostList": [],
							"_id": "6238fcdf95e9a340f292e8d2"
						}
					],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-21T22:31:59.781Z",
					"__v": 0
				}
			}
		Status 400 Bad Request
			{"message": "Need to add name or id","stack": "... }


</details>

----------------------------------------------------------------

<details><summary>get Collections</summary>

#### get collections - private]
	GET http://localhost:8000/api/Collections
	- Fields: none
	- Authorization: JWT
	- Returns:[  200 status ok   -- returns all collections
				{
					"collectionName": "collection1",
					"PostList": [
						"623803231d1f4a44c1429e47"
					],
					"_id": "623908abe4e912d6dc0e4a87"
				},
				{
					"collectionName": "collection1",
					"PostList": [],
					"_id": "623908aee4e912d6dc0e4a8c"
				},
				{
					"collectionName": "collection3",
					"PostList": [],
					"_id": "623908f8e469eaf2c5889473"
				}
			]
		or null

</details>

----------------------------------------------------------------

<details><summary>Update Collection name</summary>

#### update Collection name using the collection id - private
	PUT http://localhost:8000/api/Collections
	- Fields:  id, name
	- Authorization: JWT
	- Returns:{  200 status ok  // cahnges name in database of specific collection
				"message": "update name updated",
				"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"623803231d1f4a44c1429e47",
						"623803401d1f4a44c1429e4d",
						"62380b242ccc8b476ca10a0c",
						"62380b392ccc8b476ca10a12"
					],
					"savedPosts": [
						{
							"collectionName": "collection1",
							"PostList": [
								"623803231d1f4a44c1429e47"
							],
							"_id": "623908abe4e912d6dc0e4a87"
						},
						{
							"collectionName": "new collection name",
							"PostList": [],
							"_id": "623908aee4e912d6dc0e4a8c"
						},
					],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-22T03:56:35.212Z",
					"__v": 0
				}
			}
		Status 400 Bad Request
			{"message": "Need new collection name","stack": "... }
		or	{"message": "Please enter valid collection id","stack": "... }
			

</details>

------------------------------------


<details><summary>Delete Collection</summary>

#### Delete Collection -private
	DELETE http://localhost:8000/api/Collections
	- Fields:  id
	- Authorization: JWT
	- Returns:{  200 status ok
					"message": "Collection Deleted",
					"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"623803231d1f4a44c1429e47",
						"623803401d1f4a44c1429e4d",
						"62380b242ccc8b476ca10a0c",
						"62380b392ccc8b476ca10a12"
					],
					"savedPosts": [
						{
							"collectionName": "collection1",
							"PostList": [
								"623803231d1f4a44c1429e47"
							],
							"_id": "623908abe4e912d6dc0e4a87"
						},
						{
							"collectionName": "collection1",
							"PostList": [],
							"_id": "623908aee4e912d6dc0e4a8c"
						},
						{
							"collectionName": "collection3",
							"PostList": [],
							"_id": "62394073240bff28e6642f91"
						}
					],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-22T04:27:30.974Z",
					"__v": 0
				}
			}
			Status 400 Bad Request
			{"message": "Need new collection id","stack": "... }
		or	{"message": "Please enter valid collection id","stack": "... }

</details>


----------------------------------------------------------------

<details><summary>Add post to collection</summary>

#### add Post To Collection  - private
		-- using post id and collection id
	POST http://localhost:8000/api/Collections/id
	- Fields:  pid, cid 
	- Authorization: JWT
	- Returns:{  200 status ok // adds post pid to collection cid 
					"message": "post added to collection",
					"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"623803231d1f4a44c1429e47",
						"623803401d1f4a44c1429e4d",
						"62380b242ccc8b476ca10a0c",
						"62380b392ccc8b476ca10a12"
					],
					"savedPosts": [
						{
							"collectionName": "collection1",
							"PostList": [
								"62380b392ccc8b476ca10a12",
								"62380b392ccc8b476ca10a12"
							],
							"_id": "623908abe4e912d6dc0e4a87"
						},
					],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-22T05:03:41.007Z",
					"__v": 0
				}
			}
		Status 400 Bad Request
			{"message": "Need to add an id","stack": "... }
		or	{"message": "Please enter valid id","stack": "... }

</details>

----------------------------------------------------------------


<details><summary>remove post from collection</summary>

#### remove Post From Collection - private
			-- using post id and collection id
	DELETE http://localhost:8000/api/Collections/id
	- Fields:  pid, cid 
	- Authorization: JWT
	- Returns:{  200 status ok // removes post pid to collection cid 
					"message": "post added to collection",
					"user": {
					"_id": "622c08211c919e1ccb135709",
					"username": "chacen",
					"password": "$2a$10$QtqlLftGfxoMbREZXp3UH.26IgazwxouXmQmRGhJWVX6EtiCFoE..",
					"userPosts": [
						"623803231d1f4a44c1429e47",
						"623803401d1f4a44c1429e4d",
						"62380b242ccc8b476ca10a0c",
						"62380b392ccc8b476ca10a12"
					],
					"savedPosts": [
						{
							"collectionName": "collection1",
							"PostList": [
								"62380b392ccc8b476ca10a12",
								"62380b392ccc8b476ca10a12"
							],
							"_id": "623908abe4e912d6dc0e4a87"
						},
					],
					"createdAt": "2022-03-12T02:40:33.416Z",
					"updatedAt": "2022-03-22T05:03:41.007Z",
					"__v": 0
				}
			}
		Status 400 Bad Request
			{"message": "Need to add an id","stack": "... }
		or	{"message": "Please enter valid id","stack": "... }


</details>

----------------------------------------------------------------

<br><br>
<br><br>

---
<details><summary>Template</summary>

#### name
	METHOD http://localhost:8000/api/Collections/
	- Fields:  id
	- Authorization: JWT
	- Returns:{  200 status ok  // all posts of a collection(id)

			}
</details>
