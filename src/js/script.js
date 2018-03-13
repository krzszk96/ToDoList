
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'P') {
    ev.target.classList.toggle('checked');
  }
}, false);

function removeItem(){
    var item = this.parentNode;
    var parent = item.parentNode;
    parent.removeChild(item);
}

function editItem(){
    var edit = this.parentNode.firstChild;

    if (edit.contentEditable == "true") {
        edit.contentEditable = "false";
    } else {
        edit.contentEditable = "true";
    }
}

function addFunction() {
    var li = document.createElement("li");
    var p = document.createElement("p");
    var input = document.getElementById("todo").value;
    var t = document.createTextNode(input);

    var deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";

    var editButton = document.createElement("button");
    editButton.innerText = "Edit";
    editButton.className = "edit";

    if (input === '') {
      alert("Can't add nothing!");
    } else {
      // li.appendChild(t);
      p.className = "item";
      p.appendChild(t);
      document.getElementById("list").appendChild(li);
      li.appendChild(p);
      li.appendChild(editButton);
      li.appendChild(deleteButton);
    }

    deleteButton.addEventListener('click', removeItem);
    editButton.addEventListener('click', editItem);
}

function clearField(){
  document.getElementById("todo").value = "";
}
