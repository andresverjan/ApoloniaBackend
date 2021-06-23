const User = require('./models/user');
const db = require('./models');
const Op = db.Sequelize.Op;

const convertDateTimeIsoToString = (isoDate) => {
  const d = new Date(isoDate);
  const date = d.toISOString().split('T')[0];
  const time = d.toTimeString().split(' ')[0];
  return `${date} ${time}`;
};

const getFilterFromObject = (object) => {
  let result = [];
  for (let key of Object.keys(object)) {
    let valor = object[key];
    if (!isNaN(valor)) {
      let obj = {};
      obj[key] = { [Op.eq]: Number(valor) };
      result.push(obj);
    } else if (valor != null && valor != '' && valor != undefined) {
      let obj = {};
      obj[key] = { [Op.like]: '%' + valor + '%' };
      result.push(obj);
    }
  }
  return result.length > 0 ? { where: result } : {};
};

const getFilterFromObjectAllLike = (object) => {
  let result = [];
  for (let key of Object.keys(object)) {
    let valor = object[key];
    let obj = {};
    obj[key] = { [Op.like]: '%' + valor + '%' };
    result.push(obj);
  }
  return result.length > 0 ? { where: result } : {};
};

const getOrderFromObject = (object) => {
  let arrayResult = [];
  for (let key of Object.keys(object)) {
    let valor = object[key];
    if (valor != null && valor != '' && valor != undefined) {
      if (valor.toLowerCase() == 'asc') {
        arrayResult.push([key, 'ASC']);
      } else {
        arrayResult.push([key, 'DESC']);
      }
    }
  }
  return arrayResult;
};

const getOrderFromObjectMongo = (object) => {
  for (let key of Object.keys(object)) {
    let valor = object[key];
    if (valor != null && valor != '' && valor != undefined) {
      if (valor.toLowerCase() == 'asc') {
        object[key] = '1';
      } else {
        object[key] = '-1';
      }
    }
  }
  return object;
};

module.exports = {
  getFilterFromObject,
  getFilterFromObjectAllLike,
  getOrderFromObject,
  convertDateTimeIsoToString,
};
