# Understanding the Class

The Database CRUD class provides a set of methods for interacting with a MongoDB database using Mongoose. It's designed to handle common CRUD (Create, Read, Update, Delete) operations, as well as some additional features like filtering and counting documents.

## Steps to Use the Class

```ts
// Imports:
import { Schema, model } from 'mongoose';
import { DBCrud } from '@/database'; // Adjust the path if needed

// Create a Mongoose Model:
const mySchema = new Schema({
    // Define your schema fields here
    name: String,
    age: Number,
    // ... other fields
});
const MyModel = model('MyModel', mySchema); // Replace 'MyModel' with your model name

// Instantiate the DBCrud Class:
const dbCRUD = new DBCrud(MyModel); // Pass your Mongoose model

// Perform CRUD Operations:
// Create:
const newDocument = { name: 'John Doe', age: 30 };
const createdDocuments = await dbCRUD.create(newDocument);
console.log(createdDocuments); // Array of created documents

// Read (Find All):
const allDocuments = await dbCRUD.findAll(); // Find all documents
console.log(allDocuments);

// Read (Find One):
const document = await dbCRUD.findOne({ name: 'John Doe' });
console.log(document);

// Read (Find by ID):
const document = await dbCRUD.findById('your_document_id');
console.log(document);

// Update:
const updatedDocument = await dbCRUD.update('your_document_id', { age: 35 });
console.log(updatedDocument);

// Delete:
await dbCRUD.delete({ name: 'John Doe' });
console.log('Document deleted');

// Additional Features:
// Filtering:
const pipeline = [
    { $match: { age: { $gt: 25 } } }, // Filter by age greater than 25
    { $sort: { name: 1 } } // Sort by name ascending
];
const filteredDocuments = await dbCRUD.filter(pipeline);
console.log(filteredDocuments);

// Counting:
const count = await dbCRUD.count({ age: { $gt: 25 } });
console.log(`Number of documents: ${count}`);
```

### Important Notes

- Database Connection: The DBCrud class assumes you have already established a connection to your MongoDB database using Mongoose.
- Error Handling: You should implement proper error handling in your code to catch any potential errors during database operations.
- Asynchronous Operations: Remember that most database operations are asynchronous. Use await to handle the results of these operations.
