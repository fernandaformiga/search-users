let filteredUsersHTML = null;
let allUsers = [];
let filteredUsers = [];

window.addEventListener('load', start);

function start() {
  let nameInput = null;
  nameInput = document.querySelector('#nameInput');
  nameInput.focus();
  nameInput.addEventListener('keyup', searchUsers);
  fetchNames();
}

async function fetchNames() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfohttps://restcountries.eu/rest/v2/all'
  );
  const json = await res.json();
  allUsers = json;
  allUsers = json.results.map((user) => {
    return {
      name: user.name.first + ' ' + user.name.last,
      picture: user.picture.medium,
      age: user.dob.age,
      gender: user.gender,
    };
  });
}

function searchUsers() {
  if (nameInput.value !== '') {
    filteredUsers = allUsers.filter((user) => {
      return user.name.toLowerCase().includes(nameInput.value.toLowerCase());
    });
    console.log('Found users');
    // console.log(filteredUsers);
  } else {
    console.log("Didn't find users");
    filteredUsers = [];
  }
  showUsers();
  showUsersStatistics();
}

function showUsers() {
  // console.log(filteredUsers);
  let usersHTML = '<div><h2>USERS FOUND</h2>';
  let filteredUsersCards = document.getElementById('filteredUsers');
  filteredUsers.forEach((user) => {
    // console.log(user.name);
    const { name, picture, age, gender } = user;
    let userData = `
      <div class="userCard">
        <img src="${picture}" style="border-radius: 50%"></img>
        <div class="userInfo">
          <p><b>${name}</b></p>
          <p>Age: ${age}</p>
          <p>Gender: ${gender}</p>
        </div>
      </div>
    `;
    usersHTML = usersHTML + userData;
  });
  usersHTML = usersHTML + '</div>';
  filteredUsersCards.innerHTML = usersHTML;
}

function showUsersStatistics() {
  let UsersStatistics = document.getElementById('userStatistics');
  let numberOfMen = 0;
  let numberOfWomen = 0;
  var agesTotal = 0;
  var agesAverage = 0;
  var averageRounded = 0;
  filteredUsers.forEach((user) => {
    if (user.gender === 'female') numberOfWomen += 1;
    if (user.gender === 'male') numberOfMen += 1;
    agesTotal += user.age;
  });
  agesAverage = agesTotal / filteredUsers.length;
  averageRounded = Math.round(agesAverage * 10) / 10;

  UsersStatistics.innerHTML = `<div class= "stats"><h2>STATS</h2>
  <div class="statsCard">Women: ${numberOfWomen}</div>
  <div class="statsCard">Men: ${numberOfMen}</div>
  <div class="statsCard">Sum of Ages: ${agesTotal}</div>
  <div class="statsCard">Average Age: ${averageRounded}</div>
  </div>`;
}
