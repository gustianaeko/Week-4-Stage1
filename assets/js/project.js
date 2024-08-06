let dataProjects = [];

const addProject = (event) => {
  event.preventDefault();

  const projectName = document.getElementById("inputProjectName").value;
  const startDate = document.getElementById("startDate").value;
  const endDate = document.getElementById("endDate").value;
  const description = document.getElementById("description").value;
  const technologies = document.getElementsByName("technologies");
  const uploadImg = document.getElementById("uploadImg").value;

  if (projectName === "") return alert("Please insert your project name");
  if (startDate === "") return alert("Please insert your project start date");
  if (endDate === "") return alert("Please insert your project end date");

  let selectedValue = null;

  for (const radio of technologies) {
    if (radio.checked) {
      selectedValue = radio.value;
      break;
    }
  }

  let project = {
    projectName,
    startDate: new Date(startDate),
    endDate: new Date(endDate),
    description,
    selectedValue,
    uploadImg,
  };

  dataProjects.push(project);

  console.log(dataProjects);

  renderProject();
};

const renderProject = () => {
  document.getElementById("contents").innerHTML = "";

  for (let i = 0; i < dataProjects.length; i++) {
    document.getElementById("contents").innerHTML += `
    <div class="project-list-item">
        <div class="project-content">
            <div class="headerContent"> 
                <div class="project-image">
                <img src="/assests/images/Mobile-App-Statistics.jpg" alt="project image" style="width: 100%; border-radius: 15px;"/>
                </div>
                <h2>
                  <a href="projectDetail.html" target="_blank" style="text-decoration: none;">${
                    dataProjects[i].projectName
                  } - ${dataProjects[i].startDate.getFullYear()}</a>
                </h2>
                <p>
                  Duration : ${getDistanceTime(dataProjects[i].startDate)} 
                </p>
            </div>
            <div class="detailProjectContent"> 
                ${getFullDate(dataProjects[i].startDate)} | Eko Gustiana
            </div>
                <p class="description"> 
                ${dataProjects[i].description}
                </p>
            <div class="projectIcons"> 
                <i class="fa-brands fa-node fa-lg" style="color: #63E6BE;"></i>
                <i class="fa-brands fa-js fa-lg" style="color: #63E6BE;"></i>
                <i class="fa-brands fa-react fa-lg" style="color: #63E6BE;"></i>
                <i class="fa-brands fa-vuejs fa-lg" style="color: #63E6BE;"></i>
            </div>
            <div class="btn-group">
                <button class="btn-post">Delete Post</button>
                <button class="btn-edit"">Edit Post</button>
            </div>
        </div>
    </div>
                `;
  }
};

const getFullDate = (time) => {
  const nameOfMonth = [
    "Januari",
    "Februari",
    "Maret",
    "April",
    "Mei",
    "Juni",
    "Juli",
    "Agustus",
    "September",
    "Oktober",
    "November",
    "Desember",
  ];

  const date = time.getDate();
  const month = nameOfMonth[time.getMonth()];
  const year = time.getFullYear();

  const hour = time.getHours();
  const minute = time.getMinutes();

  return `${date} ${month} ${year} - ${hour}:${minute} WIB`;
};

const getDistanceTime = (time) => {
  const postedAt = time;
  const currentTime = new Date();

  const distanceTime = currentTime - postedAt;

  const miliSecond = 1000;
  const secondInHour = 3600;
  const hourInDay = 24;

  const distanceTimeInSecond = Math.floor(distanceTime / miliSecond);
  const distanceTimeInMinute = Math.floor(distanceTime / (miliSecond * 60));
  const distanceTimeInHour = Math.floor(
    distanceTime / (miliSecond * secondInHour)
  );
  const distanceTimeInDay = Math.floor(
    distanceTime / (miliSecond * secondInHour * hourInDay)
  );

  if (distanceTimeInDay > 0) {
    return `${distanceTimeInDay} days`;
  } else if (distanceTimeInHour > 0) {
    return `${distanceTimeInHour} hours`;
  } else if (distanceTimeInMinute > 0) {
    return `${distanceTimeInMinute} minutes`;
  } else {
    return `${distanceTimeInSecond} seconds`;
  }
};
