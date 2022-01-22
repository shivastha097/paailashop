import bcrypt from 'bcryptjs'

const users = [
    {
        name: "Admin User",
        email: "admin@gmail.com",
        password: bcrypt.hashSync('123456', 10),
        isAdmin: true
    },
    {
        name: "Shiva Shrestha",
        email: "shivastha097@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Bobby Shah",
        email: "bobby@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Sumina Rai",
        email: "sumina@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    },
    {
        name: "Paras Khadka",
        email: "paras123@gmail.com",
        password: bcrypt.hashSync('123456', 10),
    },
]

export default users