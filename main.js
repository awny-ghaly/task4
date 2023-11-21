let input = document.querySelector("input");
let fetchBtn = document.querySelector("button");
let info = document.querySelector("output");

fetchBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (input.value && localStorage.getItem("dataFetched")) {
    let el = JSON.parse(localStorage.getItem("dataFetched")).find((e) => {
      return e.name === input.value;
    });
    el
      ? (console.log(el.data),
        (info.value = "Data founded and printed in console"),
        (info.style.color = "green"))
      : fetchGithubName(input.value);
  } else if (input.value && !localStorage.getItem("dataFetched")) {
    localStorage.setItem("dataFetched", []);
    fetchGithubName(input.value);
  } else {
    info.value = "Invalid Search Name";
    info.style.color = "red";
  }
});

const fetchGithubName = async (githubName) => {
  await (
    await fetch(`https://api.github.com/users/${githubName}`)
  )
    .json()
    .then((res) => {
      if (res.message) {
        info.value = `${res.message}`;
        info.style.color = "gold";
      } else {
        info.value = "Data fetched and printed in console";
        info.style.color = "green";
        console.log(res);
        let dataFetched = localStorage.getItem("dataFetched");
        dataFetched = dataFetched ? JSON.parse(dataFetched) : [];
        dataFetched.push({
          name: githubName,
          data: res,
        });
        localStorage.setItem("dataFetched", JSON.stringify(dataFetched));
      }
    })
    .catch(() => {
      info.value = "No data available for this name";
      info.style.color = "gold";
    });
};
