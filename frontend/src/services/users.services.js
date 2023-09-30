
class userService {


  logout() {
    localStorage.removeItem("admin");
  }


  getCurrentUser() {
    return JSON.parse(localStorage.getItem("admin"));
  }

//users : applicant, recruiter
  logoutUser() {
    localStorage.removeItem("user");
  }


  getCurrentUserA_R() {
    return JSON.parse(localStorage.getItem("user"));
  }
}

export default new userService();
