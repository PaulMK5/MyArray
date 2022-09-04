class MyArray {
  constructor(length = 0) {
    this.length = length;
  }

  push(...value) {
    for (let i = 0; i < value.length; i++) {
      this[this.length] = value[i];
      this.length++;
    }
  }

  pop() {
    let lastItem = this[this.length - 1];
    delete this[this.length - 1];
    this.length--;
    return lastItem;
  }

  forEach(cb) {
    for (let i = 0; i < this.length; i++) {
      cb(this[i], i, this);
    }
  }

  static isArray(obj) {
    return obj instanceof MyArray;
  }

  map(cb) {
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      newArr[i] = cb(this[i], i, this);
    }
    return newArr;
  }

  reduce(cb, init) {
    let acc = init;
    for (let i = 0; i < this.length; i++) {
      acc = cb(acc, this[i], i, this);
    }
    return acc;
  }

  flat() {
    const newArr = new MyArray();
    for (let i = 0; i < this.length; i++) {
      if (MyArray.isArray(this[i])) {
        let nestedArr = this[i].flat();
        newArr.push(...nestedArr);
      } else {
        newArr.push(this[i]);
      }
    }
    return newArr;
  }

  [Symbol.iterator]() {
    let i = 0;
    return {
      next: () => ({
        done: i > this.length - 1,
        value: this[i++]
      })
    };
  }
}

//[-12, 5, 17, [0, 15, -4, 7, [25, 7, 5], 5], 2]
const nestArray2 = new MyArray();
nestArray2.push(25, 7, 5);
const nestArray1 = new MyArray();
nestArray1.push(0, 15, -4, 7, nestArray2, 5);
const testArray = new MyArray();
testArray.push(-12, 5, 17, nestArray1, 2);
console.log(testArray);
console.log(testArray.flat());
