const playersList = [
  {
    id: 1,
    title: "cristiano ronaldo",
    details: "footballist in portugal",
    addedTime: "2022/02/05",
  },
  {
    id: 2,
    title: "ali daei",
    details: "footballist in iran",
    addedTime: "2022/02/07",
  },
];

const playersForm = document.querySelector(".players-form");
const title = document.getElementById("title");
const description = document.getElementById("description");
const details = document.getElementById("details");
const submitButton = document.getElementById("submit-btn");
const sortSelect = document.getElementById("sort-select");
const listOfPlayers = document.getElementById("listOfPlayers");
const overlay = document.getElementById("overlay");
const overlayDescription = document.getElementById("overlay-description");
const requiredTitle = document.getElementById("requiredTitle");
const requiredDetails = document.getElementById("requiredDetails");

function addNewPlayer() {
  requiredTitle.classList.add("hidden");
  requiredDetails.classList.add("hidden");

  const today = new Date();
  const addedDate = `${today.getFullYear()}/${
    today.getMonth() + 1
  }/${today.getDate()}`;

  const newPlayer = {
    id: Date.now(),
    title: title.value,
    description: description.value,
    details: details.value,
    addedTime: addedDate,
  };

  if (title.value.trim() && details.value.trim()) {
    const sort = sortSelect.value;

    if (sort === "Newest") {
      playersList.unshift(newPlayer);
    } else if (sort === "A-Z") {
      playersList.push(newPlayer);
      playersList.sort((a, b) => a.title.localeCompare(b.title));
    } else {
      playersList.push(newPlayer);
    }
    submitButton.style.backgroundColor = "#ffffff";
  } else if (!title.value.trim()) {
    requiredTitle.classList.remove("hidden");
    requiredTitle.innerHTML = "This field is required.";
    submitButton.style.backgroundColor = "#c5c2f1";
  } else if (!details.value.trim()) {
    requiredDetails.classList.remove("hidden");
    requiredDetails.innerHTML = "This field is required.";
    submitButton.style.backgroundColor = "#c5c2f1";
  }

  title.value = "";
  description.value = "";
  details.value = "";

  renderPlayersList();
}

function renderPlayersList() {
  listOfPlayers.innerHTML = "";

  playersList.forEach((player) => {
    listOfPlayers.innerHTML += `
    <div class="players-list">
      <div class="players-input">
        <div class="player-titleInput">${player.title}</div>
        <div class="player-detailsInput">${player.details}</div>
        </div>
        <div class="buttons">
        <div onClick='showDetails(${player.id})'>
          <img src="./assets/images/eye.png" style="width:20px">
        </div>  
        <div onClick='removePlayer(${player.id})' style="font-size:17px">
        <img src="./assets/images/trash.png" style="width:20px">
        </div>  
        </div>  
        </div> 
        <div class="player-addTime">${player.addedTime}</div>`;
  });
}

function removePlayer(id) {
  const index = playersList.findIndex((player) => player.id === id);

  if (index !== -1) {
    playersList.splice(index, 1);
    renderPlayersList();
  }
}

function showDetails(id) {
  const player = playersList.find((player) => player.id === id);
  if (player) {
    overlayDescription.innerHTML = `<h3>${player.title}</h3>
   <p>${player.details}</p>
   <br>
   <div class="overlay-content">
   <p>${player.description || "There is no Description for this player"}</p>
   </div>
   <div class="player-addTime-overlay">${player.addedTime}</div>`;

    overlay.classList.remove("hidden");
    overlayDescription.classList.remove("hidden");
  }
}

overlay.addEventListener("click", closeModal);

function closeModal() {
  overlay.classList.add("hidden");
  overlayDescription.classList.add("hidden");
}

sortSelect.addEventListener("change", () => {
  const sort = sortSelect.value;

  if (sort === "Newest") {
    playersList.sort((a, b) => b.id - a.id);
  } else if (sort === "Oldest") {
    playersList.sort((a, b) => a.id - b.id);
  } else {
    playersList.sort((a, b) => a.title.localeCompare(b.title));
  }
  renderPlayersList();
});

playersForm.addEventListener("submit", (event) => {
  event.preventDefault();
  addNewPlayer();
});

renderPlayersList();
