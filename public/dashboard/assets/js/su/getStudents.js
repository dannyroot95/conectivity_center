/*===== API STUDENTS  =====*/ 
//localStorage.removeItem("students")
var codeStudent = document.getElementById('code')
var currentStudent
var students = []
var filterType = ""

let cacheSt = localStorage.getItem("students")
let pCache = JSON.parse(cacheSt)
var array = []


if(pCache == null){

  document.getElementById("loader").style = "display:block;margin-top:14px;"
  getStudentsFromDatabase()
  
}else{
  getStudentsFromCache()
  getStudentsFromDatabase()
}



codeStudent.addEventListener('input', updateValue);
function updateValue(e) {
    e.target.value = e.target.value.replace(/[^0-9]/g, '').toLowerCase()
    var code = e.srcElement.value
    if(code.length == 8){
      getStudent(code) 
    }else{
        clearInputs()
    }
}

/*===== END API STUDENTS  =====*/ 

$('#password').keyup(function(e) {
  var strongRegex = new RegExp("^(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*\\W).*$", "g");
  var mediumRegex = new RegExp("^(?=.{7,})(((?=.*[A-Z])(?=.*[a-z]))|((?=.*[A-Z])(?=.*[0-9]))|((?=.*[a-z])(?=.*[0-9]))).*$", "g");
  var enoughRegex = new RegExp("(?=.{6,}).*", "g");
  if (false == enoughRegex.test($(this).val())) {
          $('#passstrength').html('La contraseña debe contener 6 caracteres como mínimo.');
          document.getElementById("passstrength").style = "font-weight:bold;color:#000;"
  } else if (strongRegex.test($(this).val())) {
          $('#passstrength').className = 'ok';
          $('#passstrength').html('Fuerte!');
          document.getElementById("passstrength").style = "font-weight:bold;color:#0082AF;"
  } else if (mediumRegex.test($(this).val())) {
          $('#passstrength').className = 'alert';
          $('#passstrength').html('Media!');
          document.getElementById("passstrength").style = "font-weight:bold;color:#00AF4A;"
  } else {
          $('#passstrength').className = 'error';
          $('#passstrength').html('Débil!');
          document.getElementById("passstrength").style = "font-weight:bold;color:red;"
  }
  return true;
});


function getStudent(code){

  fetch('https://unamad.onrender.com/user?code='+code+'')
        .then((res) => res.json())
        .then(data => {

            if (data.message === 'user not found') {

                Swal.fire(
                    'Oopss!',
                    'Estudiante no encontrado!',
                    'warning'
                  )
                  currentStudent = {}

                return

            }

            currentStudent = data.data
            console.log(currentStudent)
            document.getElementById("fullname").value = (data.data.fullName).replace(",","")
            document.getElementById("faculty").value = data.data.facultyName
            document.getElementById("code-carrer").value = data.data.carrerCode
            document.getElementById("carrer").value = data.data.carrerName
            document.getElementById("dni").value = data.data.dni
            if(data.data.email != undefined){
                document.getElementById("personal-email").value = data.data.email
            }
            
        })

}

function clearInputs(){
    currentStudent = {}
    document.getElementById("code").disabled = false
    document.getElementById("fullname").value = ""
    document.getElementById("carrer").value = ""
    document.getElementById("code-carrer").value = ""
    document.getElementById("faculty").value = ""
    document.getElementById("dni").value = ""
    document.getElementById("personal-email").value = ""
    document.getElementById("date-admision").value = ""
    document.getElementById("institucional-email").value = ""
    document.getElementById("password").value = ""
    document.getElementById("passstrength").innerHTML = ""
    document.getElementById("progress-div").style = "display:none;"
}


