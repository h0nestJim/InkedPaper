//seeder for fake users
import bcrypt from 'bcryptjs'

const users = [
    {
    name: "Admin User",
    email: "admin@inked.com",
    password: bcrypt.hashSync('adminpass', 10),
    isAdmin: true
    },
    {
    name: "Jim Shaun",
    email: "shaunj@btc.ac.uk",
    password: bcrypt.hashSync('123xyz', 10),
    },
    {
    name: "Sam Wyatt",
    email: "samw@live.co.uk",
    password: bcrypt.hashSync('123xyz', 10),
    }
]

export default users