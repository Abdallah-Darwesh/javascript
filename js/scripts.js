var name1 = document.querySelector("#name");
var url = document.querySelector("#url");
var btn=document.querySelector("#btn");
var row =document.querySelector(".row");
var counter=1;
var del = document.querySelector("#delete");
var regexName = /^[A-Z][a-z]{2,10}$/
var regexurl = /^(http|https):\/\/(www.)*[a-z A-Z]{2,}\.(com|net)$/i
var popup = document.querySelector(".popup");
var close = document.querySelector('.close')
name1.addEventListener("input",function(){
    if(regexName.test(name1.value)){
        name1.classList.replace("is-invalid","is-valid");
    }
    else{
        name1.classList.add("is-invalid");

    }
})
url.addEventListener("input",function(){
    if(regexurl.test(url.value)){
        url.classList.replace("is-invalid","is-valid");
        
    }
    else{
        url.classList.add("is-invalid");

    }
    
})
var name1 = document.querySelector("#name");
var url = document.querySelector("#url");
var btn = document.querySelector("#btn");
var row = document.querySelector(".row");
var counter = 1;
var regexName = /^[A-Z][a-z]{2,10}$/;
var regexurl = /^(http|https):\/\/(www.)*[a-z A-Z]{2,}\.(com|net)$/i;

name1.addEventListener("input", function() {
    if (regexName.test(name1.value)) {
        name1.classList.replace("is-invalid", "is-valid");
    } else {
        name1.classList.add("is-invalid");
    }
});

url.addEventListener("input", function() {
    if (regexurl.test(url.value)) {
        url.classList.replace("is-invalid", "is-valid");
    } else {
        url.classList.add("is-invalid");
    }
});

function addrow() {
    if (regexName.test(name1.value) && regexurl.test(url.value)) {
        var cartona = `
            <div class="col-3 ">${counter}</div>
            <div class="col-3 ">${name1.value}</div>
            <div class="col-3 "><a class="text-decoration-none text-light bg-black px-3 py-2 " href="${url.value}" target="_blank"><i class="fa-solid fa-eye pe-2"></i>Visit</a></div>
            <div class="col-3 "><button class="btn btn-danger mb-3 w-100 text-center text-light my-2 delete-btn" data-index="${counter}"><i class="fa-solid fa-trash me-1"></i>Delete</button></div>
        `;

        localStorage.setItem(`bookmark_${counter}`, cartona);
        row.innerHTML += cartona;
        ++counter;

        // Clear input fields
        name1.value = "";
        url.value = "";

        // Add event listener to the newly created delete button
        const deleteButton = document.querySelector(`.delete-btn[data-index="${counter - 1}"]`);
        deleteButton.addEventListener('click', function() {
            const index = this.dataset.index;
            localStorage.removeItem(`bookmark_${index}`);
            this.parentNode.parentNode.remove();
        });
    }
    else{
        popup.classList.add('d-flex')
    }
}

// Retrieve existing bookmarks on page load
window.onload = function() {
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith('bookmark_')) {
            const cartona = localStorage.getItem(key);
            row.innerHTML += cartona;
            ++counter;
        }

        // Add event listeners to existing delete buttons
        const deleteButtons = document.querySelectorAll('.delete-btn');
        deleteButtons.forEach(button => {
            button.addEventListener('click', function() {
                const index = this.dataset.index;
                localStorage.removeItem(`bookmark_${index}`);
                this.parentNode.parentNode.remove();
            });
        });
    }
};

close.addEventListener('click', function() {

    popup.classList.remove('d-flex')


})