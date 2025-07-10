  const modalImage = document.getElementById('modalImage');
  const imageModal = document.getElementById('imageModal');

  imageModal.addEventListener('show.bs.modal', function (event) {
    const triggerImg = event.relatedTarget;
    const src = triggerImg.getAttribute('data-img-src');
    modalImage.src = src;
  });