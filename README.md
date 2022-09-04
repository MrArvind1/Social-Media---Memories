

# Social-Media--MEMORIES

Created using React, Node.js, Express & MongoDB - from start to finish. The App is called "Memories" and it is a simple social media app that allows users to post interesting events that happened in their lives.

1.  WEB STACK used : NODE.js REACT.js MONGOdb EXPRESS.js

2.  Folder Structure

```bash
    CLIENT 
        |---------public :- Contain the html file
        |
        |---------src :- source folder of the front end
                |
                |-------action
                |
                |-------api
                |
                |-------components
                |        |
                |        |------auth
                |        |------form
                |        |------Posts
                |        |       |------post
                |        |       |------allposts
                |        |------postdetails
                |        |------pagination
                |        |------home
                |        |------navbar
                |
                |-------reducer
                |
                |-------APP
                |
                |-------constants
                | 
                |-------indes.js (entry point)




    SERVER 
        |---------controllers 
        |           |
        |           |------posts
        |           |
        |           |------user
        |
        |---------middleware 
        |
        |---------models
        |           |
        |           |------posts
        |           |
        |           |------user
        |
        |---------routes
        |           |
        |           |------posts
        |           |
        |           |------user
        |
        |---------index.js
        |        
```

3.  SETUP
    
    Server:-
            a.  Set up a .env file like the provided sample
            b.  setup mongodb cloud
            c.  run "npm install" without qoutes for installing all the dependencies
            d.  run npm start to start the server
            
    Client:-
            a.  run "npm install" without qoutes for installing all the dependencies
            b.  run npm start to start the client side application

4.  ERROR
    
    In case you are facing any error in setting up the project feel free to raise an issue 
