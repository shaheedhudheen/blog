## A schema and a model are two concepts in Mongoose, which is a library that helps us work with MongoDB, a NoSQL database. A schema defines the shape and structure of the documents that we want to store in a MongoDB collection. For example, if we want to store information about books, we can create a schema that specifies the title, author, genre, and rating of each book. A schema also allows us to declare additional features such as virtual properties, custom validation, getters and setters, and statics and methods.

## A model is a class that is created by compiling a schema. A model represents a MongoDB collection and provides us with methods to perform CRUD (create, read, update, delete) operations on the documents in that collection. For example, if we have a book schema, we can create a book model by passing the schema and the collection name to the mongoose.model() method. Then we can use the book model to create new books, find books by title or genre, update books’ ratings, or delete books from the database. A model is essentially an interface between our application logic and the database.

question? 

how request header getting a token that response given