(() => {
  const input = document.querySelector('input');
  const btn = document.querySelector('button');
  const output = document.querySelector('output');
  const qrcodeHolder = document.getElementById('qrcode_holder');

  const inputWidth = parseInt( getComputedStyle(input).width );

  const qrCodeOptions = {
    quality: 0.5,
  };

  btn.addEventListener('click', () => {
    qrcodeHolder.innerHTML = '';
    output.textContent = '';
    btn.disabled = true;

    if ( !(input.value.includes('://')) ) {
      input.value = 'http://' + input.value;
    }
    const link = input.value;

    fetch(location.origin + '/compress', {
      method: 'POST',
      body: JSON.stringify({link})
    })
      .then((res) => res.json())
      .then((result) => {
        output.textContent = result.link;

        QRCode.toDataURL(result.link, qrCodeOptions, (err, encodedImg) => {
          if (err !== null) {
            console.warn(`can't create a qr-code:`);
            console.warn(warn);
          }
          else {
            const img = document.createElement('img');
            img.src = encodedImg;
            img.alt = 'QR-code with a compressed link';
            img.width = inputWidth;
            img.height = inputWidth;
            qrcodeHolder.append(img);
          }
        });
      })
      .catch((err) => output.textContent = err.message)
      .finally(() => btn.disabled = false);
    });
})();