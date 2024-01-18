// component/imgInput.js

const { useState } = require('react');

const ImgInput = (props) => {
  const [imageFile, setImageFile] = useState('');

  const handleClick = async () => {
    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_NAME;
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;
      const data = new FormData();
      data.append('file', imageFile);
      data.append('upload_preset', uploadPreset);
      data.append('cloud_name', cloudName);
      const resp = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        { method: 'POST', body: data },
      );
      const jsonData = await resp.json();
      await props.setImage(jsonData.secure_url);
      alert('画像アップロード成功');
    } catch (err) {
      alert('画像アップロード失敗');
    }
  };
  return (
    <div className="img-input">
      <input
        type="file"
        onChange={(e) => setImageFile(e.target.files[0])}
        accept="image/png,image/jpeg"
      />
      <button onClick={handleClick} disabled={!imageFile}>
        画像 Upload
      </button>
    </div>
  );
};

export default ImgInput;
