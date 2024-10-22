function pickFiles (callback) {
    let input = document.createElement('input');
        input.type = 'file';

        input.onchange = e => {

            // getting a hold of the file reference
            var file = e.target.files[0];

            // setting up the reader
            var reader = new FileReader();
            reader.readAsDataURL(file, 'UTF-8');

            // here we tell the reader what to do when it's done reading...
            reader.onload = readerEvent => {

                try {
                    cancelIdleCallback(readerEvent.target.result);
                } catch(e) {}
            }

        }

        input.click();
}

export { pickFiles }