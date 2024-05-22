//  Connecting the Schemas and Setting Up Relationships
// You can now use these schemas in your application to create and manage documents, ensuring that the relationships between different entities are maintained through references.
//  Example of Creating and Saving Documents
// Here is an example of how you might create and save documents using these schemas:

// import User from "./user";
// import Artist from "./artist.ts";
// import Artwork from "./artwork.ts";
// import Order from "./order.ts";
// import Cart from "./cart.ts";
// import PageContent from "./pageContent.ts";
// import AdminDashboard from "./adminDashboard.ts";

// 3. Artwork Schema

// const artworkSchema = new Schema({
//   title: { type: String, required: true },
//   description: String,
//   dimensions: {
//     height: Number,
//     width: Number,
//     depth: Number,
//   },
//   medium: String,
//   images: [String], // URLs to high-resolution images
//   price: { type: Number, required: true },
//   artist: { type: Schema.Types.ObjectId, ref: "Artist", required: true },
//   relatedArtworks: [{ type: Schema.Types.ObjectId, ref: "Artwork" }],
// });

// const Artwork = model("Artwork", artworkSchema);
// Artwork;

// // 4. Order Schema

// const orderSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       artwork: { type: Schema.Types.ObjectId, ref: "Artwork", required: true },
//       quantity: { type: Number, required: true },
//       price: { type: Number, required: true },
//     },
//   ],
//   totalCost: { type: Number, required: true },
//   shippingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String,
//   },
//   billingAddress: {
//     street: String,
//     city: String,
//     state: String,
//     zip: String,
//     country: String,
//   },
//   paymentMethod: { type: String, required: true },
//   orderStatus: { type: String, required: true },
//   orderDate: { type: Date, default: Date.now },
//   estimatedDeliveryDate: { type: Date, required: true },
// });

// const Order = model("Order", orderSchema);
// Order;

// // 5. Shopping Cart Schema

// const cartSchema = new Schema({
//   user: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   items: [
//     {
//       artwork: { type: Schema.Types.ObjectId, ref: "Artwork", required: true },
//       quantity: { type: Number, required: true },
//     },
//   ],
//   totalCost: { type: Number, required: true },
// });

// const Cart = model("Cart", cartSchema);
// Cart;

// // 6. Page Content Schema(e.g., About Us, Contact Us)

// const teamMemberSchema = new Schema({
//   name: String,
//   role: String,
//   bio: String,
// });

// const faqSchema = new Schema({
//   question: String,
//   answer: String,
// });

// const pageContentSchema = new Schema({
//   page: { type: String, required: true }, // e.g., "about", "contact"
//   content: String,
//   additionalInfo: {
//     mission: String, // Only for About Us page
//     values: String, // Only for About Us page
//     team: [teamMemberSchema], // Only for About Us page
//     contactDetails: { // Only for Contact Us page
//       address: String,
//       phone: String,
//       email: String,
//     },
//     faq: [faqSchema], // Only for Contact Us page (optional)
//   },
// });

// const PageContent = model("PageContent", pageContentSchema);

// // 7. Admin Dashboard Schema(optional)

// const adminDashboardSchema = new Schema({
//   admin: { type: Schema.Types.ObjectId, ref: "User", required: true },
//   siteAnalytics: {
//     totalVisitors: Number,
//     totalSales: Number,
//     totalArtworks: Number,
//     totalArtists: Number,
//   },
//   manageArtists: [{ type: Schema.Types.ObjectId, ref: "Artist" }],
//   manageArtworks: [{ type: Schema.Types.ObjectId, ref: "Artwork" }],
//   manageOrders: [{ type: Schema.Types.ObjectId, ref: "Order" }],
//   manageUsers: [{ type: Schema.Types.ObjectId, ref: "User" }],
// });

// const AdminDashboard = model("AdminDashboard", adminDashboardSchema);
// AdminDashboard;

// connect("mongodb://localhost:27017/artPlatform", { useNewUrlParser: true, useUnifiedTopology: true });

// // Example of creating a user
// const newUser = new User({
//   username: "john_doe",
//   email: "john@example.com",
//   passwordHash: "hashedpassword",
//   profile: {
//     firstName: "John",
//     lastName: "Doe",
//     address: {
//       street: "123 Main St",
//       city: "Anytown",
//       state: "CA",
//       zip: "12345",
//       country: "USA",
//     },
//   },
// });

// newUser.save()
//   .then(user => console.log("User created:", user))
//   .catch(err => console.error("Error creating user:", err));

// // Example of creating an artist
// const newArtist = new Artist({
//   name: "Jane Doe",
//   bio: "An accomplished artist specializing in modern art.",
//   background: "Graduated from Art School XYZ",
// });

// newArtist.save()
//   .then(artist => console.log("Artist created:", artist))
//   .catch(err => console.error("Error creating artist:", err));

// // Example of creating an artwork
// const newArtwork = new Artwork({
//   title: "Sunset Over the Hills",
//   description: "A beautiful sunset painting.",
//   dimensions: {
//     height: 24,
//     width: 36,
//     depth: 1.5,
//   },
//   medium: "Oil on canvas",
//   images: ["http://example.com/image1.jpg", "http://example.com/image2.jpg"],
//   price: 500,
//   artist: newArtist._id,
// });

// newArtwork.save()
//   .then(artwork => console.log("Artwork created:", artwork))
//   .catch(err => console.error("Error creating artwork:", err));
