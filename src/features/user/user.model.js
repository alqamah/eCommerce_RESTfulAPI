export class UserModel{
    constructor(name, email, password, userType){
        this.name = name;
        this.email = email;
        this.password = password;
        this.userType = userType;
    }

    static signup(user){
        const newUser = new UserModel(user.name, user.email, user.password, user.userType);
        newUser.id = users.length + 1;
        users.push(newUser);    
    }

    static signin(email, password){
        const user = users.find(user => user.email == email && user.password == password);
        return user;
    }

    static getAll(){   
        return users;
    }
}


var users = [
    {
        id: 1,
        name: "User 1",
        email: "user1@gmail.com",
        password: "PASSWORD",
        userType: "seller"
    },
    {
        id: 2,
        name: "Alqama",
        email: "alqama.hasnain@gmail.com",
        password: "pass",
        userType: "admin"
    }
]