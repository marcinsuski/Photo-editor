import React, { useEffect, useState } from "react";
import { storage } from "./firebase";
import { getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { v4 } from 'uuid';

const ImageUpload = () => {
    const [image, setImage] = useState([]);
    // const [imageList, setImageList] = useState([]);

    function uploadImage() {
        if (image == null) return;
        const imageRef = ref(storage, `images/${image.name + v4()}`)
        uploadBytes(imageRef, image)
        .then((snapshot) => {
            getDownloadURL(snapshot.ref).then((url) => {
                setImageList((prev) =>  [...prev, url])
            })
        });        
    }
    
    // const imageListRef = ref(storage, 'images/')

    // useEffect(() => {
    //     listAll(imageListRef).then((response) => {
    //         response.items.forEach(item => {
    //            getDownloadURL(item).then((url) => {
    //                 setImageList((prev) => [...prev, url])
    //             })
    //         })    
    //     })
    // }, [])


    return (
        <div className="upload">
            <input
                type="file"
                name="file"
                onChange={(e) => {
                    setImage(e.target.files[0]);
                }}
            />
            <button onClick={uploadImage}>Upload Image</button>
          
        </div>
    );
};

export default ImageUpload;
