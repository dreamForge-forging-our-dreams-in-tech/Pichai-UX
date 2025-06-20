function pickFiles (type, callback) { //type == base64or array
    let input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {

            // getting a hold of the file reference
            var file = e.target.files[0];

            // setting up the reader
            var reader = new FileReader();
            if(type == 'base64') {
                reader.readAsDataURL(file, 'UTF-8');
            } else {
                reader.readAsArrayBuffer(file);
             }

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {

                try {
                    callback(readerEvent);
                } catch(e) {}
            }

        }

        input.click();
}

export { pickFiles }