function saveStudent(){

    
    let email = document.getElementById("personal-email").value
    var password = document.getElementById("password").value 
    let institucionalMail = document.getElementById("institucional-email").value
    let dateAdmision = document.getElementById("date-admision").value 
  
    var result = ""

    if(email != "" && institucionalMail != "" && dateAdmision != "" && password != ""){

      if(password.length >= 6){

        document.getElementById("progress-div").style = "display: block;margin-left: 40px;margin-right: 40px;"
        document.getElementById("code").disabled = true
        hideElementsOnRegister()

        db.collection("users").where("code", "==", currentStudent.userName).get().then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            result = doc.data().code;
          })
  
          if(result == currentStudent.userName){
              Swal.fire(
                  "¡Error!",
                  "Este estudiante ya está registrado!",
                  "error"
                )
                document.getElementById("progress-div").style = "display:none;"
                document.getElementById("code").disabled = false
                showElementsOnRegister()
          }else{
            
              firebase.auth().createUserWithEmailAndPassword(email, password).then((userCredential) => {
  
                  var idUser = userCredential.user.uid;
                  var birth = (currentStudent.birthDate).split("T")
              
                  var data = {
  
                      id:idUser,
                      fullName : (currentStudent.fullName).replace(",",""),
                      code : currentStudent.userName,
                      dni : currentStudent.dni,
                      code_carrer : currentStudent.carrerCode,
                      faculty_name : currentStudent.facultyName,
                      date_birth : birth[0].replaceAll("-","/"),
                      date_admision : toTimestamp(dateAdmision) ,
                      sex : currentStudent.sex,
                      carrer_name : currentStudent.carrerName,
                      type_user : "student",
                      date_register : Date.now(),
                      date_modification : null,
                      personal_mail : email,
                      institucional_mail : institucionalMail,
                      modified_by : null,
                      created_by : "SUPER ADMINISTRADOR"
  
                  }

                 
                  db.collection("users").doc(idUser).set(data).catch((error) => {
                    
                    Swal.fire(
                      "Error!",
                      "Estudiante no Registrado!",
                      "error"
                    )

                    clearInputs()
                    showElementsOnRegister()
  
                });
  
                document.getElementById("code").value = ""
                clearInputs()
                showElementsOnRegister()
     
                Swal.fire(
                  "¡Exitoso!",
                  "Estudiante Registrado!",
                  "success"
                )     
       
              }).catch((error) => {

                Swal.fire(
                  "Error!",
                  "Pruebe con otro correo!",
                  "error"
                )     
                showElementsOnRegister()
                document.getElementById("progress-div").style = "display:none;"
                document.getElementById("code").disabled = false

              })
          }
      })
    }else{

      
      Swal.fire(
        "¡Oopss!",
        "La contraseña debe contener 6 caracteres como mínimo!",
        "warning"
      )   

    }

      
  }else{
    Swal.fire(
      "Hey!",
      "Complete los campos!",
      "warning"
    )
  }

    

}



function getStudentsFromDatabase(){
 
   db.collection("users").where("type_user", "==", "student").onSnapshot((querySnapshot) => {

      let ctx = 0
      var currentCache = JSON.parse(localStorage.getItem("students"))
     
        users = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          if(users.length > 0){

            if(ObjCompare(currentCache,users) > 0){

              array = []

              $('#tb-students').DataTable().destroy()
              $("#tbody").html(
            users
              .map((user) => {

                ctx++

                array.push([ctx,user.fullName,user.code,user.carrer_name,
                  user.dni,onlyDateNumber(user.date_register)])

                  return `
                  <tr style="cursor: pointer" onclick="setData('${user.dni}', '${user.fullName}', '${user.carrer_name}','${user.id}', 
                  '${user.code}','${user.date_modification}','${user.date_register}','${user.personal_mail}',
                  '${user.institucional_mail}','${user.modified_by}','${user.created_by}','${user.sex}')">

                  <td><strong>${ctx}</strong></td>
                  <td>${user.fullName}</td>
                  <td>${user.dni}</td>
                  <td>${user.code}</td>
                  <td>${user.carrer_name}</td>
                  </tr>`;
               
              })
              .join("")
          );

          //console.log(students)
          createScriptDatatable()
          localStorage.setItem("students",JSON.stringify(users))
          document.getElementById("loader").style = "display:none;"
          document.getElementById("btn-print").style = "display:inline;"
        
        }
      }else{
        createScriptDatatable()
        document.getElementById("loader").style = "display:none;"
    }
             
    }, (error) => {
      console.log(error)
  }); 
  
}

