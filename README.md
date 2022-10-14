API for card game application

Takes incoming API calls, handles them and queries database as needed for storage, retrieval and modification of user data. Set up as you would any node js application.
Its server instance runs on port 8000, you can open it up in a second VSCode window and run it there if you want to test hitting the endpoints from the 
card game application, and you can also use Postman to test it. Since it doesn't serve any web pages, you don't need to go to localhost:8000 in a browser, just need
it running in another VSCode window. 

It will handle the card game's requests and send responses that the application can then handle. For example, when a user logs in on the application, the user
and password are sent to this API via POST request, it grabs their profile info if it exists from the database, and sends that profile object as a response that
the application can then display on the web page.
