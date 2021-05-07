const container = document.querySelector(".container");
const input = document.querySelector("input");
const url="http://localhost:8100";
let usersArray = [];

const createCardList = (array) => {
  container.innerHTML = "";

  array.forEach((obj) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `<div class="name">Name</div><div class="name-content">${obj.username}</div><div class="email">Email</div><div class="email-content">${obj.email}</div>`;
    container.appendChild(card);
  });
};

fetch(url)
  .then((data) => {
    return data.text();
    // return data.json();
    // console.log ka example
  })
  .then((result) => {
    console.log(JSON.parse(result));
    usersArray = JSON.parse(result);
    createCardList(usersArray);
  });

input.addEventListener("input", (event) => {
  const searchStr = event.target.value.toLowerCase();

  const filteredArray = usersArray.filter((ele) => {
    return (
      ele.username.toLowerCase().includes(searchStr) ||
      ele.email.toLowerCase().includes(searchStr)
    );
  });

  createCardList(filteredArray);
});

// particle js configuration
particlesJS.load("particles-js", "particles.json");


const addUserButton=document.querySelector(".controls img");

addUserButton.addEventListener("click",()=>{
  const username=prompt("Enter your username");
  const email=prompt("Enter your email");
  
  const newUser ={
    username: username,
    email: email
  }

  const userId=prompt("Enter userId");
  const password=prompt("Enter password");

  const bodyData = {
    newUser,
    userId,
    password
  }
  fetch(`${url}/adddata`,{
    method: "POST",
    body: JSON.stringify(bodyData),
    headers:{
      "Content-Type":"application/json"
    },
  })
  .then((data) => data.json())
  .then(result => {
    usersArray=result;
    createCardList(result);
  })
  .catch(error=>{
    console.log(error)
    alert("user not added");
  })
})