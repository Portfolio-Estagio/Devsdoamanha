class User{
  constructor(id, name, password, email, date_created){
    this.id = id;
    this.name = name;
    this.password = password;
    this.email = email;
    this.date_created = date_created;
  }
}

exports.User = User;
