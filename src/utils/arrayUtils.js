Array.prototype.shuffle = function () {
  const array = this;
  let length = array.length;
  let random, container;
  while (length) {
    random = Math.floor(Math.random() * length--);
    container = array[length];
    array[length] = array[random];
    array[random] = container;
  }
};
