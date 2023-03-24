
import axios from "axios";
import { useSession } from "next-auth/react";
import { CldUploadWidget } from "next-cloudinary";
import { useEffect, useState } from "react";


const UploadImage = () => {

    const [image, setImage] = useState([])

    useEffect(() => {
      console.log(image)
      
    }, [image])
    

    const handleImage = (e: any) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setImage(reader.result as any)
        }

        console.log(file)
        console.log(image)
    }

    const submitImage = async (e: any) => {
        e.preventDefault()
        try {
            const response = await axios.post("/api/cloudinary/profile-photo-upload", {
                image
            })
            console.log(response)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div>
                <input type="file" onChange={handleImage} accept=".jpg, .jpeg, .png" />
                <button onClick={submitImage}>Upload</button>
            </div>
        </>
    )
}

export default UploadImage