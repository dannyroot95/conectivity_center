$('document').ready(function () {

  if (user == "super_admin") {

    inicio();

    window.addEventListener('hashchange', (e) => {

      let direccion = window.location.hash;

      if (direccion == '#inicio') {
        inicio();
      }
      else if (direccion == '#user/students') {
        userStudents();
      } else if (direccion == '#user/teachers') {
        userTeachers();
      } else if (direccion == '#user/staff') {
        userAdminis();
      } else if (direccion == "#announcements") {
        announcements();
      } else if (direccion == "#proyects/created") {
        proCreated();
      } else if (direccion == "#proyects/approbed") {
        proApprobed();
      } else if (direccion == "#proyects/executed") {
        proExecuted();
      } else if (direccion == "#proyects/finished") {
        proFinished();
      } else if (direccion == "#constancy") {
        constancias();
      } else if (direccion == "#resolutions") {
        resolutions();
      } else if (direccion == "#doc/UNAMAD") {
        docUnamad();
      } else if (direccion == "#doc/DPSEC") {
        docDpsec();
      } else if (direccion == "#popups") {
        popups();
      }
       else {
        routeErrE();
      }
    });
  } else if (user == "student") {

    studentInicio();

    window.addEventListener('hashchange', (e) => {

      let direccion = window.location.hash;

      if (direccion == "#student/inicio") {
        studentInicio();
      } else if (direccion == "#student/constancy") {
        studentConstancias();
      } else if (direccion == "#student/proyectos") {
        studentProyects();
      } else {
        studentError();
      }
    });
  } else if (user == "staff") {

    inicio();

    window.addEventListener('hashchange', (e) => {

      let direccion = window.location.hash;

      if (direccion == '#inicio') {
        inicio();
      }
      else if (direccion == '#user/students') {
        userStudents();
      } else if (direccion == "#announcements") {
        announcements();
      } else if (direccion == "#proyects/created") {
        proCreated();
      } else if (direccion == "#proyects/approbed") {
        proApprobed();
      } else if (direccion == "#proyects/executed") {
        proExecuted();
      } else if (direccion == "#proyects/finished") {
        proFinished();
      } else if (direccion == "#constancy") {
        constancias();
      } else if (direccion == "#resolutions") {
        resolutions();
      } else if (direccion == "#doc/UNAMAD") {
        docUnamad();
      } else if (direccion == "#doc/DPSEC") {
        docDpsec();
      } else {
        routeErrE();
      }
    });
  }

  else if (user == "teacher") {

    inicio();

    window.addEventListener('hashchange', (e) => {

      let direccion = window.location.hash;

      if (direccion == '#inicio') {
        inicio();
      }
      else if (direccion == "#announcements") {
        announcementsTeacher();
      } else if (direccion == "#teacher-projects") {
        teacherProjects();
      }  else if (direccion == "#teacher-constancy") {
        teacherConstancy();
      } else if (direccion == "#doc/UNAMAD") {
        docUnamad();
      } else if (direccion == "#doc/DPSEC") {
        docDpsec();
      } else {
        routeErrE();
      }
    });
  }


})

