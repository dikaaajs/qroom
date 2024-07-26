// imgWillBeCrop = img yang akan dikirim ke crop component
// cropDialog = popup tool untuk crop img
// tmp = file img tujuan (cth untuk banner: { state: imgBanner, setState: setImgBanner })
// setImageTMP untuk bisa dipakai pada parent element

export const handleChangeImg = (
  e: any,
  setImgWillBeCrop: any,
  setCropDialog: any,
  setImageTMP: any,
  tmp: any
) => {
  if (e.target.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e: any) {
      setImgWillBeCrop(e.target.result);
    };

    reader.readAsDataURL(e.target.files[0]);
  }
  setCropDialog(true);
  setImageTMP(tmp);
};