function getStudentsFromCache(){

  let ctx = 0
  
  $("#tbody").html(

    pCache.map((user) => {

        ctx++

        array.push([ctx,user.fullName,user.code,user.carrer_name,
          user.dni,onlyDateNumber(user.date_register)])
        
          return `
          <tr style="cursor: pointer" onclick="setData('${user.dni}', '${user.fullName}', '${user.carrer_name}','${user.id}', 
                  '${user.code}','${user.date_modification}','${user.date_register}','${user.personal_mail}',
                  '${user.institucional_mail}','${user.modified_by}','${user.created_by}','${user.sex}')">

                  <td><strong>${ctx}</strong></td>
                  <td>${user.fullName}</td>
                  <td>${user.dni}</td>
                  <td>${user.code}</td>
                  <td>${user.carrer_name}</td>
                  </tr>`;
       
      })
      .join("")
  );

$('#tb-students').DataTable().destroy()
createScriptDatatable()
document.getElementById("btn-print").style = "display:inline;"
console.log(array)

}

function setData(dni,fullname,carrer,id,code,dateModification,dateRegister,personalMail,institucionalMail,
  modifiedBy,createdBy,sex){

  $('#detailModal').modal('show')

   document.getElementById("detail-code").value = code
   document.getElementById("detail-dni").value = dni
   document.getElementById("detail-fullname").innerHTML = fullname
   document.getElementById("detail-personal-mail").value = personalMail
   document.getElementById("detail-institutional-mail").value = institucionalMail
   document.getElementById("detail-date-register").value = onlyDateNumber(parseInt(dateRegister))+" "+onlyHour(parseInt(dateRegister)) 
   document.getElementById("detail-created-by").value = createdBy
   document.getElementById("detail-carrer").value = carrer


   if(modifiedBy != "null"){
    document.getElementById("div-modified-by").style = "display:block;"
    document.getElementById("detail-modified-by").value =  modifiedBy
   }else{
    document.getElementById("div-modified-by").style = "display:none;"
   }

   if(dateModification != "null"){
    document.getElementById("div-date-modified").style = "display:block;"
    document.getElementById("detail-date-modified").value = onlyDateNumber(parseInt(dateModification))+" "+onlyHour(parseInt(dateModification))  
   }else{
    document.getElementById("div-date-modified").style = "display:none;"
   }

   if(sex == "1"){
    document.getElementById("sex-img").src = "../../img/male_sex.png"
   }else{
    document.getElementById("sex-img").src = "../../img/female_sex.png"
   }


}


function createScriptDatatable(){

  $('#tb-students').DataTable({
    language: {
          "decimal": "",
          "emptyTable": "No hay información",
          "info": "Mostrando _START_ a _END_ de _TOTAL_ datos",
          "infoEmpty": "Mostrando 0 to 0 of 0 datos",
          "infoFiltered": "(Filtrado de _MAX_ total datos)",
          "infoPostFix": "",
          "thousands": ",",
          "lengthMenu": "Mostrar _MENU_ datos",
          "loadingRecords": "Cargando...",
          "processing": "Procesando...",
          "search": "Buscar:",
          "zeroRecords": "Sin resultados encontrados",
          "paginate": {
              "first": "Primero",
              "last": "Ultimo",
              "next": "Siguiente",
              "previous": "Anterior"
          }
   },
  
  });

}


function hideElementsOnRegister(){

  document.getElementById("btn-save").disabled = true
  document.getElementById("btn-close-modal").style = "display:none;"
  document.getElementById("modal-icon-close").style = "display:none;"

}

function showElementsOnRegister(){

  document.getElementById("btn-save").disabled = false
  document.getElementById("btn-close-modal").style = "display:block;"
  document.getElementById("modal-icon-close").style = "display:block;"

}


