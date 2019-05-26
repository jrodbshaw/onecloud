const mongoose = require("mongoose");
// Import env variables from .env
require("dotenv").config({ path: ".env" });

// * Connect to the database and handle bad connections
const connectDB = async () => {
	try {
		await mongoose.connect(process.env.DATABASE, {
			useNewUrlParser: true,
			useFindAndModify: false,
			useCreateIndex: true,
		});
		console.log(`✔ 👌 mongoDB connected....`);
	} catch (err) {
		console.error(`❌ 📟 ❌ → ${err.message}`);
		// Exit process with failure
		process.exit(1);
	}
};
module.exports = connectDB;
