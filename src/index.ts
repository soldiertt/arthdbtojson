import * as mysql from 'mysql';
import ProductDto from './model/product.class';
import {MapperService} from './service/mapper.service';
import * as fs from 'fs';
import * as async from 'async';
import ArthuriusDb from './model/db.class';
import TypeDto from './model/type.class';
import SlideDto from './model/slide.class';
import BrandDto from './model/brand.class';

let mapperService = new MapperService();
let jsonDb: ArthuriusDb = new ArthuriusDb();

let con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'fizzye',
  database: 'arthurius'
});

function exportProducts(callback) {
  con.query("SELECT * FROM product", (err, result, fields) => {
    if (err) callback(err);
    let index = 0;
    result.forEach(product => {
      let productDto: ProductDto = mapperService.mapProduct(product);
      jsonDb.products[index++] = productDto;
    });
    callback(null);
  });
}

function exportTypes(callback) {
  con.query("SELECT * FROM section", (err, result, fields) => {
    if (err) callback(err);
    let index = 0;
    result.forEach(section => {
      let typeDto: TypeDto = mapperService.mapType(section);
      jsonDb.types[index++] = typeDto;
    });
    callback(null);
  });
}

function exportSlides(callback) {
  con.query("SELECT * FROM slider", (err, result, fields) => {
    if (err) callback(err);
    let index = 0;
    result.forEach(slide => {
      let slideDto: SlideDto = mapperService.mapSlide(slide);
      jsonDb.slides[index++] = slideDto;
    });
    callback(null);
  });
}

function exportBrands(callback) {
  con.query("SELECT distinct(marque) FROM product", (err, result, fields) => {
    if (err) callback(err);
    let index = 0;
    result.forEach(brand => {
      let brandDto: BrandDto = mapperService.mapBrand(brand);
      jsonDb.brands[index++] = brandDto;
    });
    callback(null);
  });
}

con.connect(err => {
  if (err) throw err;
  console.log('Connected');

  async.parallel([
    exportProducts,
    exportTypes,
    exportSlides,
    exportBrands
  ], (err, results) => {
    fs.writeFile('dist/arth-db.json', JSON.stringify(jsonDb), err => {
      if (err) throw err;
        console.log("Db file saved.");
    });
    con.end();
  });

});

