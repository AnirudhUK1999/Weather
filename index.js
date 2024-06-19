const btn = document.querySelector("#getWeather");

btn.addEventListener("click", async function (event) {
  event.preventDefault();
  let location = document.querySelector("#city").value
    ? document.querySelector("#city").value
    : "London";
  let result = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=ad8bb9e0bfb541fa989150452241706&q=${location}&aqi=no`,
    { mode: "cors" }
  );
  try {
    // console.log(result);
    if (!result.ok) throw result.json();
    let retrieved = result.json();
    retrieved.then((res) => display(location, res.current.condition.text));
  } catch (error) {
    // console.log(error);
    error.then(function (msg) {
      display(msg.error.message);
    });
  }

  // .then(function (resp) {
  //   if (!resp.ok)
  //   return ;
  // })
  // .then(function (res) {
  //   // console.log(res);
  //   console.log(res.current.condition.text);
  // })
  // .catch((error) =>
  //   error.then(function (msg) {
  //     console.log(msg.error.message);
  //   })
  // );
});

function display(location = "", message) {
  const container = document.querySelector(".container");

  const displayMessage = document.createElement("div");
  displayMessage.classList.add("display-message");

  if (location != "") {
    displayMessage.append(location + " is " + message);
  } else {
    displayMessage.append(message);
  }
  container.appendChild(displayMessage);
}