function ObjCompare(obj1, obj2){

  var ctx = 0

  if(obj1 != null && obj2 != null){

    if(obj1.length == obj2.length){

      for(let i = 0 ; i < obj1.length ; i++){
        if(obj1[i].id != obj2[i].id){
          ctx++
        }else if(obj1[i].date_admision != obj2[i].date_admision){
          ctx++
        }
        else if(obj1[i].fullName != obj2[i].fullName){
          ctx++
        }else if(obj1[i].personal_mail != obj2[i].personal_mail){
          ctx++
        }else if(obj1[i].institucional_mail != obj2[i].institucional_mail){
          ctx++
        }else if(obj1[i].date_modification != obj2[i].date_modification){
          ctx++
        }else if(obj1[i].modified_by != obj2[i].modified_by){
          ctx++
        }
      }
    }else{
      ctx++
    }

  }else{
    ctx++
  }

return ctx
  //
}

function registerAssistance(){
  let Rcode = document.getElementById("detail-code").value
  let Rfullname = document.getElementById("detail-fullname").innerHTML 
  let Rcarrer = document.getElementById("detail-carrer").value 
  let Rdni = document.getElementById("detail-dni").value

  document.getElementById("isUpload").style = "display:flex;"
  document.getElementById("div-buttons").style = "display:none;"
  document.getElementById("detail-modal-close").style = "visibility:hidden;"

  var data = {
    code : Rcode ,
    fullName : Rfullname,
    carrer_name : Rcarrer,
    dni : Rdni,
    date_register : Date.now()
  }

  console.log(Rcode,Rfullname,Rdni,Rcarrer)

  db.collection("assistance").add(data).then((snapshot) => {
    onSnapshot()
    document.getElementById("isUpload").style = "display:none;"
    document.getElementById("div-buttons").style = "display:flex;"
    document.getElementById("detail-modal-close").style = "visibility:visible;"

    $('#detailModal').modal('hide')

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      customClass : {
        color: "#000"
      },
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
      }
    })
    
    Toast.fire({
      icon: 'success',
      title: 'Completado!'
    })

})
.catch((error) => {
    console.error("Error writing document: ", error);
});

}

function onSnapshot(){
  db.collection("assistance").where("date_register", "<", Date.now()).orderBy("date_register", "desc")
  .get().then((querySnapshot) => {
    let announcements = []  
          values = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            if(values.length > 0){
              
              values.forEach(data => {
                announcements.push(data)
              });

                localStorage.setItem("announcements",JSON.stringify(announcements))
            }
        }) 
}

function print(){


  Swal.fire({
    title: 'En breves se descargará el archivo!',
    timer: 5000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading()
    },
  })


  var pdf = new jspdf.jsPDF()
          
            pdf.setFontSize(18)
            pdf.text(30, 16, "UNIVERSIDAD AMAZÓNICA DE MADRE DE DIOS")
            pdf.setFontSize(9)
            pdf.text(30, 22, "Registro de estudiantes : Centros Universitarios de Conectividad")
            pdf.text(30, 26, "Fecha : "+onlyDateNumber(Date.now()))
            pdf.setFontSize(12)
            pdf.addImage('/images/logo.png', 'PNG', 7, 2, 20, 20)

            pdf.autoTable({
                head: [['#','Nombres','Código de estudiante','Carrera profesional','DNI','Fecha de registro']],
                body: array,
                theme: 'grid',
                styles : { halign : 'center'},
                headStyles :{fillColor : [0, 142, 138]}, 
                alternateRowStyles: {fillColor : [238, 255, 254]}, 
                tableLineColor: [0, 142, 138], 
                tableLineWidth: 0.1,
                margin: {top: 30},
                })

                var pageCount = pdf.internal.getNumberOfPages(); //Total Page Number
                for(i = 0; i < pageCount; i++) { 
                pdf.setPage(i); 
                let pageCurrent = pdf.internal.getCurrentPageInfo().pageNumber; //Current Page
                pdf.setFontSize(9);
                pdf.text('Página: ' + pageCurrent + ' de ' + pageCount, 170, pdf.internal.pageSize.height - 10);
                }

            pdf.save('estudiantes_'+onlyDateNumber(Date.now())+'.pdf')
}