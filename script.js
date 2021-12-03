const imagePreview = document.getElementById('image-preview'); // you can change the src property
const fileInput = document.getElementById('my-file'); // to change input value use: fileInput.files
const codeBasePreview = document.getElementById('code-base');
const form = document.querySelector('form');
const copyToClipboardButton = document.querySelector('button');

copyToClipboardButton.addEventListener('click', () => {
    codeBasePreview.select();
    document.execCommand('copy');
    alert('Codebase64 copied to clipboard!');
});

form.addEventListener('submit', e => {
    e.preventDefault();

    const { files } = fileInput;

    if (files.length > 0) {
        let file;

        if (files[0].type.includes('image')) {
            // if file uploaded by user is an image then we will use that image
            file = files[0];
            
            if (file.size > 5000000) throw new Error('Image cannot exceed the 5MB of size');

            setPreviewImage(file); // This function ever returns null, but you can call this function here
        } 
        else {
            // if is not an image, throw an error
            throw new Error('File is not an image');
        }
    }
});

// File Reader function
function setPreviewImage(file) {
    const fileReader = new FileReader();

    fileReader.readAsDataURL(file);
    fileReader.onload = () => {
        // You have to do all in this function, you cannot return anything, :(

        // fileReader.result returns a codebase64 that you can use
        codeBasePreview.innerText = fileReader.result;
        imagePreview.src = fileReader.result;
    }
}

// Research for another project:
//
// 10 millones of characters codebase64 (max length to protect the database) that is equals to 9MB
// size of the image cannot be more than 5000000 (5.000.000, five millions) that is equals to 5MB
//