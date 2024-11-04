import React from 'react'
import { useState, useEffect } from 'react';
import { Button } from '@mui/material';

function Example() {

  const [count, setCount] = useState(0);

  useEffect ( () => {
    console.log("Started");
  }, []); // This Fires twice in strict mode, once in production mode

  useEffect( () => {
    console.log('You clicked: ', count);
  });

  return (
    <div>
        <Button variant='outlined' onClick={() => setCount(count + 1)}>Push Me {count}</Button>
    </div>
  )
}

export default Example

// import PocketBase from 'pocketbase';
// import React from 'react'

// const pb = new PocketBase('http://127.0.0.1:8090');

// const formData = new FormData();

// const fileInput = document.getElementById('fileInput');

// // listen to file input changes and add the selected files to the form data
// fileInput.addEventListener('change', function () {
//     for (let file of fileInput.files) {
//         formData.append('documents', file);
//     }
// });

// // set some other regular text field valuae
// formData.append('title', 'Hello world!');


// // upload and create new record
// const createdRecord = await pb.collection('example').create(formData);

// // function Example() {
// //   return (
// //     <div>Example</div>
// //   )
// // }

// // export default Example% 