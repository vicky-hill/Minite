import { IKContext, IKUpload } from 'imagekitio-react'

const Upload = ({ }) => {
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

  const onSuccess = (res) => {
    console.log('Success');
    console.log(res);
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

  return (
    <IKContext
      publicKey={process.env.IK_PUBLIC_KEY}
      urlEndpoint='https://ik.imagekit.io/minite'
      authenticator={authenticator} 
    >
      <IKUpload
        fileName="test-upload.jpg"
        folder={"/Minite/2023"}
        onError={onError}
        onSuccess={onSuccess}
        onUploadStart={onUploadStart}
        onUploadProgress={onUploadProgress}
      />
    </IKContext>
  )
}

export default Upload;
