import ProductDto from '../model/product.class';
import TypeDto from '../model/type.class';
import SlideDto from '../model/slide.class';
import BrandDto from '../model/brand.class';

export class MapperService {

  mapProduct(product: any): ProductDto {
    let productDto: ProductDto = new ProductDto();
    productDto.id = product.id;
    productDto.type = product.type;
    productDto.brand = product.marque;
    productDto.name = product.name;
    productDto.description = product.description;
    productDto.picture = product.picture;
    productDto.handle = product.manche;
    productDto.steel = product.acier;
    productDto.size = product.size;
    productDto.youtube_ref = product.youtube_ref;
    productDto.price = product.price;
    productDto.comment = product.comment;
    productDto.promo = !!product.promo;
    productDto.old_price = product.old_price;
    productDto.in_stock = !!product.instock;
    productDto.type_brand = product.type + '_' + product.marque;
    return productDto;
  }

  mapType(type: any): TypeDto {
    let typeDto: TypeDto = new TypeDto();
    typeDto.id = type.id;
    typeDto.name = type.type;
    typeDto.title_fr = type.title;
    typeDto.title_nl = type.titlenl;
    typeDto.parent = type.parent;
    typeDto.sortby = type.sortby;
    return typeDto;
  }

  mapSlide(slide: any): SlideDto {
    let slideDto: SlideDto = new SlideDto();
    slideDto.id = slide.id;
    slideDto.image = slide.image;
    slideDto.title1 = slide.title1;
    slideDto.title2 = slide.title2;
    slideDto.description = slide.description;
    slideDto.link = slide.link;
    return slideDto;
  }

  mapBrand(brand: any): BrandDto {
    let brandDto: BrandDto = new BrandDto();
    brandDto.name = brand.marque;
    return brandDto;
  }
}