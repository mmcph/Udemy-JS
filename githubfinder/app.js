const github = new GitHub;

const ui = new UI;

const searchInput = document.getElementById('searchUser');

searchInput.addEventListener('keyup', (e) => {
  const userText = e.target.value;
  
  if(userText !== '') {
    github.getUser(userText)
    .then(data => {
      if(data.profile.message === 'Not Found') {
        //display error alert
        ui.showAlert('User not found.', 'alert alert-danger');
        ui.clearProfile();
      } else {
        //display profile
        ui.clearAlert();
        ui.showProfile(data.profile);
        ui.showRepos(data.repos);
      }
    })
  } else {
    //clear profile
    ui.clearAlert();
    ui.clearProfile();
  }
});
