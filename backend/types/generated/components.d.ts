import type { Schema, Struct } from '@strapi/strapi';

export interface MediaMedia extends Struct.ComponentSchema {
  collectionName: 'components_media_media';
  info: {
    displayName: 'Media';
    icon: 'book';
  };
  attributes: {
    Media: Schema.Attribute.Media<'images' | 'videos', true>;
  };
}

export interface SeoDefaultSeo extends Struct.ComponentSchema {
  collectionName: 'components_seo_default_seos';
  info: {
    displayName: 'defaultSeo';
    icon: 'alien';
  };
  attributes: {
    metaDescription: Schema.Attribute.Text;
    metaTitle: Schema.Attribute.String;
    shareImage: Schema.Attribute.Media<'files' | 'images' | 'videos', true>;
  };
}

export interface SliderSlider extends Struct.ComponentSchema {
  collectionName: 'components_slider_sliders';
  info: {
    displayName: 'Slider';
    icon: 'apps';
  };
  attributes: {
    slider: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'media.media': MediaMedia;
      'seo.default-seo': SeoDefaultSeo;
      'slider.slider': SliderSlider;
    }
  }
}
