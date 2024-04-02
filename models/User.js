"use strict";

class User {
  constructor(
    firstName,
    lastName,
    userName,
    passWord,
    pageSize = 10,
    category = "Business"
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.userName = userName;
    this.passWord = passWord;
    this.pageSize = pageSize;
    this.category = category;
  }
}

class Task {
  constructor(task, owner, isDone) {
    this.task = task;
    this.owner = owner;
    this.isDone = isDone;
  }
}
