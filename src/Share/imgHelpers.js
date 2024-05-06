export const getImgDayCode = (code) =>{
    const imgCode = `${code}d.svg`
    const imgPath = require(`../icons/${imgCode}`);
    return imgPath;
}

export const getImgNightCode = (code) =>{
    const imgCode = `${code}n.svg`
    const imgPath = require(`../icons/${imgCode}`);
    return imgPath;
}