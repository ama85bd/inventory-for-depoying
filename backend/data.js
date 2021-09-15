import bcrypt from "bcryptjs";
const data = {
  users: [
    {
      name: "Asif",
      email: "asif@lged.com",
      password: bcrypt.hashSync("1234", 8),
      dept: "MIS",
      isSuperAdmin: true,
      isAdmin: true,
    },
    {
      name: "Ashique",
      email: "ashique@lged.com",
      password: bcrypt.hashSync("1234", 8),
      dept: "MIS",
    },
  ],
};

export default data;