//funct superAdmi || staff
function inicio() {
  window.location.hash = "#inicio"
  contentModulo.innerHTML = urlModule("assets/pages/dashboard.html");
  console.log("dash-inicio")
  $('#iten1').addClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function userStudents() {
  console.log("dash-estudiantes")
  contentModulo.innerHTML = urlModule("assets/pages/su/students.html");
  $('#iten1').removeClass("top");
  $('#viewUser').addClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function userTeachers() {
  console.log("dash-docentes")
  contentModulo.innerHTML = urlModule("assets/pages/su/teachers.html");
  $('#iten1').removeClass("top");
  $('#viewUser').addClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function userAdminis() {
  console.log("dash-administrativos")
  contentModulo.innerHTML = urlModule("assets/pages/su/staff.html");
  $('#iten1').removeClass("top");
  $('#viewUser').addClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function announcements() {
  console.log("dash-convocatorias")
  contentModulo.innerHTML = urlModule("assets/pages/su/announcements.html");
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').addClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function proCreated() {
  console.log("dash-proyectos creados")
  contentModulo.innerHTML = "proyectos creados";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').addClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function proApprobed() {
  console.log("dash-proyectos aprobados")
  contentModulo.innerHTML = "proyectos aprobados";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').addClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function proExecuted() {
  console.log("dash-proyectos ejecutaos")
  contentModulo.innerHTML = "proyectos ejecutados";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').addClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function proFinished() {
  console.log("dash-proyectos terminados")
  contentModulo.innerHTML = "proyectos terminados";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').addClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}
function constancias() {
  console.log("dash-constancias")
  contentModulo.innerHTML = urlModule("assets/pages/su/constancy.html");
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').addClass("top");
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}

function resolutions() {
  contentModulo.innerHTML = urlModule("assets/pages/su/resolutions.html");
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').addClass("top");
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}

function popups() {
  contentModulo.innerHTML = urlModule("assets/pages/su/popups.html");
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass("top");
  $('#itemPopup').addClass("top");
  $('#viewDocs').removeClass("top");
}

function docUnamad() {
  console.log("dash-doc unamad")
  contentModulo.innerHTML = "doc unamad";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').addClass("top");
  $('#itemPopup').removeClass("top");
}
function docDpsec() {
  console.log("dash-doc dpsec")
  contentModulo.innerHTML = "doc dpsec";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#viewHistory').removeClass('top');
  $('#viewDocs').addClass("top");
  $('#itemPopup').removeClass("top");
}
function routeErrE() {
  console.log("ruta error")
  contentModulo.innerHTML = "no existe la ruta";
  $('#iten1').removeClass("top");
  $('#viewUser').removeClass("top");
  $('#iten5').removeClass("top");
  $('#viewProyects').removeClass('top');
  $('#iten10').removeClass("top");
  $('#viewDocs').removeClass("top");
  $('#itemPopup').removeClass("top");
}

//funct Estudiante
function studentInicio() {
  window.location.hash = '#student/inicio'
  console.log("dash-inicio-estudiante")
  contentModulo.innerHTML = "inicio de studiante";
  $('#iten1').addClass("top");
  $('#iten2').removeClass("top");
  $('#iten3').removeClass("top");
}
function studentConstancias() {
  console.log("dash-constancias-estudiante")
  contentModulo.innerHTML = "constancia de studiante";
  $('#iten1').removeClass("top");
  $('#iten2').addClass("top");
  $('#iten3').removeClass("top");
}
function studentProyects() {
  console.log("dash-estudiante")
  contentModulo.innerHTML = "inicio de studiante";
  $('#iten1').removeClass("top");
  $('#iten2').removeClass("top");
  $('#iten3').addClass("top");
}
function studentError() {
  console.log("dash-error-student")
  contentModulo.innerHTML = "no existe la ruta para estudiante";
  $('#iten1').removeClass("top");
  $('#iten2').removeClass("top");
  $('#iten3').removeClass("top");
}

//funct Tecaher
function teacherInicio() {
  window.location.hash = '#student/inicio'
  console.log("dash-inicio-estudiante")
  contentModulo.innerHTML = "inicio de studiante";
  $('#iten1').addClass("top");
  $('#iten2').removeClass("top");
  $('#iten3').removeClass("top");
  $('#iten4').removeClass("top");
  $('#viewDocs').removeClass("top");
}

function announcementsTeacher() {
  console.log("dash-constancias-estudiante")
  contentModulo.innerHTML = urlModule("assets/pages/tch/announcements.html");
  $('#iten1').removeClass("top");
  $('#iten2').addClass("top");
  $('#iten3').removeClass("top");
  $('#iten4').removeClass("top");
  $('#viewDocs').removeClass("top");
}
function teacherProjects() {
  console.log("dash-estudiante")
  contentModulo.innerHTML = urlModule("assets/pages/tch/projects.html");
  $('#iten1').removeClass("top");
  $('#iten2').removeClass("top");
  $('#iten3').addClass("top");
  $('#iten4').removeClass("top");
  $('#viewDocs').removeClass("top");
}
function teacherConstancy() {
  console.log("dash-constancias-estudiante")
  contentModulo.innerHTML = urlModule("assets/pages/tch/constancy.html");
  $('#iten1').removeClass("top");
  $('#iten2').removeClass("top");
  $('#iten3').removeClass("top");
  $('#iten4').addClass("top");
  $('#viewDocs').removeClass("top");
}



let typeOfUser = JSON.parse(localStorage.getItem("currentUserData"))
console.log(typeOfUser)

function urlModule(url) {
  return (
    "<iframe src='" +
    url +
    "' style='width: 100%; height: 100%; border: none;'></iframe>"
  );
}

var user 
if(typeOfUser.type_user != null){
  user = typeOfUser.type_user
}
var contentModulo = document.querySelector(".body-content");

/*function link_modules_SU(module, container) {

  window.addEventListener('hashchange', (e) => {
    if (module == "#inicio") {
      container.innerHTML = urlModule("assets/pages/dashboard.html");

    } else if (module == "#students") {
      container.innerHTML = urlModule("assets/pages/su/students.html");

    } else if (module == "#announcements") {
      container.innerHTML = urlModule("assets/pages/su/announcements.html");

    } else if (module == "#teachers") {
      container.innerHTML = urlModule("assets/pages/su/teachers.html");

    }
    else if ("#" == module) {
      container.innerHTML = "<br>&nbsp;&nbsp;Muy Pronto...";
    } else {
      container.innerHTML = urlModule("assets/pages/dashboard.html");
    }
  })

}*/

/*function link_modules_STD(module, container) {
  if ("#dashboard" == module) {
    container.innerHTML = urlModule("assets/pages/dashboard.html");
  } else if ("#students" == module) {
    container.innerHTML = urlModule("assets/pages/su/students.html");
  } else if ("#announcements" == module) {
    container.innerHTML = urlModule("assets/pages/su/announcements.html");
  }
  else if ("#" == module) {
    container.innerHTML = "<br>&nbsp;&nbsp;Muy Pronto...";
  } else {
    container.innerHTML = urlModule("assets/pages/dashboard.html");
  }
}*/

/*let linkModulo = document.querySelector(".nav__list").querySelectorAll("a");

if(user != "super_admin"){
  link_modules_SU(window.location.hash, contentModulo);
  console.log("asdasd")
}else if(user != "student"){
  link_modules_STD(window.location.hash, contentModulo);
}

linkModulo.forEach((elemento) => {
  elemento.addEventListener("click", function () {
    if (user == "super_admin" || user == "staff") {
      // link_modules_SU(elemento.getAttribute("href") + "", contentModulo);
    } else if (user == "student") {
      //link_modules_STD(elemento.getAttribute("href") + "", contentModulo);
    }
  });
});
*/