import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import connectDB from "./config/db.js";
import User from "./models/User.js";
import Property from "./models/Property.js";

dotenv.config();

await connectDB();

const users = [
  {
    name: "Admin User",
    email: "admin@realestate.com",
    password: "123456",
    role: "admin",
  },
  {
    name: "Rahul Sharma",
    email: "rahul@realestate.com",
    password: "123456",
    role: "seller",
  },
  {
    name: "Priya Mehta",
    email: "priya@realestate.com",
    password: "123456",
    role: "agent",
  },
];

const seedData = async () => {
  try {
    await Property.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(
      await Promise.all(
        users.map(async (user) => ({
          ...user,
          password: await bcrypt.hash(user.password, 10),
        }))
      )
    );

    const adminUser = createdUsers[0]._id;
    const rahulUser = createdUsers[1]._id;
    const priyaUser = createdUsers[2]._id;

    const properties = [
      {
        title: "Luxury 3 BHK Apartment in Whitefield",
        type: "Buy",
        propertyType: "Apartment",
        price: "₹1.2 Cr",
        location: "Whitefield, Bangalore",
        bhk: "3 BHK",
        area: "1650 sq.ft",
        image: "https://images.unsplash.com/photo-1560185127-6ed189bf02f4",
        description: "Spacious 3 BHK apartment with modern interiors, clubhouse, swimming pool, and close to IT parks.",
        owner: rahulUser,
      },
      {
        title: "2 BHK for Rent in Marathahalli",
        type: "Rent",
        propertyType: "Apartment",
        price: "₹22,000/month",
        location: "Marathahalli, Bangalore",
        bhk: "2 BHK",
        area: "950 sq.ft",
        image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2",
        description: "Well-maintained flat with good ventilation and proximity to tech parks.",
        owner: priyaUser,
      },
      {
        title: "Premium 4 BHK Villa in Sarjapur Road",
        type: "Buy",
        propertyType: "Villa",
        price: "₹2.8 Cr",
        location: "Sarjapur Road, Bangalore",
        bhk: "4 BHK",
        area: "2800 sq.ft",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        description: "Independent villa with private garden, parking, and premium gated community.",
        owner: rahulUser,
      },
      {
        title: "Studio Apartment for Rent in Indiranagar",
        type: "Rent",
        propertyType: "Apartment",
        price: "₹18,000/month",
        location: "Indiranagar, Bangalore",
        bhk: "1 BHK",
        area: "500 sq.ft",
        image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb",
        description: "Compact studio apartment ideal for working professionals.",
        owner: priyaUser,
      },
      {
        title: "Residential Plot in Devanahalli",
        type: "Buy",
        propertyType: "Plot",
        price: "₹45 Lac",
        location: "Devanahalli, Bangalore",
        bhk: "NA",
        area: "1500 sq.ft",
        image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef",
        description: "Clear title plot near airport with good future appreciation.",
        owner: rahulUser,
      },
      {
        title: "Commercial Office Space in MG Road",
        type: "Rent",
        propertyType: "Commercial",
        price: "₹75,000/month",
        location: "MG Road, Bangalore",
        bhk: "NA",
        area: "1200 sq.ft",
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        description: "Fully furnished office space in prime business location.",
        owner: priyaUser,
      },
      {
        title: "Budget 1 BHK in Electronic City",
        type: "Buy",
        propertyType: "Apartment",
        price: "₹35 Lac",
        location: "Electronic City, Bangalore",
        bhk: "1 BHK",
        area: "650 sq.ft",
        image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
        description: "Affordable home for first-time buyers with basic amenities.",
        owner: rahulUser,
      },
      {
        title: "Luxury Penthouse in Koramangala",
        type: "Buy",
        propertyType: "Apartment",
        price: "₹3.5 Cr",
        location: "Koramangala, Bangalore",
        bhk: "4 BHK",
        area: "3200 sq.ft",
        image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
        description: "Top-floor penthouse with terrace garden and city view.",
        owner: priyaUser,
      },
      {
        title: "Shared 2 BHK for Rent in BTM",
        type: "Rent",
        propertyType: "Apartment",
        price: "₹10,000/month",
        location: "BTM Layout, Bangalore",
        bhk: "2 BHK",
        area: "900 sq.ft",
        image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85",
        description: "Shared accommodation suitable for students.",
        owner: rahulUser,
      },
      {
        title: "Farmhouse Land in Mysore Road",
        type: "Buy",
        propertyType: "Plot",
        price: "₹60 Lac",
        location: "Mysore Road, Bangalore",
        bhk: "NA",
        area: "2400 sq.ft",
        image: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae",
        description: "Peaceful farmhouse land surrounded by greenery.",
        owner: adminUser,
      },
    ];

    await Property.insertMany(properties);

    console.log("✅ Advanced seed data imported successfully");
    console.log("Admin login: admin@realestate.com / 123456");
    console.log("Seller login: rahul@realestate.com / 123456");
    console.log("Agent login: priya@realestate.com / 123456");

    process.exit();
  } catch (error) {
    console.error("❌ Seeder Error:", error.message);
    process.exit(1);
  }
};

seedData();