let type = JSON.parse(localStorage.getItem("currentUserData"))
if(type != null){

    let typeOf = type.type_user

    if(typeOf == "super_admin"){
        let sidebar = `
                    <a href="#inicio" class="nav__link active noSub" id="iten1">
                    <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Inicio</span>
                    </a>
                    <div class="nav__link collapse" onclick="showData(0)" id="viewUser">
                    <ion-icon name="people-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Usuarios</span>
                    <ion-icon name="chevron-down-outline" class="collapse__link" onclick="showData(0)"></ion-icon>
                    <ul class="collapse__menu" id="collapseUsers">
                    <a href="#user/students" class="collapse__sublink" id="iten2" style="color:black">Estudiantes</a>
                    <a href="#user/staff" class="collapse__sublink" id="iten4" style="color:black">Administrativo</a>
                    </ul>
                    </div>

                    <a href="#announcements" class="nav__link noSub" id="iten5">
                    <ion-icon name="list-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Asistencias</span>
                    </a>

                    <a href="#popups" class="nav__link noSub" id="itemPopup">
                    <ion-icon name="bar-chart-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Reportes</span>
                    </a>
                    
                    `
                    document.getElementById("modules").innerHTML = sidebar
    }
    else if(typeOf == "student"){
        let sidebar = `

                    <a href="#student/inicio" class="nav__link active noSub" id="iten1">
                    <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Inicio</span>
                    </a>

                    <a href="#student/constancias" class="nav__link noSub" id="iten2">
                    <ion-icon name="people-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Mi Perfil</span>
                    </a>

                    <a href="#student/proyectos" class="nav__link noSub" id="iten3">
                    <ion-icon name="list-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Mis Asistencias</span>
                    </a>                   
                    `

        document.getElementById("modules").innerHTML = sidebar
    }

    if(typeOf == "teacher"){
        let sidebar = `
                        <a href="#inicio" class="nav__link active noSub" id="iten1">
                        <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                        <span class="nav__name">Inicio</span>
                        </a>
                        
                        <a href="#announcements" class="nav__link noSub" id="iten5">
                        <ion-icon name="megaphone-outline" class="nav__icon"></ion-icon>
                        <span class="nav__name">Asistencias</span>
                        </a>
    
                        <a href="#popups" class="nav__link noSub" id="itemPopup">
                        <ion-icon name="eye-outline" class="nav__icon"></ion-icon>
                        <span class="nav__name">Reportes</span>
                        </a>
                    
                    `
                    document.getElementById("modules").innerHTML = sidebar
    }

    else if(typeOf == "staff"){
        let sidebar = `

                    <a href="#inicio" class="nav__link active noSub" id="iten1">
                    <ion-icon name="home-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Inicio</span>
                    </a>

                    <div class="nav__link collapse" onclick="showData(0)" id="viewUser">
                    <ion-icon name="people-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Usuarios</span>
                    <ion-icon name="chevron-down-outline" class="collapse__link" onclick="showData(0)"></ion-icon>
                    <ul class="collapse__menu" id="collapseUsers">
                    <a href="#user/students" class="collapse__sublink" style="color:black">Estudiantes</a>
                    </ul>
                    </div>

                    
                    <a href="#announcements" class="nav__link noSub" id="iten5">
                    <ion-icon name="list-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Asistencias</span>
                    </a>

                    <a href="#popups" class="nav__link noSub" id="itemPopup">
                    <ion-icon name="bar-chart-outline" class="nav__icon"></ion-icon>
                    <span class="nav__name">Reportes</span>
                    </a>
                    
                    
                    `
        document.getElementById("modules").innerHTML = sidebar
    }

}