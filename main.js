main ();
function main() {
    var buttonAdd = document.getElementById("add_btn");
    buttonAdd.addEventListener("click", addStudent);
    var buttonEdit = document.getElementById("reset_btn");
    buttonEdit.addEventListener("click", resetStudent);
}

// các function xứ lý input type radio 

function valueCheck(name) {
    var radios = document.getElementsByName(name);

    for (let i = 0, length = radios.length; i < length; i++) {
      if (radios[i].checked) {
        // do whatever you want with the checked radio
        return(radios[i].value);
      }
    }
}

function unCheck(name) {
    let radio = document.getElementsByName(name);
for (let i = 0, length = radio.length; i < length; i++) {
 
    radio[i].checked = false
    }
}

function getValueCheck(index) {
    let radio = document.getElementsByName("gender");
    for (let i = 0, length = radio.length; i < length; i++) {
        if (radio[i].value === dataList[index].sex) {
            radio[i].checked = true  
        }
        }
    let radio1 = document.getElementsByName("status");
    for (let i = 0, length = radio1.length; i < length; i++) {
        if (radio1[i].value === dataList[index].status) {
            radio1[i].checked = true  
        }
        }
}

var dataList = [];
json = localStorage.getItem('dataList')
console.log(json)
dataList = JSON.parse(json)
console.log(dataList)
showData()

//kiểm tra
function test(student) {
    let kt= false;
    if (dataList.length > 0) {
        for (let element of dataList) {
            keys1= Object.keys(element);
            for (let e of keys1) {
                if (element.e !== student.e) {
                     kt= true;
                     break;
                }
            }
        }
        return kt;
    }
   
}
//FUNCTION THÊM SINH VIÊN

function addStudent() {
    let student = {
        name : document.getElementById("name").value,
        born : document.getElementById("born").value,
        sex : valueCheck("gender"),
        address : {
            street : document.getElementById("street").value,
            city : document.getElementById("city").value,
            province : document.getElementById("province").value,
           },
        phone : document.getElementById("phone").value,
        mail : document.getElementById("mail").value,
        point1 : document.getElementById("point_1").value,
        point2 : document.getElementById("point_2").value,
        point3 : document.getElementById("point_3").value,
        status: valueCheck("status"),
        }
    if (test(student) === false) {
        alert("Hồ sơ đã tồn tại")
        resetStudent()
    } else {
    dataList.push(student);}
    showData()
}

//FUNCION RESET THÔNG TIN ĐÃ NHẬP
function resetStudent() {
        document.getElementById("name").value = '';
        unCheck("gender"),
        unCheck("status"),
        document.getElementById("born").value = '',
        document.getElementById("street").value = '',
        document.getElementById("city").value = '',
        document.getElementById("province").value = '',
        document.getElementById("phone").value = '',
        document.getElementById("mail").value = '',
        document.getElementById("point_1").value = '',
        document.getElementById("point_2").value = '',
        document.getElementById("point_3").value  = '' 
}


function showData() {
    var bodytableTag = document.getElementById('bodytable');
    bodytableTag.innerHTML = '';
    for (let i = 0; i < dataList.length; i++) {
        bodytableTag.innerHTML += `<tr>
                                        <td>${i+1}</td>
                                        <td>${dataList[i].name}</td>
                                        <td>${dataList[i].sex}</td>
                                        <td>${dataList[i].born}</td>
                                        <td>${dataList[i].address.street + ", " + dataList[i].address.city+ ", "  + dataList[i].address.province}</td>
                                        <td>${dataList[i].phone}</td>
                                        <td>${dataList[i].mail}</td>
                                        <td>${dataList[i].point1}</td>
                                        <td>${dataList[i].point2}</td>
                                        <td>${dataList[i].point3}</td>
                                        <td>${dataList[i].status}</td>
                                        <td><button style="background-color: darkgray" onclick="editStudent(${i})">Edit</button></td>
                                        <td><button style="background-color: darkgray" onclick="deleteStudent(${i})" >Delete</button></td>
                                    </tr>`
    }
    //chuyen array -> string
    json = JSON.stringify(dataList)
    localStorage.setItem('dataList', json)
}
// CÁC FUNCTION SỬA VÀ XÓA THÔNG TIN
function editStudent(index) {
    getValueCheck(index),
    document.getElementById("name").value= dataList[index].name,
    document.getElementById("born").value= dataList[index].born,
    document.getElementById("street").value= dataList[index].address.street,
    document.getElementById("city").value= dataList[index].address.city,
    document.getElementById("province").value= dataList[index].address.province,
    document.getElementById("phone").value= dataList[index].phone,
    document.getElementById("mail").value= dataList[index].mail,
    document.getElementById("point_1").value= dataList[index].point1,
    document.getElementById("point_2").value= dataList[index].point2,
    document.getElementById("point_3").value= dataList[index].point3,
    main()
}

function deleteStudent(index) {
var option = confirm("Mọi thông tin liên quan sẽ bị xóa!")
if(!option) {
    return
}
dataList.splice(index, 1);
showData();
}


