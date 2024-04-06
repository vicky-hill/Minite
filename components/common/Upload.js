'use client'

import { useContext, useState, useEffect } from 'react'
import EventContext from '@/context/EventContext'
import { IKContext, IKUpload } from 'imagekitio-react'
import UserContext from '@/context/UserContext'
import { v4 as uuid } from 'uuid';


const Upload = ({ }) => {
  const [fileName, setFileName] = useState(null);
  const [folder, setFolder] = useState(null);

  const { selectedVersion, event, createImage, nextImageID } = useContext(EventContext);
  const { currentUser: { _id: userID } } = useContext(UserContext);

  useEffect(() => {
    if (selectedVersion && event && userID) {
      setFileName(`${event.year}_${event.name.toLowerCase()}_${selectedVersion}_${nextImageID}_${userID}_${uuid()}.jpg`);
      setFolder(`/Minite/${userID}/${event.year}`)
    }
  }, [selectedVersion, event, userID, nextImageID])

  const onUploadStart = (evt) => {
    console.log('Started', evt);
  };

  const onUploadProgress = (evt) => {
    console.log('Progress: ', evt);
  };

  const onError = (err) => {
    console.log('Error');
    console.log(err);
  };

  const onSuccess = async (res) => {
    try {
      const { name, filePath, fileId, width, height, url, thumbnailUrl } = res;

      const payload = {
        filePath, width, height, url, fileId,
        thumbnail: thumbnailUrl,
        fileName: name,
        imageID: nextImageID,
        name: `${event.year}_${event.name}_${selectedVersion}`,
        year: event.year,
        event: event._id,
        version: selectedVersion
      }

      await createImage(payload);
      console.log('success')
    } catch (err) {
      console.log(err);
    }
  };

  const authenticator = async () => {
    try {

      const response = await fetch(`${process.env.BASE_URL}/images/imagekit`);

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Request failed with status ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const { signature, expire, token } = data;
      return { signature, expire, token };
    } catch (error) {
      throw new Error(`Authentication request failed: ${error.message}`);
    }
  };

  if (!fileName || !folder) return;

  return (
    <IKContext
      publicKey={process.env.IK_PUBLIC_KEY}
      urlEndpoint='https://ik.imagekit.io/minite'
      authenticator={authenticator}
    >
      <IKUpload
        fileName={fileName}
        folder={folder}
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
      />
    </IKContext>
  )
}

export default Upload;
