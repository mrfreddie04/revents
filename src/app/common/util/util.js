export const delay = (ms) => {
  return new Promise((resolve) => setTimeout(resolve,ms));
}

export const getFileExtension = (filename) => {
  //return filename.split('.').slice(-1)[0];
  return filename.slice((filename.lastIndexOf('.')-1 >>> 0) + 2) 
}

export const createDataTree = (dataset) => {
  const datatree = [];
  const hashtable = {};//Object.create(null);
  dataset.forEach(el => hashtable[el.id] = {...el, childNodes: []} );
  dataset.forEach(el => {
    if(el.parentId) {
      hashtable[el.parentId].childNodes.push(hashtable[el.id]);
    } else {
      datatree.push(hashtable[el.id]);
    }
  });
  return datatree;
}