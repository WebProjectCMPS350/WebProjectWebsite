

class User{
    #name;
    #username;
    #password;

    constructor(name, username, password){
        this.#name = name;
        this.#username = username;
        this.#password = password;
    }

    get name() {
        return this.#name;

    }

    set name(newName){
        this.#name = newName;
    }

    get username() {
        return this.#username;
    }

    set username(username) {
        this.#username = username;
    }

    get password() {
        return this.#password;

    }

    set password(password) {
        this.#password = password;
    }



}

export default User;